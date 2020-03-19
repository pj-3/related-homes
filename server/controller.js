const express = require('express');
const controller = express.Router();
const models = require ('./models.js');

let get = (req, res) => {
  let results = models.query()
  return results;
};

module.exports = { get };
