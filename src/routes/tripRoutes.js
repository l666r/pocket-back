const express = require('express');
const router = express.Router();
const {
  getTrips,
  createTrip,
  updateTrip,
  toggleFavorite,
  deleteTrip,
  getSharedTrip,
  optimizeTripRoute,
  generateTrip,
} = require('../controllers/tripController');

router.get('/', getTrips);
router.post('/', createTrip);
router.post('/generate', generateTrip);
router.put('/:id', updateTrip);
router.post('/:id/optimize', optimizeTripRoute);
router.put('/:id/favorite', toggleFavorite);
router.delete('/:id', deleteTrip);
router.get('/share/:shareCode', getSharedTrip);

module.exports = router;
