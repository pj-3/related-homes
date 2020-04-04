const mongoose = require('mongoose');
mongoose.set('debug', false);

let mongoHost = process.env.MONGOHOST || 'localhost'

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  socketTimeoutMS: 1000,
  poolSize: 100
}

mongoose.connect(`mongodb://${mongoHost}`, options);

module.exports = mongoose;