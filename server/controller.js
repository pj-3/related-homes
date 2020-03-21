const express = require('express');
const controller = express.Router();
const models = require ('./models.js');


let get = (callback) => {

  models.query(callback)
};

module.exports = { get };
