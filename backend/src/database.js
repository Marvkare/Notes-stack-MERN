const mongoose = require('mongoose');

const URI = process.env.MONGOOSE_URI
    ? process.env.MONGOOSE_URI
    : 'mongodb://localhost/merndatabase';

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useFindAndModify: true,
  useCreateIndex: true 
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database is connected');
});
