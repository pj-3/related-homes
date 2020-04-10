const { Client } = require('pg');
const { db } = require('../../models\/postgres/models.js');


function init(callback) {
    var dbName = 'related_rentals',
        username = 'postgres',
        password = 'password',
        host = 'localhost'

    var conStringPri = 'postgres://' + username + ':' + password + '@' + host + '';

    var pg = new Client(conStringPri);
    pg.connect();
    
    pg.query('CREATE SCHEMA IF NOT EXISTS ' + dbName, function(err, res) {
        // console.log(err, res)
        pg.end(); // close the connection
        callback('Created database ' + dbName);
    });

};

module.exports = init((message) => {
    // console.log(message);
    db.sequelize.sync({force: false})
});
