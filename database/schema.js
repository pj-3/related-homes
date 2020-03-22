// const db = require('db');
const faker = require('faker')
const mongoose = require('mongoose')
const util = require('util')
const helper = require('./schemaHelpers.js');

mongoose.connect('mongodb://localhost/Relaxly', {useNewUrlParser: true, useUnifiedTopology: true});

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


let houseItemMaker = (numberOfHouses) => {
  let array = [];
  for (var i = 1; i <= numberOfHouses; i++) {
    let houseObj = {
      houseId: i,
      photoSrc:'https://loremflickr.com/320/240',
      bedsAndHouse: helper.makeBedsAndHouseString(),
      rating: `${helper.getRandomArbitrary(3,5).toFixed(2)} (${helper.getRandomInt(10, 10000)})`,
      description: `${helper.makeDescription()}`,
      pricePerNight: `$${faker.commerce.price()}`,
      relatedHouses: helper.makeRelatedHousesArray(1,numberOfHouses, i, 12)
    }
    array.push(houseObj);
  }
  return array;
  }

  let dbSeeder = (numberOfEntries) => {
    const allHousesArray = houseItemMaker(numberOfEntries)
    House.insertMany(allHousesArray, function (err) {
      if (err) {throw (err);}
    });
  }

// dbSeeder(100)

  let query = (callback) => {
    let getHouses = House.find(null, 'relatedHouses', (err, houses) => {
      // console.log('this is relatedHouses: ', houses[0].relatedHouses[0]);
      let relatedHouses = houses[0].relatedHouses;
      callback(relatedHouses)
    });
  }



module.exports = { query }