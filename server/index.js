const express = require('express');
const app = express();
const port = 1028;

app.get('/', (req, res) => res.send('You Got Served'))

app.listen(port, () => console.log(`And Now Its On Port ${port}`))