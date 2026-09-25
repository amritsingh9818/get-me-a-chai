"use server" // Required if this is a Next.js Server Action
import Razorpay from "razorpay";
import Payment from '@/app/model/Payment';
import User from "@/app/model/User";
import connectDB from "@/app/db/connectDB";

export const initiate = async (amount, to_username, paymentform) => {
    console.log("SERVER ACTION RECEIVED:", { amount, to_username, paymentform });
 
    await connectDB();
    
    // 1. Find the creator receiving the money
    let user = await User.findOne({ username: to_username });
    
    // 2. Check if they have connected their Razorpay
    if (!user || !user.razorpayid || !user.razorpaysecret) {
        return { error: "This creator has not set up their payment details yet." };
    }

    // 3. Use the CREATOR'S keys to generate the order
    var instance = new Razorpay({ 
        key_id: user.razorpayid, 
        key_secret: user.razorpaysecret 
    });

    // 4. Create the Razorpay order options (amount must be in Paise, so multiply by 100)
    var options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR",
    }
    
    let x = await instance.orders.create(options);
    
    // 5. Save pending payment to database
    await Payment.create({
        oid: x.id,
        amount: amount, // Save standard rupee amount in DB
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message
    });

    return x;
}

export const fetchuser = async (username) => {
    await connectDB();
    let u = await User.findOne({username: username})
    
    // Check if user exists before flattening
    if (!u) return null;

   return JSON.parse(JSON.stringify(u));
}

export const fetchpayments = async (username) => {
    await connectDB();
    let p = await Payment.find({to_user: username, done: true}).sort({createdAt: -1}).lean()
    return JSON.parse(JSON.stringify(p));
}

export const updateProfile = async (data, oldusername) => {
    await connectDB()
    
    let ndata = Object.fromEntries(data) 
    
    if(oldusername !== ndata.username){
        let u = await User.findOne({ username: ndata.username }) 
        
        if(u){
            return { error: "Username already exists" }
        }
       
        await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
    }
    
 await User.updateOne({ email: ndata.email }, ndata, { upsert: true });
  
    
   
}