const express = require('express');
const path = require ('path');
const app = express();
const port = 1028;

// app.get('/', (req, res) => res.send('You Got Served'))

app.use(express.static(path.join(__dirname, '../client', 'public')))

app.listen(port, () => console.log(`And Now Its On Port ${port}`))