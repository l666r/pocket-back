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
