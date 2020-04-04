const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;


const RentalModel = new mongoose.Schema({
    rentals_id: { type: Number, unique: true }, // shoudl reference
    related_houses: [ObjectId],
    primary_photo: { type: String },
    owner: { type: String },
    rentals_types: { type: String },
    raters: { type: String },
    avg_ratings: { type: String },
    total_raters: { type: String },
    capacity_max: { type: String },
    max_adult: { type: String },
    rates: { type: String },
    terms_types: { type: String },
    heading: { type: String },
    subheading: { type: String },
    amenities: [String],
    photos: [String],
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
})


// const HouseModel = new mongoose.Schema({
//     houseId: { type: 'number', unique: true },
//     photoSrc: 'string',
//     bedsAndHouse: 'string',
//     rating: 'string',
//     description: 'string',
//     pricePerNight: 'string',
//     relatedHouses: ['number'],
//     v1: [{ type: ObjectId }]
// });


// const PhotoModel = new mongoose.Schema({
//     rentals_id: { type: ObjectId },
//     photos: [String],
//     max: { type: Number },
//     primary_photo_index: { type: Number }
// })


// const CapacityModel = new mongoose.Schema({
//     types: { type: String },
//     max: { type: Number }
// })



// const RatingModel = new mongoose.Schema({
//     raters: [
//         { type: ObjectId }
//     ],
//     rate_types: { type: String },
//     avg_ratings: { type: Number },
//     total_raters: { type: Number }
// })


// const FeeModel = new mongoose.Schema({
//     rates: { type: Number },
//     terms: { type: Number },
//     term_types: { type: String }
// })



module.exports = {
    // House: mongoose.model('House', HouseModel),
    Rental: mongoose.model('Rental', RentalModel),
    // Photo: mongoose.model('Photo', PhotoModel),
    // Capacities: mongoose.model('Capacity', CapacityModel),
    // Description: mongoose.model('Description', DescriptionModel),
    // Rating: mongoose.model('Rating', RatingModel),
    // Fee: mongoose.model('Fee', FeeModel)
}
