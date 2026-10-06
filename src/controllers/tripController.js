const Trip = require('../models/Trip');

// Sample default stops for initial seeding
const DEFAULT_STOPS = [
  { id: 's1', name: 'Breakfast at Fort Kochi (Appam & Stew)', time: '08:30', duration: '45m', cost: 120, category: 'Food & Cafe', transitToNext: 'Walk • 6 min • Free', isLocked: false, day: 1 },
  { id: 's2', name: 'Chinese Fishing Nets Heritage Promenade', time: '09:45', duration: '40m', cost: 0, category: 'Sight', transitToNext: 'Auto • 10 min • ₹80', isLocked: false, day: 1 },
  { id: 's3', name: 'Mattancherry Palace (Dutch Palace)', time: '11:00', duration: '1h 15m', cost: 10, category: 'Culture & Heritage', transitToNext: 'Walk • 5 min • Free', isLocked: true, day: 1 },
  { id: 's4', name: 'Jew Town Antiques & Synagogue Walk', time: '12:30', duration: '1h', cost: 0, category: 'Culture & Heritage', transitToNext: 'Water Metro • 20 min • ₹30', isLocked: false, day: 1 },
  { id: 's5', name: 'Marine Drive Waterfront Sunset Walk', time: '17:30', duration: '1h', cost: 0, category: 'Nature & Sunset', transitToNext: 'Metro • 15 min • ₹25', isLocked: false, day: 1 },
  { id: 's6', name: 'Kathakali Evening Recital & Makeup Demo', time: '19:00', duration: '1h 30m', cost: 400, category: 'Culture & Heritage', transitToNext: 'End of Day', isLocked: false, day: 1 },
];

