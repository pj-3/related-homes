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


// mongoose.createConnection(`mongodb://${mongooseHost}:${port}/${dbName}`, options)
//   .on('error', (err) => { throw err })
//   .once('open', function () {
//     console.log('Mongoose connected to mongodb on port ', port);
//   });

// const mongooseProfiler = require('mongoose-profiler');
// schema.plugin(mongooseProfiler({
//   isAlwaysShowQuery: true,
//   duration: 1000,          // Show query plans when it took more than this time (ms).
//   totalDocsExamined: 1000, // Show query plans when "totalDocsExamined" more than this value.
//   level: 'COLLSCAN'        // Show query plans when the stage is "COLLSCAN".
// }));

