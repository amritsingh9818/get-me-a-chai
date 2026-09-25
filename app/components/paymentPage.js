"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { initiate, fetchpayments } from '@/app/action/useraction' 
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = ({ username, creatorProfile }) => {
    const [paymentform, setPaymentform] = useState({ name: "", amount: "", message: "" })
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const { data: session } = useSession()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true" && session) {
            toast.success('Payment has been made!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [searchParams, session])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (quickAmount) => {
        let finalAmount = quickAmount || paymentform.amount;

        if (!finalAmount) {
            return toast.error("Please enter an amount!", { theme: "light" });
        }

        let a = await initiate(finalAmount, username, paymentform);
        
        if (a.error) {
            return toast.error(a.error, { theme: "light" });
        }

        let orderID = a.id;

        var options = {
            "key": creatorProfile.razorpayid,
            "amount": Number.parseInt(finalAmount) * 100,
            "currency": "INR",
            "order_id": orderID,
            "name": "GET ME A CHAI",
            "description": `Donation to ${creatorProfile.name}`,
            
            "handler": async function (response) {
                const paymentDetails = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };

                const res = await fetch('/api/razorpay', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(paymentDetails)
                });

                const data = await res.json();
                
                if (data.success) {
                    toast.success("Payment Confirmed and Database Updated!", {
                        position: "top-right",
                        autoClose: 5000,
                        theme: "light",
                    });
                    
                    setPaymentform({ name: "", amount: "", message: "" })
                    getData(); 
                } else {
                    toast.error("Payment Verification Failed!", { theme: "light" });
                }
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            toast.error(response.error.description, { theme: "light" });
        });
        rzp1.open();
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

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full bg-slate-900 relative'>
                {/* 1. Cover Picture with permanent Unsplash fallback */}
                <img
                    className='object-cover w-full h-[200px] md:h-[350px]'
                    src={creatorProfile.coverPic || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop"} 
                    alt="Cover"
                />

                <div className='absolute -bottom-12 md:-bottom-20 left-1/2 -translate-x-1/2 border-2 border-white rounded-full'>
                    {/* 2. Profile Picture fallback */}
                    <img
                        className='rounded-full object-cover w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-white'
                        src={creatorProfile.profilePic || "/user.gif"} 
                        alt="Profile"
                    />
                </div>
            </div>

            <div className="info text-center my-16 md:my-24 gap-2 px-4">
                <div className='font-bold text-xl'>
                    @{username}
                </div>

                <div className='text-slate-400 mt-2'>
                    Lets help {username} get a chai!
                </div>

                <div className='text-slate-400'>
                    {payments.length} Payments . ₹{payments.reduce((a, b) => a + Number(b.amount), 0)} raised
                </div>
                
                <div className="payment flex flex-col md:flex-row gap-6 w-full md:w-[80%] mx-auto mt-11">
                    
                    <div className="suppoters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-6 md:p-10 text-left overflow-y-auto max-h-[500px]">
                        <h2 className='text-2xl font-bold my-5 text-left '>Supporters</h2>

                        {payments.length === 0 ? <div className='text-center'>No one has donated yet</div> : ""}

                        <ul className='mx-2 md:mx-5 text-lg'>
                            {payments.map((p, i) => {
                                return <li key={i} className='my-4 items-center flex gap-2'>
                                    <img width={33} src="user.gif" alt="user" />
                                    <span className="text-sm md:text-base">
                                        {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>

                    <div className="makepayments w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-6 md:p-10">
                        <h2 className='text-2xl font-bold my-5 text-left'>Make A Payment</h2>
                        <div className="flex gap-2 flex-col">
                            <input onChange={handleChange} value={paymentform.name} name="name" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentform.message} name="message" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount} name="amount" type="number" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter amount' />
                            
                            <button onClick={() => pay()} type="button" className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                        </div>
                        
                        <div className="flex gap-2 mt-5">
                            <button onClick={() => pay(10)} className='bg-slate-800 p-3 rounded-lg flex-1 md:flex-none'>Pay ₹10</button>
                            <button onClick={() => pay(20)} className='bg-slate-800 p-3 rounded-lg flex-1 md:flex-none'>Pay ₹20</button>
                            <button onClick={() => pay(30)} className='bg-slate-800 p-3 rounded-lg flex-1 md:flex-none'>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage