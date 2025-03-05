require('dotenv').config();
const mongoose = require('mongoose');

// Validate environment variable
if (!process.env.DB_URL) {
  console.error('ERROR: DB_URL environment variable not defined!');
  process.exit(1);
}

// Connection configuration
const connectionOptions = {
  serverSelectionTimeoutMS: 5000,
  family: 4
};

// Database connection handler
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, connectionOptions);
    console.log('Successfully connected to the database');

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('Mongoose default connection open');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose default connection disconnected');
    });

  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;