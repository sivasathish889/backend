const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4, // Use IPv4, skip IPv6
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error.name === 'MongoServerSelectionError') {
      console.error('Make sure your IP address is whitelisted in MongoDB Atlas or your local MongoDB is running.');
    }
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused. Check if MongoDB is running on the specified port.');
    }
    if (error.message.includes('querySrv')) {
      console.error('DNS Error: Could not connect to the MongoDB Atlas cluster. Please check your internet connection and DNS settings.');
      console.error('Also ensure you are using the correct connection string.');
    }

    // Instead of exiting, we might want to retry or just log, but usually it's fatal for the backend
    process.exit(1);
  }
};

module.exports = connectDB;
