// require the model
const db = require('../../models/postgres/models.js').db;
const { Rentals, Ratings } = require('../../models/postgres/models.js');
const { Op } = db.Sequelize;


exports.rentals_list = async (req, res) => {
    const rating = req.query.rating || 3;
    const maxRate = req.query.maxRate || 10000;
    const minRate = req.query.minRate || 9000;
    const minChildren = req.query.children || 0;


    const rentals = await Rentals.findAll(
        {
            where: {
                rates: { [Op.gte]: minRate, [Op.lte]: maxRate},
                max_children: { [Op.gte]: minChildren}
            },
            include: {
                model: Ratings
            },
            limit: 100
        });

    return res.send(rentals);
}

exports.rentals_detail = (req, res) => {
    return res.send('NOT IMPLEMENTED: rentals detail GET');
}

exports.rentals_create_post = (req, res) => {
    return res.send('NOT IMPLEMENTED: rentals create POST');
}

exports.rentals_create_delete = (req, res) => {
    return res.send('NOT IMPLEMENTED: rentals delete Delete');
}