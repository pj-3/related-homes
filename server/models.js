const mongoose = require('mongoose');
mongoose.set('debug', true);

let mongoHost = process.env.MONGOHOST || 'localhost'

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  socketTimeoutMS: 1000
}

mongoose.connect(`mongodb://${mongoHost}`, options);

var schema = new mongoose.Schema({
  houseId: {type: 'number', unique: true},
  photoSrc: 'string',
  bedsAndHouse: 'string',
  rating: 'string',
  description: 'string',
  pricePerNight: 'string',
  relatedHouses: ['number']
});

var House = mongoose.model('House', schema);


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
