const express = require('express');
const router = express.Router();
const {
  getPlaces,
  createPlace,
  upvotePlace,
} = require('../controllers/placeController');

router.get('/', getPlaces);
router.post('/', createPlace);
router.post('/:id/upvote', upvotePlace);

module.exports = router;
