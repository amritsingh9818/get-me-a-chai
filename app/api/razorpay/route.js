import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from '@/app/model/Payment';
import User from '@/app/model/User'; 
import connectDB from '@/app/db/connectDB';

export const POST = async (req) => {
    try {
        await connectDB();
        let body = await req.json();
        
        // 1. Find the payment in the DB
        let p = await Payment.findOne({ oid: body.razorpay_order_id });
        
        if (!p) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        // 2. Find the creator so we can grab their secret key
        let user = await User.findOne({ username: p.to_user });
        
        if (!user) {
            return NextResponse.json({ success: false, message: "Creator not found" }, { status: 404 });
        }

        // 3. Verify using the CREATOR'S razorpaysecret from the database
        let isSignatureValid = validatePaymentVerification(
            { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
            body.razorpay_signature,
            user.razorpaysecret 
        );

        if (isSignatureValid) {
            // 👇 CHANGE THIS PART:
            // Use updateOne instead of findOneAndUpdate to clear the warning
            await Payment.updateOne(
                { oid: body.razorpay_order_id }, 
                { done: true }
            );
            // Optional: redirect logic can be handled by frontend based on this true response
            return NextResponse.json({ success: true, message: "Payment verified successfully" });
        } else {
            return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
        }

    } catch (error) {
        console.error("VERIFICATION CRASH:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}