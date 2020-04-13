require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.static(path.join('client', 'public')))

// connect mongodb database
require('../database/mongo/mongodb-connection.js');

// connect postgres database
require('../database/postgres/postgres-connection.js');

// load controller routes
const router = require('../controllers/index.js');


app.use('/v1', router);

// add controller routes; redirect old route
app.use('/houses/:houseId', (req, res) => {
    res.header.isOldVersion = 'true'; // set old version flag
    res.redirect('/v1/p/rentals'); // m for mongo route 
});




var port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Related Houses Listening ${port}`))


