import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose';
import User from '@/app/model/User';
import Payment from '@/app/model/Payment';
import connectDB from '../../../db/connectDB';
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authoptions= NextAuth({
  providers: [
    GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
   GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
  
  LinkedInProvider({
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
  issuer: "https://www.linkedin.com/oauth",
  jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks", // 👈 Yeh security keys ka link hai
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    };
  },
}),
  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
  TwitterProvider({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    version: "2.0", // Twitter OAuth 2.0 requires this
    allowDangerousEmailAccountLinking: true,
  }),
],
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
  

callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (
        account.provider === "github" ||
        account.provider === "google" ||
        account.provider === "linkedin" ||
        account.provider === "facebook"
      ) {
        try {
          // connect to database
          await mongoose.connect(process.env.MONGODB_URI);
          console.log(`${account.provider} sent this user data:`, user);
          
          const currentUser = await User.findOne({ email: user.email });
          
          if (!currentUser) {
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0]
            });
            await newUser.save();
            console.log("✅ Successfully saved new user to MongoDB!");
          }

          return true; 
        } catch (error) { 
          console.error("❌ Error saving user to MongoDB:", error);
          return false; 
        }
      }
      return false; 
    }, // 👈 YAHAN COMMA AAYEGA AUR EXTRA '}' HATEGA

    async session({ session, user, token }) {
      // Must use findOne (not find) so it returns an object instead of an array
      const dbUser = await User.findOne({ email: session.user.email });
      
      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    }
  } // 👈 CALLBACKS YAHAN CLOSE HOGA
}) // 👈 NEXTAUTH YAHAN CLOSE HOGA

export { authoptions as GET, authoptions as POST };