var mongoose = require('mongoose');
var mongooseHost = process.env.MONGOOSEHOST || 'localhost';
var port = process.env.PORT || '27017'
var dbName = 'Related_Rentals';
// mongoose.set('debug', true);


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  socketTimeoutMS: 10000,
  poolSize: 100,
  logger: true,
}

mongoose.connect(`mongodb://${mongooseHost}:${port}/${dbName}`, options);

module.exports = mongoose;
