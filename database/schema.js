// const db = require('db');
const faker = require('faker')
const mongoose = require('mongoose')
const util = require('util')
const helper = require('./schemaHelpers.js');

mongoose.connect('mongodb://localhost/Relaxly', {useNewUrlParser: true, useUnifiedTopology: true});

var schema = new mongoose.Schema({
  houseItem: {type: 'number', unique: true},
  relatedHouses: [{
    photoSrc: 'string', // strings of url locations
    bedsAndHouse: 'string', // 'string and possible number of beds'
    rating: 'string', // [number between 3-5 with 2 decimals for rating, integer less than 10k for # of strings]
    description: 'string',
    pricePerNight: 'string'
  }]
});

var House = mongoose.model('House', schema);

class houseObj {
  constructor () {
  this.photoSrc = 'https://loremflickr.com/320/240',
  this.bedsAndHouse = helper.makeBedsAndHouseString(),
  this.rating = `${helper.getRandomArbitrary(3,5).toFixed(2)} (${helper.getRandomInt(10, 10000)})`,
  this.description = `${helper.makeDescription()}`,
  this.pricePerNight = `$${faker.commerce.price()}`
  }
}

let houseItemMaker = (numberOfObjects) => {
  let array = [];
  for (var i = 1; i <= numberOfObjects; i++) {
    let relatedHouseArray = [];
    let relatedHouseMaker = () => {
      for (var j = 0; j < 8; j++) {
        relatedHouseArray.push(new houseObj)
      }
    }
    relatedHouseMaker();
    let houseItem = {
      houseItem: i,
      relatedHouses: relatedHouseArray
    }
    array.push(houseItem)
  }
  return array;
}

let query = (callback) => {
  let relatedHouses = House.find(null, 'relatedHouses', (err, houses) => {
    // console.log('this is relatedHouses: ', houses[0].relatedHouses[0]);
    let oneHouse = houses[0].relatedHouses[0];
    callback(oneHouse)
  });
}

// const allHousesArray = houseItemMaker(10)

// console.log('allHousesArray: ', util.inspect(allHousesArray, { showHidden: true, depth: null }));


// for(var k = 1; k <= 10; k++) {
// House.create(allHousesArray, function (err, small) {
//   if (err) {throw (err);}
// });
// }



module.exports = { query }