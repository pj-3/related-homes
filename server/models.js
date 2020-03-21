const mongo = require('../database/schema.js')


let query = (callback) => {
  let results = mongo.query(callback);
  return results;
};

module.exports = { query };
