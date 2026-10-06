const ContributedPlace = require('../models/ContributedPlace');

// Sample default places to seed if collection is empty
const SEED_PLACES = [
  {
    name: 'Marine Drive Waterfront Promenade',
    category: 'Nature & Sunset',
    area: 'Ernakulam',
    address: 'Shanmugham Road, Marine Drive, Kochi',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    latitude: 9.9770,
    longitude: 76.2756,
    entryFee: 0,
    bestTime: '5:30 PM – 7:00 PM (Sunset)',
    description: 'Picturesque waterfront walkway overlooking the backwaters, Rainbow Bridge, and Chinese fishing boats. Perfect for quiet evening walks.',
    contributedBy: 'Arjun K.',
    upvotes: 42,
  },
  {
    name: 'Kashi Art Cafe & Gallery',
    category: 'Food & Cafe',
    area: 'Fort Kochi',
    address: 'Burgher St, Fort Nagar, Fort Kochi',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    latitude: 9.9655,
    longitude: 76.2420,
    entryFee: 0,
    bestTime: '9:00 AM – 1:00 PM (Breakfast)',
    description: 'Renowned cultural cafe with rotating art exhibitions, specialty coffees, and legendary chocolate cake. Loved by travelers.',
    contributedBy: 'Priya Mohan',
    upvotes: 38,
  },
  {
    name: 'Seagull Waterfront Restaurant',
    category: 'Food & Cafe',
    area: 'Fort Kochi',
    address: 'Calvathy Road, Fort Kochi',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    latitude: 9.9690,
    longitude: 76.2480,
    entryFee: 0,
    bestTime: '7:30 PM – 10:30 PM',
    description: 'Open-air backwaters deck where ships glide by right next to your table. Great seafood and peaceful sea breezes.',
    contributedBy: 'Ramesh V.',
    upvotes: 29,
  },
  {
    name: 'High Court Water Metro Terminal',
    category: 'Transit & Ferry',
    area: 'Ernakulam',
    address: 'Near High Court of Kerala, Marine Drive',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
    latitude: 9.9800,
    longitude: 76.2760,
    entryFee: 20,
    bestTime: 'All day (every 15 mins)',
    description: 'Main hub for Kochi Water Metro connecting to Vypin, Bolgatty, and South Chittoor. Air-conditioned and scenic.',
    contributedBy: 'Bibin (Admin)',
    upvotes: 56,
  },
];

// @desc Get all contributed places
// @route GET /api/places
exports.getPlaces = async (req, res) => {
  try {
    const { category, area } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (area && area !== 'All') query.area = area;

    let places = await ContributedPlace.find(query).sort({ upvotes: -1, createdAt: -1 });

    if (places.length === 0 && (!category || category === 'All') && (!area || area === 'All')) {
      places = await ContributedPlace.insertMany(SEED_PLACES);
    }

    res.status(200).json({ success: true, count: places.length, places });
  } catch (error) {
    console.error('getPlaces error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Submit a new place contribution (Google Maps style)
// @route POST /api/places
exports.createPlace = async (req, res) => {
  try {
    const { name, category, area, city, address, entryFee, bestTime, description, contributedBy, imageUrl, rating } = req.body;

    if (!name || !description) {
      return res.status(400).json({ success: false, message: 'Place name and description are required' });
    }

    const newPlace = await ContributedPlace.create({
      name: name.trim(),
      category: category || 'Sight',
      area: (area || city || 'Kochi').trim(),
      city: city || 'Kochi',
      address: address || '',
      imageUrl: imageUrl || '',
      rating: Number(rating) || 5,
      entryFee: Number(entryFee) || 0,
      bestTime: bestTime || 'Morning or Evening',
      description: description.trim(),
      contributedBy: contributedBy || 'Community Explorer',
      upvotes: 1,
    });

    res.status(201).json({ success: true, place: newPlace });
  } catch (error) {
    console.error('createPlace error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Upvote a place
// @route POST /api/places/:id/upvote
exports.upvotePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await ContributedPlace.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }

    res.status(200).json({ success: true, upvotes: place.upvotes, place });
  } catch (error) {
    console.error('upvotePlace error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Rate and review a place
// @route POST /api/places/:id/rate
exports.ratePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, userName } = req.body;

    const place = await ContributedPlace.findById(id);
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }

    const star = Math.max(1, Math.min(5, Number(rating) || 5));
    const currentCount = place.ratingCount || 1;
    const currentRating = place.rating || 5;

    // Recalculate average rating
    const newRating = Number(((currentRating * currentCount + star) / (currentCount + 1)).toFixed(1));
    place.rating = newRating;
    place.ratingCount = currentCount + 1;

    if (comment && comment.trim()) {
      if (!place.comments) place.comments = [];
      place.comments.unshift({
        user: userName || 'Explorer',
        text: comment.trim(),
        rating: star,
        createdAt: new Date(),
      });
    }

    await place.save();

    res.status(200).json({
      success: true,
      message: 'Thank you for your rating & review!',
      rating: place.rating,
      ratingCount: place.ratingCount,
      comments: place.comments,
      place,
    });
  } catch (error) {
    console.error('ratePlace error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
