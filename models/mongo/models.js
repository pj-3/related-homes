const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    rentals_id: { type: Number, unique: true },
    primary_photo: { type: String },
    owner: { type: String },
    rentals_types: { type: String },
    rating: { type: Schema.Types.Decimal128},
    raters: [
        { raters_id: { type: String }, voter_rating: { type: Schema.Types.Decimal128, index: true } }
    ],
    capacity_max: { type: Number },
    max_children: { type: Number },
    rates: { type: Schema.Types.Decimal128, index: true },
    terms_types: { type: String },
    heading: { type: String },
    subheading: { type: String },
    description: { type: String },
    amenities: [String],
    photos: [String],
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
})


rentalSchema.pre('find', function () {
    this._startTime = Date.now();
});


rentalSchema.post('find', function () {
    if (this._startTime != null) {
        console.log('MongoDB: Runtime in MS: ', Date.now() - this._startTime);
    }
});


module.exports = {
    Rental: mongoose.model('Rental', rentalSchema)
}
