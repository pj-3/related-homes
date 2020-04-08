const faker = require('faker'); // https://www.npmjs.com/package/faker
const fs = require('fs');
const helper = require('../../database/mongo/schemaHelpers.js');


let rentalId = 21;
function writeNTimes(writer, qty, encoding, callback) {
    let totalRecords = qty + rentalId - 1;
    
    console.log('writing ...')
    writer.write('[', encoding); // insert array start bracket
    // start write
    write();

    function write() {
        let ok = true;
        do {
            qty--;
            if (qty === 0) {

                // Last time!
                writer.write(build(rentalId, totalRecords), encoding, callback);
                writer.write(']', encoding); // insert array ending bracket

                console.log('writing done - rentalId=', rentalId);
            } else {

                // See if we should continue, or wait.
                // Don't pass the callback, because we're not done yet.
                ok = writer.write(build(rentalId, totalRecords), encoding);
            }

            rentalId++;
        } while (qty > 0 && ok);
        if (qty > 0) {
            // Had to stop early!
            // Write some more once it drains.
            writer.once('drain', write);
        }
    }

}


function build(rentalId, totalRecords) {

    const houseTypes = ['apartment unit', 'living rooom', 'condo', 'loft', 'house', 'enti1028/tcpre house', 'entire apartment', 'entire villa']
    let bedsAndHouse = helper.makeBedsAndHouseString(houseTypes);
    let photoSrc = faker.image.imageUrl(320, 240, 'city', true);

    let pricePerNight = faker.commerce.price()
    let bedsAndHouseParts = bedsAndHouse.split('-');
    let rentals_types = bedsAndHouseParts[0].trim();

    let occupancies =  Math.floor(Math.random() * 8);
    let maxCapacity = Math.floor(Math.random() * occupancies);
    let maxAdult = Math.floor(Math.random() * maxCapacity);
    let maxChildren = Math.floor(Math.random() * maxAdult);


    const amenities = ['wifi', 'free coffee', 'daily cleaning service', 'breakfast', 'laundry', 'kitchen'];
    let amenItems = amenities.slice(Math.floor(Math.random() * amenities.length))


    const rentals = {
        rentals_id: ''+rentalId,
        primary_photo: photoSrc,
        owner: ''+rentalId,
        rentals_types: rentals_types,
        raters: ''+(Math.floor(Math.random() * 1000)),
        capacity_max: occupancies > 3 ? occupancies : 2,
        max_children: maxChildren > 3 ? maxChildren : 0,
        rates: pricePerNight,
        term_types: 'per night',
        heading: helper.makeDescription(),
        subheading: helper.makeDescription(),
        amenities: amenItems,
        photos: [photoSrc],
        created_date: new Date(),
        updated_date: new Date(),

    }

    return totalRecords !== rentalId ? JSON.stringify(rentals) + ',' : JSON.stringify(rentals);

}



let startTime = new Date();
let totalQty = 0;
let runtime = undefined;

function runWrite(callback) {

    const qty = 500000;
    const encoding = 'utf8';
    let fileParts = 0;

    setInterval(function() {
        if (fileParts === 20) {
            runtime = new Date() - startTime;
            return callback(`Done writing ${qty} records in ${runtime} secs`);
        }

        const writer = fs.createWriteStream('./seed-data/rentals-'+fileParts+'-data.json');

        writeNTimes(writer, qty, encoding, (err, data) => {
            if (err) { console.log('error=', err) };
            totalQty += qty;
            runtime = new Date() - startTime;
            console.log('Done writing ... ', totalQty)
        });
        fileParts++;

    }, 10000); // timebox 1 set to determine interval time

}

runWrite((message) => {
    console.log(message);
});


