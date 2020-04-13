const { Rental } = require('../../models/mongo/models.js');



exports.m_rentals_detail = (req, res) => {
    const rentals_id = req.params.houseId || req.query.rentals_id;

    var query = Rental.find({ rentals_id: rentals_id });
    console.log('houses route ..', rentals_id)

    query.exec((error, dbResponse) => {
        return processDatabaseResponse(error, dbResponse, res)
    });
}



exports.m_rentals_by = (req, res) => {
    const rating = req.query.rating || 4.4;
    const maxRate = req.query.maxRate || 1000;
    const minRate = req.query.minRate || 900;
    const minChildren = req.query.children || 0;
    const displayQty = req.query.displayQty || 12;
    const { isOldVersion } = res.header;
    console.log('isOldVersion=', isOldVersion);

    var query = Rental.find()
        .where({ rating: { $gte: rating } })
        .and({ rates: { $gte: minRate } })
        .and({ rates: { $lte: maxRate } })
        .and({ max_children: { $gte: minChildren } })
        .limit(displayQty);


    // console.log(query)    
    query.exec((error, dbResponse) => {
        //  handle view for old version
        if (isOldVersion === 'true') {
            buildViewForOldVersion(dbResponse, (viewData) => {
                dbResponse = viewData;
                return processDatabaseResponse(error, dbResponse, res)
            })
        } else {
            return processDatabaseResponse(error, dbResponse, res)
        }
    });
};



const buildViewForOldVersion = function (dbResponse, callback) {
    let viewData = [];
    // console.log('dbResponse', dbResponse);
    for (let key in dbResponse) {
        let currentData = dbResponse[key];
        let rating = String(currentData.rating);
        const relatedHouses = {
            houseId: currentData.rentals_id,
            photoSrc: currentData.primary_photo,
            bedsAndHouse: currentData.rentals_types,
            rating: parseFloat(rating).toFixed(2),
            description: currentData.heading + ' ' + currentData.subheading,
            pricePerNight: '$ ' + currentData.rates
        }
        viewData.push({ ...relatedHouses });
    }
    return callback(viewData);

}


const processDatabaseResponse = (error, dbResponse, res) => {
    if (error) { console.log('Controller callback error', error); res.status(404).send() }
    return res.status(200).send(dbResponse)
}
