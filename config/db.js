const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })
      .then(() => console.log('Connected to MongoDB...'))
      .catch((err) => console.error('Could not connect to MongoDB...'));
  } catch (err) {
    console.error('error in db:', err.msg);
    //this will exit with failure (1)
    process.exit(1);
  }
};

module.exports = connectDB;
