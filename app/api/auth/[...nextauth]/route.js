import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose';
import User from '@/app/model/User';
import Payment from '@/app/model/Payment';
import connectDB from '../../../db/connectDB';

export const authoptions= NextAuth({
  providers: [
    GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    allowDangerousEmailAccountLinking: true,
  })
   
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],

callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        try { // <--- YOU MISSED THIS 'try' KEYWORD
          // connect to database
          const client = await mongoose.connect(process.env.MONGODB_URI)
          console.log("GitHub sent this user data:", user);
          
          // ADDED AWAIT HERE! Without 'await', this will always be true and never save users
          const currentUser = await User.findOne({ email: user.email })
          
          if (!currentUser) {
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0]
            })
            await newUser.save()
            console.log("✅ Successfully saved new user to MongoDB!");
          }

          return true;
        } catch (error) { // Now this catch works perfectly because of the try above
          // If Mongoose crashes, this will print the EXACT reason in your VS Code terminal
          console.error("❌ Error saving user to MongoDB:", error);
          return false; // Stop the login if DB fails
        }
      }
      return false; // Always return false if it's not github
    },
    
    async session({ session, user, token }) {
      // Must use findOne (not find) so it returns an object instead of an array
      const dbUser = await User.findOne({ email: session.user.email })
      
      if (dbUser) {
        session.user.name = dbUser.username
      }
      return session
    },
  }

})

export{
    authoptions as GET,authoptions as POST
}