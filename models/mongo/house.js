let { House } = require('../mongo/models.js');



let query = (houseId, callback) => {
  House.find({ houseId }, null, (err, house) => {
    if (err) { callback(err) }
    let returnId = house.houseId
    House.find({houseId: {$in: house[0].relatedHouses}}, (err, houses) => {
      callback(null, houses)
    })
  });
}


module.exports = { query };
