const { Pool } = require('pg');
const format = require('pg-format');
const fs = require('fs');

let parts = 10001;
const stop = parts + 1999;
const intervalDelay = 100;
const activeTableName = 'ratings';

// track the time to process query insert
let startTime = new Date();
let runtime = undefined;

const getBatch = (fileParts) => {
    return new Promise((resolve, reject) => {

        let filePath = __dirname + '/seed-data/rentals-' + fileParts + '-data.json';
        // console.log('Path: ', filePath)
        // let filePath = __dirname + '/sample-rentals-data.json';

        fs.open(filePath, function (err, fd) {
            if (err) { reject(err) }

            fs.readFile(fd, { encoding: 'utf8' }, (err, data) => {
                if (err) { reject(err) }

                fs.close(fd, () => {
                    resolve(JSON.parse(data));
                });
            })
        });
    });
};


// we want to complete a batch / file
const prepareBatch = (batch, queryTableName) => {
    return new Promise((resolve, reject) => {
        const batchStatementValues = [];
        const batchSize = batch.length - 1;

        for (let k in batch) {

            // build up batch query statement
            buildQueryStatement(queryTableName, batch[k])
                .then(statement => {

                    // store values until iteration complete
                    if (k < batchSize) {
                        batchStatementValues.push(statement);
                    } else {
                        // done adding values, format final query statenent
                        formatQueryStatement(queryTableName, batchStatementValues)
                            .then(batchStatement => {
                                resolve(batchStatement);
                            })
                    }
                }).catch(err => {
                    console.log(err);
                    reject(err);
                })
        }
    })
}

const formatQueryStatement = (queryTableName, batchStatementValues) => {
    return new Promise((resolve, reject) => {
        // prepare statements
        const rentalsStatement = `INSERT INTO public.rentals(id, heading, subheading, description, rentals_types, term_types, rates, capacity_max, max_children, amenities, owner, created_date, updated_date) VALUES %L returning id;`
        const photosStatement = `INSERT INTO public.photos(photos, is_primary_photo, rental_id) VALUES %L returning id;`;
        const ratingsStatement = `INSERT INTO public.ratings(raters_id, voters_rating, rental_id) VALUES %L returning id;`;

        let queryStatement = null;
        if (queryTableName === 'rentals') { queryStatement = format(rentalsStatement, batchStatementValues); }
        if (queryTableName === 'photos') { queryStatement = format(photosStatement, batchStatementValues); }
        if (queryTableName === 'ratings') {

            batchValues = [];
            batchStatementValues.forEach((elSet, idx) => {
                elSet.forEach(el => batchValues.push(el))
            })
            // console.log(batchValues);
            queryStatement = format(ratingsStatement, batchValues);
        }

        resolve(queryStatement);
    })
}

const buildQueryStatement = (queryTableName, fileData) => {
    return new Promise((resolve, reject) => {

        const rentals_id = fileData.rentals_id;
        const heading = fileData.heading;
        const subheading = fileData.subheading;
        const description = fileData.description;
        const rentals_types = fileData.rentals_types;
        const term_types = fileData.term_types;
        const rates = fileData.rates;
        const raters = fileData.raters;
        const capacity_max = fileData.capacity_max;
        const max_children = fileData.max_children;
        const amenities = JSON.stringify(fileData.amenities);
        const owner = fileData.owner;
        const created_date = fileData.created_date;
        const updated_date = fileData.updated_date;

        const photos = fileData.photos[0]; // extract first photo as primary
        const primary_photo = true;

        // prepare values variables
        const rentalsValues = [rentals_id, heading, subheading, description, rentals_types, term_types, rates, capacity_max, max_children, amenities, owner, created_date, updated_date]
        const photosValues = [photos, primary_photo, rentals_id];

        let queryValues = null;

        if (queryTableName === 'rentals') { queryValues = rentalsValues; }
        if (queryTableName === 'photos') { queryValues = photosValues; }
        if (queryTableName === 'ratings') {
            // only need to extract the nested values
            queryValues = [];
            raters.forEach(el => {
                const ratingsValues = [el.raters_id, el.voters_rating, rentals_id];
                // console.log(ratingsValues)
                queryValues.push(ratingsValues);
                // console.log(queryValues)
            })
        }

        resolve(queryValues);

    })
}

const openPoolConnection = () => {
    var database = process.env.DB_NAME || 'related_rentals',
        username = process.env.DB_USERNAME || 'postgres',
        password = process.env.DB_PASSWORD || 'password',
        host = process.env.DB_HOST || 'localhost',
        port = process.env.DB_PORT || 5432;

    return new Pool({
        host: host,
        user: username,
        password: password,
        database: database,
        port: port,
        max: 100,
        poolSize: 100,
        idleTimeoutMillis: 5000,
        connectionTimeoutMillis: 1000
    });

}

const pool = openPoolConnection();

const getPoolConnection = () => {
    return new Promise((resolve, reject) => {

        // console.log('Pool count = ', pool.totalCount)
        // get a pool connection
        pool.connect((err, client, done) => {
            if (err) { reject(err); }
            resolve(client, done);
        })
    })
}


const insertBatch = (batchStatement, client) => {
    return new Promise(async (resolve, reject) => {

        try {
            // execute the query
            await client.query('BEGIN')
            await client.query(batchStatement);
            await client.query('COMMIT');


            runtime = new Date() - startTime;
            runtimeMessage = 'Done inserting ' + parts + ' in ' + runtime / 1000 + 'secs';

            // release the pool connection
            client.release();
            // console.log('Pool count = ', pool.totalCount)
            batchStatements = null;
            resolve(runtimeMessage);

        } catch (err) {
            console.log(err)
            reject(err);
        } finally {

        }

    })
}


const beginBatchTransaction = () => {

    getBatch(parts)
        .then(batch => {
            prepareBatch(batch, activeTableName)
                .then(batchStatements => {

                    getPoolConnection()
                        .then((client) => {

                            // console.log(batchStatements);
                            insertBatch(batchStatements, client)
                                .then(runtimeMessage => {

                                    isInsertComplete(runtimeMessage);
                                }).catch(err => console.log(err))

                        }).catch(err => {
                            console.log(err);
                        })


                }).catch(err => {
                    console.log(err)
                });

        }).catch(err => {
            console.log(err);
        })
}



const isInsertComplete = (runtimeMessage) => {
    parts++;
    // set number of file pieces to expect

    if (parts >= stop) {
        clearInterval(start);
        pool.end();
        console.log('Done inserting ', parts, ' records.');
        return process.exit(0);
    }
    console.log(runtimeMessage)
}


const start = setInterval(beginBatchTransaction, intervalDelay);



// const rentalsValues = [`(${rentals_id}, ${heading}, ${subheading}, ${description}, ${rentals_types}, ${term_types}, ${rates}, ${capacity_max}, ${max_children}, ${amenities}, ${owner}, ${created_date}, ${updated_date})`]
// const photosValues = [`(${photos}, ${primary_photo}, ${rentals_id})`];
// const ratingsValues = [`(${raters_id}, ${voters_rating}, ${rentals_id})`];