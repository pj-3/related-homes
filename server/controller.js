const models = require('./models.js');


let get = (houseId, callback) => {

 return models.query(houseId, callback)
};

const GET = (req, res, next) => {
    return res.send(req.params.id);
}

const PUT = (req, res, next) => {
    return res.send('PUT');
}


module.exports = { get, GET, PUT };
