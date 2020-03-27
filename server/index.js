const express = require('express');
const path = require ('path');
const app = express();
const port = 9028;
const controller = require ('./controller.js');


app.use('/',express.static(path.join(__dirname, '../client', 'public')))

app.get('/houses/*', function (req, res) {
  let oneHouse = {};
  let callback = (relatedHouses) => {
    oneHouse = JSON.stringify(relatedHouses)
    res.send(oneHouse)
  }
  controller.get(req.query.houseId, callback);
})

app.listen(port, () => console.log(`Related Houses Listening ${port}`))