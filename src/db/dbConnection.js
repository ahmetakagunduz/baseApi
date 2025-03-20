const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`CONNECTED TO DATABASE: ${conn.connection.host}`);
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
