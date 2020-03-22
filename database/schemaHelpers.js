const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

const makeRelatedHousesArray = (minHouses, maxHouses, currentHouse, numberOfRelatedHouses) => {
  if (numberOfRelatedHouses > (maxHouses - minHouses - 1) ) {
    throw new Error('You asked for more relatedHouses than is possible');
  }
  let relatedHouses = [];
  for (var i = 1; i <= numberOfRelatedHouses; i++) {
    let addedHouse = getRandomInt(minHouses, maxHouses)
    while (relatedHouses.includes(addedHouse) || addedHouse === currentHouse) {
      addedHouse = getRandomInt(minHouses, maxHouses);
    }
    relatedHouses.push(addedHouse);
  }
  return relatedHouses;
}


const houseTypes = ['Entire House', 'Entire Apartment', 'Entire Villa']

const makeBedsAndHouseString = () => {
  if (getRandomInt(0,1)) {
    return `${houseTypes[getRandomInt(0,2)]} - ${getRandomInt(2,10)} beds`
  } else {
    return `Private Room - ${getRandomInt(1,3)} bed(s)`
  }
}

const makeDescription = () => {
  const adjectives = ['Georgeous', 'Rustic', 'Incredible', 'Breathtaking', 'Romantic', 'Beautiful', 'Amazing', 'Luxurious', 'Designer', 'Supurb', 'Unique', 'Exceptional', 'Perfect', 'Stylish', 'Private', 'Unique', 'Historic', 'Magical', 'Classical', 'Radiant', 'Charming']
  const descriptors = ['Tropical', 'Mountain', 'Beach', 'Forest', 'Desert', 'Hill-side', 'Secluded', 'Cozy', 'Lively', 'City', 'Suburban', 'Jungle', 'Woodsy', 'Wine-Country', 'Lakeside', 'Spacious', 'Backcountry', 'Quiet', 'Sunny', 'Waterfront', 'Coastal'];
  const houses = ['Home', 'Apartment', 'Villa', 'Condo', 'Chateau', 'Hacienda', 'Estate', 'Bungalow', 'Cottage', 'Cabin', 'Pied-à-Terre', 'Lodge', 'Ranch', 'Penthouse', 'Castle', 'Oasis', 'Farm', 'Farmhouse', 'Ecolodge', 'Yurt'];
  return `${adjectives[getRandomInt(0,adjectives.length-1)]} ${descriptors[getRandomInt(0,descriptors.length-1)]} ${houses[getRandomInt(0, houses.length-1)]}`
}

module.exports = {makeDescription, makeBedsAndHouseString, getRandomArbitrary, getRandomInt, makeRelatedHousesArray}