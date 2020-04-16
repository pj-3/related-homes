const { Client } = require('pg');
const { db } = require('../../models/postgres/models.js');

db.sequelize.authenticate();
console.log('Connection has been established successfully.');
db.sequelize.sync({ force: false })





// var dbName = process.env.DB_NAME || 'related_rentals',
//     username = process.env.DB_USERNAME || 'postgres',
//     password = process.env.DB_PASSWORD || 'password',
//     host = process.env.DB_HOST || 'localhost'


// console.log('HOST=', host)
// var conStringPri = 'postgres://' + username + ':' + password + '@' + host;


// async function init(callback) {


//     var pg = new Client(conStringPri);
//     try {

//         await pg.connect();
//         // await pg.query('SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '+ dbName +' AND pid <> pg_backend_pid()');
//         await pg.query('DROP DATABASE IF EXISTS ' + dbName );
//         await pg.query('CREATE DATABASE ' + dbName + ' WITH OWNER = ' + username + ' encoding = "utf-8" connection limit = -1')
//         await pg.query('GRANT ALL ON DATABASE ' + dbName + ' TO ' + username + ' WITH GRANT OPTION')
//         await pg.end(); // close the connection
//         callback('Created database ' + dbName);

//     } catch (err) {
//         console.log(err);
//     }

// };
// module.exports = init(async (message) => {
//     console.log(message);

//     try {
//         await db.sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//         db.sequelize.sync({ force: false })
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }

// });
