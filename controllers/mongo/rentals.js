const { Rental } = require('../../models/mongo/models.js');


exports.get = (req, res) => {
    const rating = req.query.rating || 5;
    const maxRate = req.query.maxRate || 10000;
    const minRate = req.query.minRate || 9000;
    const minChildren = req.query.children || 0;


    var query = Rental.find({}, {})
        // .where({ rating: { $gte: rating } })
        .where({ rates: { $gte: minRate } })
        .and({ rates: { $lte: maxRate } })
        .and({ max_children: { $gte: minChildren } })
        .limit(100);

        
    // console.log(query)
    query.exec((error, dbResponse) => {
        // console.log(error, dbResponse)
        return processDatabaseResponse(error, dbResponse, res)
    });
};

const processDatabaseResponse = (error, dbResponse, res) => {
    if (error) { console.log('Controller callback error', error); res.status(404).send() }
    return res.status(200).send(dbResponse)
}


