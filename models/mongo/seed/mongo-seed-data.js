const faker = require('faker'); // https://www.npmjs.com/package/faker
const fs = require('fs');
const helper = require('../../../database/mongo/schemaHelpers.js');


function writeOneMillionTimes(writer, qty, encoding, callback) {
    console.log('writing ...')
    let houseId = 12;
    writer.write('[', encoding); // insert array start bracket
    // start write
    write();

    function write() {
        let ok = true;
        do {
            qty--;
            if (qty === 0) {

                // Last time!
                writer.write(build('Houses', houseId, qty), encoding, callback);
                writer.write(']', encoding); // insert array ending bracket

            } else {

                // See if we should continue, or wait.
                // Don't pass the callback, because we're not done yet.
                ok = writer.write(build('Houses', houseId, qty), encoding);

                houseId++;
            }
        } while (qty > 0 && ok);
        if (qty > 0) {
            // Had to stop early!
            // Write some more once it drains.
            writer.once('drain', write);
        }
    }

}


function build(modelName, houseId, qty) {

    if (modelName === 'Fees') {
        
        terms = ['1', '14', '30'];
        term_types = ['hourly', 'monthly']
        const model = {
            rates: faker.commerce.price(0, 1000),
            terms: terms[Math.floor(Math.random() * terms.length)],
            term_types: term_types[Math.floor(Math.random() * term_types.length)]
        }
        return JSON.stringify(model) + ',';
    }

    if (modelName === 'Houses') {
        
        const houseTypes = ['apartment unit', 'living rooom', 'condo', 'loft', 'house', 'enti1028/tcpre house', 'entire apartment', 'entire villa']
        let bedsAndHouse = helper.makeBedsAndHouseString(houseTypes);
        let ratings = `${helper.getRandomArbitrary(3,5).toFixed(2)} (${helper.getRandomInt(10, 10000)})`;
        let photoSrc = faker.image.imageUrl(320, 240, 'city', true);
        let description = `${helper.makeDescription()}`;
        // let relatedHouses = helper.makeRelatedHousesArray(1, houseId, bedsAndHouse, Math.floor(Math.random() * 12));
        let relatedHouses = [];
        let pricePerNight =  `$${faker.commerce.price()}`;

        let bedsAndHouseParts = bedsAndHouse.split('-');
        let rentals_types = bedsAndHouseParts[0].trim();
        let ratingsParts = ratings.split(' ');
        let ratePart = ratingsParts[0].trim();
        let ratersPart = ratersPart[1].trim();
        
        let maxPhotos = Math.floor(Math.random() * 8);
        let minPhotos = Math.floor(Math.random() * maxPhotos);

        const capacity_types = ['room', "whole", "den"];
        let occupancies = Math.floor(Math.random() * 8);
        let maxCapacity = Math.floor(Math.random() * occupancies);
        let maxAdult = Math.floor(Math.random() * maxCapacity);
        let maxChildren = Math.floor(Math.random() * maxAdult);


        const amenities = ['wifi', 'free coffee', 'daily cleaning service', 'breakfast', 'laundry', 'kitchen'];
        let amenItems = amenities.slice(Math.floor(Math.random() * amenities.length))

        const rate_types = ['rental', 'user']
        const rating = {
            raters: [],
            rate_types: 'rental',
            avg_ratings: ratings,
            total_raters: 
        }

        const description = {
            heading: helper.makeDescription(),
            subheading: helper.makeDescription(),
            amenities: amenItems
        }

        const capacity = {
            types: capacity_types[Math.floor(Math.random() * capacity_types.length)],
            occupancies: occupancies,
            min: 1,
            max_capacity: maxCapacity,
            max_adult: maxAdult,
            max_children: maxChildren < 1 ? 2 : maxChildren
        }

        const photo = {
            photos: [photoSrc],
            max: maxPhotos,
            primary_photo_index: minPhotos
        }

        const rentals = {
            rentals_id: houseId,
            relatedHouses: relatedHouses,
            created_date: new Date(),
            updated_date: new Date(),
            owner: houseId,
            rentals_types: rentals_types,
            photo,
            capacity,
            description,

        }

        const house = {
            houseId: houseId,
            photoSrc: photoSrc,
            bedsAndHouse: bedsAndHouse,
            rating: ratings,
            description: description,
            pricePerNight: pricePerNight,
            relatedHouses: relatedHouses,
            v1: [
                rentals
            ]
        }
        return JSON.stringify(house) + ',';
    }
}



const writer = fs.createWriteStream('./houses.json');
const qty = 100;
const encoding = 'utf8';


let startTime = new Date();
writeOneMillionTimes(writer, qty, encoding, (err, data) => {
    if (err) { console.log('error=', err) }

    let runtime = new Date() - startTime;
    console.log('runtime=', runtime);
})