"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/app/action/useraction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [oldusername, setOldusername] = useState("")
  const [form, setForm] = useState({}) 

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login')
    }
    if (status === "authenticated" && session?.user?.name) {
      setOldusername(session.user.name) 
      getData() 
    }
  }, [status, router, session])

  const getData = async () => {
      let u = await fetchuser(session?.user?.name)
      if (u) {
          setForm(u)
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    // Gather all data directly from the form tags
    const formData = new FormData(e.target); 
    
    // Send to backend
    let result = await updateProfile(formData, oldusername);

    if (result && result.error) {
        toast.error(result.error, { theme: "light" });
    } else {
        toast.success("Profile updated successfully!", {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
        });
        setOldusername(formData.get("username")); 
    }
  }

  // Show a loading state while checking the session to prevent flashing the form
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">Loading...</div>
  }

  return (
    <>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" 
      />
      
      <div 
        className="min-h-screen text-white pt-10 pb-20 bg-slate-950" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-center text-3xl font-bold mb-8">
            Welcome to your Dashboard
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                defaultValue={form.name || ""}
                className="w-full bg-slate-800 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500" 
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                defaultValue={form.email || ""}
                className="w-full bg-slate-800 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500" 
              />
            </div>

            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-sm font-semibold">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username"
                defaultValue={form.username || ""}
                className="w-full bg-slate-800 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500" 
              />
            </div>

            {/* Profile Picture Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="profilePic" className="text-sm font-semibold">Profile Picture</label>
              <input 
                type="text" 
                id="profilePic" 
                name="profilePic"
                defaultValue={form.profilePic || ""}
                className="w-full bg-slate-800 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500" 
              />
            </div>

            {/* Cover Picture Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="coverPic" className="text-sm font-semibold">Cover Picture</label>
              <input 
                type="text" 
                id="coverPic" 
                name="coverPic"
                defaultValue={form.coverPic|| ""}
                className="w-full bg-slate-800 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500" 
              />
            </div>

            {/* Razorpay ID */}
            <div className="flex flex-col gap-2">
              <label htmlFor="razorpayid" className="text-sm font-semibold">Razorpay ID</label>
              <input 
                type="text" 
                id="razorpayid" 
                name="razorpayid"
                defaultValue={form.razorpayid|| ""}
                className="w-full bg-slate-800 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500" 
              />
            </div>

            {/* Razorpay Secret */}
            <div className="flex flex-col gap-2">
              <label htmlFor="razorpaysecret" className="text-sm font-semibold">Razorpay Secret</label>
              <input 
                type="text" 
                id="razorpaysecret" 
                name="razorpaysecret"
                defaultValue={form.razorpaysecret || ""}
                className="w-full bg-slate-800 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500" 
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition-colors"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Dashboard