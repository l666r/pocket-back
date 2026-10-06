const express = require('express');
const router = express.Router();
const {
  getPlaces,
  createPlace,
  upvotePlace,
  ratePlace,
} = require('../controllers/placeController');

router.get('/', getPlaces);
router.post('/', createPlace);
router.post('/:id/upvote', upvotePlace);
router.post('/:id/rate', ratePlace);

module.exports = router;
