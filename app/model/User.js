import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true }, // 
  name: { type: String  },  // 
  username: { type: String,required: true },
  profilepic: { type: String },
  coverpic: { type: String },
  razorpayid: { type: String },
  razorpaysecret: { type: String },
  
  
}, 
{ 
  timestamps: true // This automatically adds and manages createdAt and updatedAt!
});

// The Next.js Fix: Check if the model exists before creating a new one
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;