const faker = require('faker'); // https://www.npmjs.com/package/faker
const fs = require('fs');
const helper = require('../../database/mongo/schemaHelpers.js');


let rentalId = 0;
function writeNTimes(writer, batchQty, encoding, callback) {
    let totalOfBatch = batchQty + rentalId;

    console.log('writing ...')
    writer.write('[', encoding); // insert array start bracket
    // start write
    write();

    function write() {
        let ok = true;
        do {
            batchQty--;
            if (batchQty === 0) {

                // Last time!
                writer.write(build(totalOfBatch), encoding, callback);
                writer.write(']', encoding); // insert array ending bracket

                console.log('writing done - rentalId=', rentalId);
            } else {

                // See if we should continue, or wait.
                // Don't pass the callback, because we're not done yet.
                ok = writer.write(build(totalOfBatch), encoding);
            }

        } while (batchQty > 0 && ok);
        if (batchQty > 0) {
            // Had to stop early!
            // Write some more once it drains.
            writer.once('drain', write);
        }
    }

}


// load raters once
// const raters = require('./generate-raters.js');
function build(totalOfBatch) {

    const houseTypes = ['apartment unit', 'living rooom', 'condo', 'loft', 'house', 'enti1028/tcpre house', 'entire apartment', 'entire villa']
    let bedsAndHouse = helper.makeBedsAndHouseString(houseTypes);
    let photoSrc = helper.imageLoader();
    let description = faker.lorem.paragraph(Math.floor(Math.random() * 12))

    let pricePerNight = faker.commerce.price();
    let bedsAndHouseParts = bedsAndHouse.split('-');
    let rentals_types = bedsAndHouseParts[0].trim();

    let occupancies = Math.floor(Math.random() * 24);
    let maxCapacity = Math.floor(Math.random() * occupancies);
    let maxAdult = Math.floor(Math.random() * maxCapacity);
    let maxChildren = Math.floor(Math.random() * maxAdult);

    const generateRaters = function () {
        let totalRaters = 100000;
        let votersCount = (Math.floor(Math.random() * totalRaters)) * (Math.random() / 10000);
        let raters = [];
        for (let i = 0; i < votersCount; i++) {
            let rater = {};
            let voterRating = parseFloat(Math.random() * 5);
            rater.raters_id = Math.floor(Math.random() * totalRaters);
            rater.voters_rating = voterRating;
            raters.push(rater);
            rater = null;
        }
        return raters;
    }

    let raters = generateRaters();
    // remove any duplicate entries
    raters = raters.reduce((prev, current) => prev.includes(current.raters_id) ? prev : [...prev, current], []);
    const rating = raters.reduce((rating, rater) => rating + rater.voters_rating, 0);
    const amenities = ['wifi', 'free coffee', 'daily cleaning service', 'breakfast', 'laundry', 'kitchen'];
    let amenItems = amenities.slice(Math.floor(Math.random() * amenities.length))


    const rentals = {
        rentals_id: rentalId,
        primary_photo: photoSrc,
        owner: rentalId,
        rentals_types: rentals_types,
        rating: rating / raters.length,
        raters: raters,
        capacity_max: occupancies > 3 ? occupancies : 2,
        max_children: maxChildren > 3 ? maxChildren : 0,
        rates: parseFloat(pricePerNight),
        term_types: 'per night',
        heading: helper.makeDescription(),
        subheading: helper.makeDescription(),
        description: description,
        amenities: amenItems,
        photos: [photoSrc],
        created_date: new Date(),
        updated_date: new Date(),

    }

    rentalId++;
    return totalOfBatch !== rentalId ? JSON.stringify(rentals) + ',' : JSON.stringify(rentals);

}


let startTime = new Date();
let totalCreatedRecords = 0;
let runtime = undefined;
let batchQty = 1000;
let filePart = 0;
const encoding = 'utf8';

function runWrite(callback) {


    if (filePart === 10000) {
        runtime = new Date() - startTime;
        callback(`Done writing ${totalCreatedRecords} records in ${runtime / 1000} secs`);
        return;
    }

    const writer = fs.createWriteStream(__dirname + '/seed-data/rentals-' + filePart + '-data.json');
    // const writer = fs.createWriteStream('./sample-rentals-data.json');

    writeNTimes(writer, batchQty, encoding, (err, data) => {
        if (err) { console.log('error=', err) };

        totalCreatedRecords += batchQty;
        runtime = new Date() - startTime;
        console.log(`Done writing part ${filePart} in ${runtime / 1000} secs`);
        
        filePart++;
        runWrite(callback)
    });

}

// runWrite(fileParts);

runWrite((message) => {
    console.log(message);
    return;
});