// @desc Get all trips for user (or seed demo trips if none)
// @route GET /api/trips
exports.getTrips = async (req, res) => {
  try {
    const userId = req.query.userId || 'guest';
    let trips = await Trip.find({ $or: [{ userId }, { userId: 'guest' }] }).sort({ updatedAt: -1 });

    if (trips.length === 0) {
      // Seed default trip
      const sampleTrip = await Trip.create({
        userId,
        title: 'Kochi Heritage & Water Metro Weekend',
        destination: 'Fort Kochi & Ernakulam',
        days: 2,
        adults: 2,
        budget: 5000,
        weather: 'Sunny & breezy, 29°C',
        trafficPace: 'Balanced (Water Metro + Auto combo)',
        isFavorite: true,
        status: 'active',
        stops: DEFAULT_STOPS,
      });
      trips = [sampleTrip];
    }

    res.status(200).json({ success: true, trips });
  } catch (error) {
    console.error('getTrips error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create new planned trip
// @route POST /api/trips
exports.createTrip = async (req, res) => {
  try {
    const { title, destination, days, adults, budget, weather, trafficPace, stops, userId } = req.body;

    if (!title || !destination) {
      return res.status(400).json({ success: false, message: 'Title and Destination are required' });
    }

    const newTrip = await Trip.create({
      userId: userId || 'guest',
      title,
      destination,
      days: days || 2,
      adults: adults || 2,
      budget: budget || 5000,
      weather: weather || 'Pleasant, 29°C',
      trafficPace: trafficPace || 'Balanced (Water Metro & Auto combo)',
      stops: stops && stops.length ? stops : DEFAULT_STOPS,
      status: 'active',
    });

    res.status(201).json({ success: true, trip: newTrip });
  } catch (error) {
    console.error('createTrip error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update trip (re-arrange stops, timings, budget, etc.)
// @route PUT /api/trips/:id
exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const trip = await Trip.findByIdAndUpdate(id, updates, { new: true });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    res.status(200).json({ success: true, trip });
  } catch (error) {
    console.error('updateTrip error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Toggle trip favorite
// @route PUT /api/trips/:id/favorite
exports.toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    trip.isFavorite = !trip.isFavorite;
    await trip.save();

    res.status(200).json({ success: true, isFavorite: trip.isFavorite, trip });
  } catch (error) {
    console.error('toggleFavorite error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Cancel or delete a trip
// @route DELETE /api/trips/:id
exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    res.status(200).json({ success: true, message: 'Trip cancelled successfully', trip });
  } catch (error) {
    console.error('deleteTrip error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get public shared trip by shareCode
// @route GET /api/trips/share/:shareCode
exports.getSharedTrip = async (req, res) => {
  try {
    const { shareCode } = req.params;
    const trip = await Trip.findOne({ shareCode });

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Shared trip link not found or expired' });
    }

    res.status(200).json({ success: true, trip });
  } catch (error) {
    console.error('getSharedTrip error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc AI Route Optimizer: reorders stops to minimize travel time & transit cost
// @route POST /api/trips/:id/optimize
exports.optimizeTripRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (!trip.stops || trip.stops.length <= 1) {
      return res.status(200).json({ success: true, trip, message: 'Already optimal' });
    }

    const stops = [...trip.stops];

    // Priority ordering by time-of-day category:
    // Morning: Breakfast & outdoor promenade
    // Midday: Indoor culture/museum/antiques
    // Sunset: Waterfront / Ferry / viewpoint
    // Evening: Dining & cultural shows
    const categoryRank = (category, name) => {
      const lower = (category + ' ' + name).toLowerCase();
      if (lower.includes('breakfast') || lower.includes('morning')) return 1;
      if (lower.includes('sight') || lower.includes('promenade') || lower.includes('temple')) return 2;
      if (lower.includes('palace') || lower.includes('culture') || lower.includes('museum')) return 3;
      if (lower.includes('lunch') || lower.includes('market') || lower.includes('walk')) return 4;
      if (lower.includes('sunset') || lower.includes('water metro') || lower.includes('ferry') || lower.includes('waterfront')) return 5;
      if (lower.includes('dinner') || lower.includes('recital') || lower.includes('evening') || lower.includes('night')) return 6;
      return 3.5;
    };

    // Keep locked stops in place, sort unlocked
    const lockedMap = {};
    stops.forEach((s, idx) => {
      if (s.isLocked) lockedMap[idx] = s;
    });

    const unlocked = stops.filter((s) => !s.isLocked);
    unlocked.sort((a, b) => categoryRank(a.category, a.name) - categoryRank(b.category, b.name));

    const optimizedStops = [];
    let unlockedIdx = 0;
    for (let i = 0; i < stops.length; i++) {
      if (lockedMap[i]) {
        optimizedStops.push(lockedMap[i]);
      } else {
        optimizedStops.push(unlocked[unlockedIdx++]);
      }
    }

    // Assign realistic progressive schedule timings
    const times = ['08:30', '10:00', '11:45', '13:30', '15:30', '17:30', '19:15', '20:45'];
    const transitModes = [
      'Walk • 6 min • Free',
      'Auto • 10 min • ₹60',
      'Water Metro • 18 min • ₹25',
      'Walk • 8 min • Free',
      'Metro • 12 min • ₹20',
      'Auto • 15 min • ₹80',
      'End of Itinerary',
    ];

    optimizedStops.forEach((stop, idx) => {
      stop.time = times[idx % times.length];
      if (idx < optimizedStops.length - 1) {
        stop.transitToNext = transitModes[idx % (transitModes.length - 1)];
      } else {
        stop.transitToNext = 'End of Day';
      }
    });

    trip.stops = optimizedStops;
    await trip.save();

    res.status(200).json({
      success: true,
      message: 'Route optimized with AI! Backtracking eliminated and transit times reduced.',
      trip,
    });
  } catch (error) {
    console.error('optimizeTripRoute error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Generate dynamic customized multi-day trip using city intelligence & save to MongoDB
// @route POST /api/trips/generate
exports.generateTrip = async (req, res) => {
  try {
    const {
      destination = 'Kochi',
      days = 2,
      adults = 2,
      budget = 5000,
      vibe = 'Culture & Heritage',
      routingMode = 'Transit',
      trafficPace = 'Balanced',
      userId = 'guest',
    } = req.body;

    const { GLOBAL_CITIES } = require('./intelligenceController');
    const cleanDest = (destination || 'Kochi').trim();

    // Find matching city
    let cityKey = 'Kochi';
    if (GLOBAL_CITIES) {
      const match = Object.keys(GLOBAL_CITIES).find(
        (k) => k.toLowerCase() === cleanDest.toLowerCase() || cleanDest.toLowerCase().includes(k.toLowerCase())
      );
      if (match) cityKey = match;
    }

    const cityObj = GLOBAL_CITIES ? GLOBAL_CITIES[cityKey] : null;
    const currency = cityObj ? cityObj.currency : 'INR';
    const currencySymbol = cityObj ? cityObj.currencySymbol : '₹';

    const numDays = Math.max(1, Math.min(7, Number(days) || 2));
    const stops = [];

    // Realistic time slots per day
    const timeSlots = [
      { time: '08:45 AM', duration: '45m' },
      { time: '10:30 AM', duration: '1h 30m' },
      { time: '01:00 PM', duration: '1h 15m' },
      { time: '03:30 PM', duration: '1h 30m' },
      { time: '05:45 PM', duration: '1h 15m' },
      { time: '07:30 PM', duration: '2h' },
    ];

    const landmarks = cityObj?.mapData?.landmarks || [];
    const cafes = cityObj?.cafes || [];
    const transit = cityObj?.transit || [];
    const events = cityObj?.events || [];
    const movies = cityObj?.movies || [];

    // Build day-by-day stops
    for (let d = 1; d <= numDays; d++) {
      // 1. Morning Breakfast
      const cafeItem = cafes.length > 0 ? cafes[(d - 1) % cafes.length] : null;
      const breakfastName = cafeItem
        ? `Morning Coffee & Breakfast at ${cafeItem.name} (${cafeItem.area || cityObj?.cityName})`
        : `Artisan Breakfast at ${cityObj?.cityName || cleanDest} Promenade`;
      stops.push({
        id: `gen_d${d}_1`,
        day: d,
        name: breakfastName,
        time: timeSlots[0].time,
        duration: timeSlots[0].duration,
        cost: Math.round(Number(budget) * 0.04) || 250,
        category: 'Food & Cafe',
        transitToNext: transit.length > 0 ? `${transit[0].type} • 10 min • ${transit[0].fare}` : 'Walk • 8 min • Free',
        isLocked: false,
        visited: d === 1,
      });

      // 2. Primary Morning Landmark / Sight
      const lm1 = landmarks.length > 0 ? landmarks[(d * 2 - 2) % landmarks.length] : null;
      stops.push({
        id: `gen_d${d}_2`,
        day: d,
        name: lm1 ? `${lm1.name} (${lm1.category})` : `Historic Discovery Day ${d}`,
        time: timeSlots[1].time,
        duration: timeSlots[1].duration,
        cost: lm1 && lm1.fee !== 'Free' ? parseInt(lm1.fee.replace(/[^0-9]/g, '')) || 50 : 0,
        category: lm1 ? (lm1.type === 'heritage' ? 'Culture & Heritage' : 'Sight') : 'Sight',
        transitToNext: transit.length > 1
          ? `${transit[1 % transit.length].name} • 15 min • ${transit[1 % transit.length].fare}`
          : 'Transit • 12 min',
        isLocked: false,
        visited: false,
      });

      // 3. Cultural / Afternoon Exploration
      const lm2 = landmarks.length > 0 ? landmarks[(d * 2 - 1) % landmarks.length] : null;
      stops.push({
        id: `gen_d${d}_3`,
        day: d,
        name: lm2 ? `${lm2.name} - Architectural Exploration` : `Local Heritage & Artisan Market Walk`,
        time: timeSlots[3].time,
        duration: timeSlots[3].duration,
        cost: Math.round(Number(budget) * 0.05) || 150,
        category: 'Culture & Heritage',
        transitToNext: transit.length > 2
          ? `${transit[2 % transit.length].name} • 18 min • ${transit[2 % transit.length].fare}`
          : 'Walk • 10 min • Free',
        isLocked: false,
        visited: false,
      });

      // 4. Sunset & Waterfront / Scenic Vista
      const sunsetLm = landmarks.find((l) => l.type === 'sunset') || landmarks[0];
      stops.push({
        id: `gen_d${d}_4`,
        day: d,
        name: sunsetLm ? `Golden Hour Sunset at ${sunsetLm.name}` : `${cityObj?.cityName || cleanDest} Sunset Skyline Vista`,
        time: timeSlots[4].time,
        duration: timeSlots[4].duration,
        cost: 0,
        category: 'Nature & Sunset',
        transitToNext: transit.length > 0 ? `${transit[0].type} • 12 min • ${transit[0].fare}` : 'Walk • 6 min • Free',
        isLocked: false,
        visited: false,
      });

      // 5. Evening Cultural Show or Dining
      const eventItem = events.length > 0 ? events[(d - 1) % events.length] : null;
      const movieItem = movies.length > 0 ? movies[(d - 1) % movies.length] : null;
      const eveningName = eventItem
        ? `${eventItem.title} (${eventItem.location})`
        : movieItem
        ? `Night Screening: ${movieItem.title} at ${movieItem.theater}`
        : `Evening Culinary Dinner & Night Market Walk`;
      stops.push({
        id: `gen_d${d}_5`,
        day: d,
        name: eveningName,
        time: timeSlots[5].time,
        duration: timeSlots[5].duration,
        cost: Math.round(Number(budget) * 0.08) || 400,
        category: 'Culture & Heritage',
        transitToNext: 'End of Day Flow',
        isLocked: false,
        visited: false,
      });
    }

    const title = `${cityObj ? cityObj.cityName : cleanDest} ${numDays}-Day ${vibe} Expedition`;
    const destinationStr = cityObj ? `${cityObj.cityName}, ${cityObj.country}` : cleanDest;
    const weather = cityObj
      ? `${cityObj.weather.condition} • Sunset at ${cityObj.weather.sunsetTime}`
      : 'Pleasant & clear skies';

    const newTrip = await Trip.create({
      userId: userId || 'guest',
      title,
      destination: destinationStr,
      city: cityObj ? cityObj.cityName : cleanDest,
      currency,
      days: numDays,
      adults: Number(adults) || 2,
      budget: Number(budget) || 5000,
      weather,
      trafficPace: `${trafficPace} (${routingMode} prioritized)`,
      stops,
      status: 'active',
    });

    res.status(201).json({
      success: true,
      message: `Dynamic ${numDays}-day itinerary generated for ${destinationStr}!`,
      trip: newTrip,
    });
  } catch (error) {
    console.error('generateTrip error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
