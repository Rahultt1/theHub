// const mongoose = require('mongoose');
// require('dotenv').config(); // Loads environment variables
//
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected successfully');
//     } catch (error) {
//         console.error('MongoDB connection failed:', error.message);
//         process.exit(1); // Exit the app if the database connection fails
//     }
// };
//
// module.exports = connectDB;