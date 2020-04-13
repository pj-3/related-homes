// require the model
const db = require('../../models/postgres/models.js').db;
const { Rentals, Ratings, Photos } = require('../../models/postgres/models.js');
const { Op } = db.Sequelize;
const imageHelper = require('../../database/mongo/schemaHelpers.js');


// Primary Search
exports.p_rentals_by = async (req, res) => {
    const rating = req.query.rating || 4.4;
    const maxRate = req.query.maxRate || 1000;
    const minRate = req.query.minRate || 900;
    const minChildren = req.query.children || 0;
    const displayQty = req.query.displayQty || 12;
    const { isOldVersion } = res.header;
    // console.log('isOldVersion=', isOldVersion);
    // const rating = Math.floor(Math.random() * 5.5);
    // const maxRate =  Math.floor(Math.random() * 1000);
    // const minRate =  Math.floor(Math.random() * maxRate);
    // const minChildren =  Math.floor(Math.random() * 4);
    // const displayQty =  -(-12 - Math.floor(Math.random() * 30));
    let dbResponse = null;

    try {

        dbResponse = await Rentals.findAll(
            {
                where: {
                    rates: { [Op.gte]: minRate, [Op.lte]: maxRate },
                    max_children: { [Op.gte]: minChildren },
                },
                include: [
                    { model: Ratings },
                    { model: Photos, where: { is_primary_photo: true } }
                ],
                limit: displayQty
            });


        // if (isOldVersion === 'true') {
        buildViewForOldVersion(dbResponse, (viewData) => {
            dbResponse = viewData;
            // console.log('dbResponse', dbResponse)
            return processDatabaseResponse(null, dbResponse, res)
        })
        // } else {
        //     return processDatabaseResponse(null, dbResponse, res)
        // }
    } catch (err) {
        console.log(err);
        return processDatabaseResponse(null, dbResponse, res)
    }

}


const buildViewForOldVersion = function (dbResponse, callback) {
    let viewData = [];
    // console.log('dbResponse', dbResponse);
    for (let key in dbResponse) {
        let rentals = dbResponse[key].dataValues;
        let photo = rentals.photos[0].dataValues;

        // calculate the rating
        let rating = rentals.ratings.reduce((p, e) => {
            e = e.dataValues;
            p.rate = p.rate + parseFloat(e.voters_rating);
            p.votes = p.votes + 1;
            return p;
        }, { rate: 0, votes: 0 });

        // console.log('calculated_rating_object', rating)
        // console.log('rentals.rental_id', rentals)
        let relatedHouses = {
            houseId: rentals.id,
            rental_id: rentals.id,
            photoSrc: photo.photos,
            photoSrc: imageHelper.imageLoader(),
            bedsAndHouse: rentals.rentals_types,
            rating: parseFloat(rating.rate / rating.votes).toPrecision(3),
            description: rentals.heading + ' ' + rentals.subheading,
            pricePerNight: '$ ' + rentals.rates,
        }
        relatedHouses = Object.assign(relatedHouses, rentals)
        viewData.push(relatedHouses);
    }
    return callback(viewData);

}


const processDatabaseResponse = (error, dbResponse, res) => {
    if (error) { console.log('Controller callback error', error); res.status(404).send() }
    return res.status(200).send(dbResponse)
}






exports.p_rentals_detail = async (req, res) => {
    const rentals_id = req.query.houseId || req.query.rentals_id;

    const rentals = await Rentals.findAll({ rentals_id: rentals_id });
    return res.send(rentals);
}

exports.p_rentals_create_post = (req, res) => {
    return res.send('NOT IMPLEMENTED: rentals create POST');
}

exports.p_rentals_create_delete = (req, res) => {
    return res.send('NOT IMPLEMENTED: rentals delete Delete');
}

