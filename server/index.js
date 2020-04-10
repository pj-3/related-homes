const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.static(path.join('client', 'public')))

// connect mongodb database
require('../database/mongo/connection.js');

// connect postgres database
require('../database/postgres/postgres-connection.js');

// load controller routes
const v1Router = require('../controllers/index.js');


// add controller routes
app.use('/', v1Router);


var port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Related Houses Listening ${port}`))


