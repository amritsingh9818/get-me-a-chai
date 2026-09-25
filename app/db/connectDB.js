const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 1. Removed the { useNewUrlParser: true } object completely
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    // 2. Added the missing '$' before the curly braces to make the variable work
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default connectDB;