const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;


const HouseModel = new mongoose.Schema({
    houseId: { type: 'number', unique: true },
    photoSrc: 'string',
    bedsAndHouse: 'string',
    rating: 'string',
    description: 'string',
    pricePerNight: 'string',
    relatedHouses: ['number'],
    v1: [{ type: ObjectId }]
});


const RentalModel = new mongoose.Schema({
    rentals_id: { type: Number, unique: true }, // shoudl reference
    related_houses: [[ObjectId]],
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    owner: { type: ObjectId },
    rentals_types: { type: String },
    photo: { type: ObjectId },
    capacity: { type: ObjectId },
    description: { type: ObjectId },
    rating: { type: ObjectId },
    fee: { type: ObjectId }
})


const PhotoModel = new mongoose.Schema({
    rentals_id: { type: ObjectId },
    photos: [String],
    max: { type: Number },
    primary_photo_index: { type: Number }
})


const CapacityModel = new mongoose.Schema({
    types: { type: String },
    occupancies: { type: Number },
    min: { type: Number, default: 1 },
    max: { type: Number },
    max_adult: { type: Number },
    max_children: { type: Number }
})


const DescriptionModel = new mongoose.Schema({
    heading: { type: String },
    subheading: { type: String },
    amenities: [String]
})


const RatingModel = new mongoose.Schema({
    raters: [
        { type: ObjectId }
    ],
    rate_types: { type: String },
    avg_ratings: { type: Number },
    total_raters: { type: Number }
})


const FeeModel = new mongoose.Schema({
    rates: { type: Number },
    terms: { type: Number },
    term_types: { type: String }
})



module.exports = {
    House: mongoose.model('House', HouseModel),
    Rental: mongoose.model('Rental', RentalModel),
    Photo: mongoose.model('Photo', PhotoModel),
    Capacitie: mongoose.model('Capacity', CapacityModel),
    Description: mongoose.model('Description', DescriptionModel),
    Rating: mongoose.model('Rating', RatingModel),
    Fee: mongoose.model('Fee', FeeModel)
}
