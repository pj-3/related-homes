const express = require('express');
const controller = express.Router();

let get = (req, res) => {
  return 'This is coming from controllers'
};

module.exports = { get };
