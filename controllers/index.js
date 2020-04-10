const express = require('express');
const router = express.Router();

const mongo_rentals_controller = require('./mongo/rentals.js');

// MONGO
router.get('/v1/m/rentals', mongo_rentals_controller.get),
router.get('/v1/m/rentals/:id'), 
router.get('/v1/m/ratings'),

// could these be internal routes
router.get('/v1/m/ratings/rentals/:id'),
router.get('/v1/m/photos/rentals/:id'),
router.get('/v1/m/descriptions/rentals/:id'),
router.get('/v1/m/capacity/rentals/:id'),
router.get('/v1/m/fees/rentals/:id')

const postgres_rentals_controller = require('./postgres/rentals');

// POSTGRES
router.get('/v1/p/rentals', postgres_rentals_controller.rentals_list)



module.exports = router;

