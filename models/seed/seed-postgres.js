const { Client, Pool } = require('pg');
const fs = require('fs');

// var dbName = 'related_rentals',
// username = 'postgres',
// password = 'password',
// host = 'localhost'

// var conStringPri = 'postgres://' + username + ':' + password + '@' + host + '/'+dbName;

// var client = new Client(conStringPri);
// client.connect();


let startTime = new Date();
let runtime = undefined;



// TOO SLOW
const insertDocs = function (fileParts, callback) {
    if (fileParts >= 200) {
        return callback(`Done inserting set ${fileParts} in ${runtime / 1000} 'secs`);
    }

    try {

        fs.open('./seed-data/rentals-' + fileParts + '-data.json', function (err, fd) {
            fs.readFile(fd, { encoding: 'utf8' }, async (err, data) => {
                if (err) { return err; }

                var database = 'related_rentals',
                    username = 'postgres',
                    password = 'password',
                    host = 'localhost',
                    port = 5432

                var pool = new Pool({
                    host: host,
                    user: username, password: password, max: 100,
                    database: database, port: port, idleTimeoutMillis: 5000,
                    poolSize: 100, connectionTimeoutMillis: 2000
                });


                const client = await pool.connect();

                console.log('Started inserting set ', fileParts);
                fileData = JSON.parse(data)

                for (let key in fileData) {


                    // declare variables 
                    const rentals_id = fileData[key].rentals_id;
                    const heading = fileData[key].heading;
                    const subheading = fileData[key].subheading;
                    const description = fileData[key].description;
                    const rentals_types = fileData[key].rentals_types;
                    const term_types = fileData[key].term_types;
                    const rates = fileData[key].rates;
                    const raters = fileData[key].raters;
                    const capacity_max = fileData[key].capacity_max;
                    const max_children = fileData[key].max_children;
                    const amenities = JSON.stringify(fileData[key].amenities);
                    const owner = fileData[key].owner;
                    const created_date = fileData[key].created_date;
                    const updated_date = fileData[key].updated_date;

                    const photos = fileData[key].photos[0]; // always only ONE photo record for seeding
                    const primary_photo = true;

                    // prepare statements
                    const rentalsText = `INSERT INTO public.rentals(
                    id, heading, subheading, description, 
                    rentals_types, term_types, rates, capacity_max, 
                    max_children, amenities, owner, created_date, updated_date)
                    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 );`

                    const photosText = `INSERT INTO public.photos(
                        photos, is_primary_photo, rental_id)
                        VALUES ( $1, $2, $3 );`

                    // set variables

                    const rentalsValues = [rentals_id, heading, subheading, description,
                        rentals_types, term_types, rates, capacity_max,
                        max_children, amenities, owner, created_date, updated_date]

                    const photosValues = [photos, primary_photo, rentals_id];

                    try {

                        await client.query('BEGIN')

                        await client.query(rentalsText, rentalsValues);

                        await client.query(photosText, photosValues);

                        for (let k in raters) {

                            // declare variables
                            const raters_id = raters[k].raters_id;
                            const voters_rating = raters[k].voters_rating;

                            // prepare statements
                            const ratingsText = `INSERT INTO public.ratings(
                            raters_id, voters_rating, rental_id)
                            VALUES ( $1, $2, $3 );`
                            const ratingsValues = [raters_id, voters_rating, rentals_id]

                            // add to query
                            await client.query(ratingsText, ratingsValues)
                        }

                        await client.query('COMMIT')

                        // console.log('Done inserting set ', key, ' id=', rentals_id);

                    } catch (err) {
                        console.log(err);
                        return;
                    }
                }

                fs.close(fd, () => {

                    fileParts++;
                    runtime = new Date() - startTime;
                    console.log('Done inserting set ', fileParts, ' in ', runtime / 1000, 'secs');
                    client.release(true)

                    return insertDocs(fileParts, callback)
                });

            })
        });

    } catch (error) {
        console.log(error)
        return error;
    }

}


insertDocs(97, (message) => {
    console.log(message);
});


