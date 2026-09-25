import React from 'react'
import PaymentPage from "@/app/components/paymentPage"
import { fetchuser } from '@/app/action/useraction' // 👉 1. IMPORT THE FETCH FUNCTION


export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: `Support ${resolvedParams.username} - Get Me a Chai`,
    description: `Help ${resolvedParams.username} fund their creative projects by buying them a chai!`,
  }
}
const Username = async ({ params }) => {
  // Wait for the params to resolve (required in Next.js 14/15)
  const resolvedParams = await params; 
  
  // 👉 2. FETCH THE DATA FROM MONGODB
  let currentUser = await fetchuser(resolvedParams.username);

  // 3. If someone types a fake username in the URL, show an error
  if (!currentUser) {
    return <div className="text-white text-center mt-20 text-2xl">Creator not found!</div>
  }
  
  return (
    <>
      {/* 👉 4. PASS THE FULL USER DATA TO YOUR PAYMENT PAGE */}
    
<PaymentPage creatorProfile={currentUser} username={resolvedParams.username} />
    </>
  )
}

export default Username;


