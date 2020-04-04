const models = require('../../models/mongo/house.js');


// OLD ROUTE
exports.get = (req, res) => {
    const houseId = req.params.houseId;
    models.query(houseId, (error, dbResponse) => {
        return processDatabaseResponse(error, dbResponse, res)
    });
};

const processDatabaseResponse = (error, dbResponse, res) => {
    if (error) { console.log('Controller callback error', error); res.status(404).send() }
    return res.status(200).send(dbResponse)
}




// app.get('/houses/:houseId(\\d+)', (req, res) => {
//     controller.get(req.params.houseId, (error, dbResponse) => {
//         processDatabaseResponse(error, dbResponse, res)
//     });
// })