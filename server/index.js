const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.static(path.join('client', 'public')))

// create database connection
const connection = require('../database/mongo/connection.js');
app.connection = connection;

// load controller routes
const v1Router = require('../controllers/index.js');


// add controller routes
app.use('/', v1Router);


var port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Related Houses Listening ${port}`))




// app.use('/rentals/:id', controller.GET);
// app.use('/rentals/:id/update', controller.PUT)

// app.get('/rentals/:id', controller)


// app.get('/houses/:houseId(\\d+)', (req, res) => {

//   // res.redirect(`/?houseId=${req.params.houseId}`)
//   controller.get(req.params.houseId, (error, dbResponse) => callback(error, dbResponse, res));
// })



// app.get('/houses/*', function (req, res) {
//   let oneHouse = {};
//   let callback = (relatedHouses) => {
//     oneHouse = JSON.stringify(relatedHouses)
//     res.send(oneHouse)
//   }
//   controller.get( req.query.houseId, callback);
// })

