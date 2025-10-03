const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb:mongodb+srv://taskmate:HUNTS0071234@cluster0.7djwocg.mongodb.net/taskmate?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
module.exports = connectDB;
