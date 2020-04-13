const express = require('express');
const router = express.Router();

const { m_rentals_by } = require('./mongo/rentals.js');

// MONGO
router.get('/m/rentals', m_rentals_by);
router.get('/m/rentals/:id');
router.get('/m/ratings');


// could these be internal routes
router.get('/m/ratings/rentals/:id');
router.get('/m/photos/rentals/:id');
router.get('/m/descriptions/rentals/:id');
router.get('/m/capacity/rentals/:id');
router.get('/m/fees/rentals/:id');




const { p_rentals_by } = require('./postgres/rentals.js');

// POSTGRES
router.get('/p/rentals', p_rentals_by)



module.exports = router;

