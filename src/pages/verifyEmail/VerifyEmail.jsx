import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const VerifyEmail = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    useEffect(()=>{
       axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`,{
            headers:{
               Authorization : `Bearer ${token}` 
            }
       }).then((res)=>{
        console.log(res)
       }).catch((err)=>{
        console.error(err)
       }) 
    })

    function handleVerifyEmail(){
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`,{
            code:parseInt(otp)
        },{
            headers : {
                Authorization:`Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res)
            toast.success("Email Verified")
            navigate("/")
        }).catch((err)=>{
            console.error(err)
            toast.error("Invalid OTP")
        })
    }

  return (
    <div className='w-full h-screen flex justify-center item-center'>
       <div className='4-[400px] h-[300px] bg-white '>
        <h1 className='text-2xl font-bold'>Verify Email</h1>
        <p className='text-gray-500'>Please Verify your Email</p>
        <input type = "number" placeholder='OTP' value={otp} onChange={(e)=>GrSettingsOption(e.target.value)} className='border p-2 rounded-lg w-[80%]'/>
        <button onClick={handleVerifyEmail} className='bg-accent text-white p-2 rounded-lg w-[80%]'>Verify</button>
       </div>
    </div>
  )
}

export default VerifyEmail