const express = require('express');
const router = express.Router();

const houses_controller = require('./mongo/houses.js');

router.get('/houses/:houseId', houses_controller.get);
router.get('/v1/rentals'),
router.get('/v1/rentals/:id', houses_controller.get), 
router.get('/v1/ratings'),

// could these be internal routes
router.get('/v1/ratings/rentals/:id'),
router.get('/v1/photos/rentals/:id'),
router.get('/v1/descriptions/rentals/:id'),
router.get('/v1/capacity/rentals/:id'),
router.get('/v1/fees/rentals/:id')


module.exports = router;

