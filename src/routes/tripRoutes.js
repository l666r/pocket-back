const express = require('express');
const router = express.Router();
const {
  getTrips,
  createTrip,
  updateTrip,
  toggleFavorite,
  deleteTrip,
  getSharedTrip,
} = require('../controllers/tripController');

router.get('/', getTrips);
router.post('/', createTrip);
router.put('/:id', updateTrip);
router.put('/:id/favorite', toggleFavorite);
router.delete('/:id', deleteTrip);
router.get('/share/:shareCode', getSharedTrip);

module.exports = router;
