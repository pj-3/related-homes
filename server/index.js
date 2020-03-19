const express = require('express');
const path = require ('path');
const app = express();
const port = 1028;
const controller = require ('./controller.js');

app.use(express.static(path.join(__dirname, '../client', 'public')))

app.get('/houses', function (req, res) {
  let result = controller.get(req,res);
  res.send(result)
})

app.listen(port, () => console.log(`And Now Its On Port ${port}`))