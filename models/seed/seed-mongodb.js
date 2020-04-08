const mongoose = require('mongoose');
const fs = require('fs');
// INSERT into terminal in order to increase memory available
// node --max-old-space-size=4096 yourFile.js

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    socketTimeoutMS: 1000,
    poolSize: 100,
    logger: true,
}


const rentalSchema = new mongoose.Schema({
    rentals_id: { type: Number, unique: true }, // shoudl reference
    primary_photo: { type: String },
    owner: { type: String },
    rentals_types: { type: String },
    raters: { type: String },
    capacity_max: { type: Number },
    max_children: { type: Number },
    rates: { type: String },
    terms_types: { type: String },
    heading: { type: String },
    subheading: { type: String },
    amenities: [String],
    photos: [String],
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
})

const Rental = mongoose.model('Rental', rentalSchema);
mongoose.connect('mongodb://localhost/Related_Rentals', options);



let startTime = new Date();
let runtime = undefined;


const insertDocs = function(fileParts, callback) {
    if (fileParts === 20) {
        return callback(`Done inserting set ${fileParts} in ${runtime/1000} 'secs`);
    }

    try {

        fs.readFile('./seed-data/rentals-'+fileParts+'-data.json', {encoding: 'utf8'}, async (err, fileData) => {
            if (err) { return err; }

            const { error, result } = await Rental.collection.insertMany(JSON.parse(fileData));
            if (error) {console.log(error)}

            fs.close(1, () => {

                fileParts++;
                runtime = new Date() - startTime;
                console.log('Done inserting set ', fileParts, ' in ', runtime/1000, 'secs' );
                return insertDocs(fileParts, callback)
            });
        })


    } catch (err) {
        console.log(err)
        return err;
    }

}


insertDocs(0, (message) => {
    console.log(message);
});

