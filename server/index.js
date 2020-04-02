const express = require('express');
const path = require('path');
const controller = require('./controller.js');
const cors = require('cors')

const app = express();
const router = express.Router();

app.use(cors())
app.use(express.static(path.join('client', 'public')))


app.get('/houses/:houseId(\\d+)', (req, res) => {
  controller.get(req.params.houseId, (error, dbResponse) => {
    processDatabaseResponse(error, dbResponse, res)
  });
})


const processDatabaseResponse = (error, dbResponse, res) => {
  if (error) { console.log('Controller callback error', error); res.status(404).send() }
  return res.status(200).send(dbResponse)
}


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



var port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Related Houses Listening ${port}`))