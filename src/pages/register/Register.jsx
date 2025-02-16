import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    
    const navigate = useNavigate();
    
    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(firstName, lastName, email, password, address, phone);

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        axios.post(`${backendUrl}/api/users/register`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            address: address,
            phone: phone
        })
        .then((response) => { // ✅ Use 'response' instead of undefined 'res'
            console.log(response.data); // ✅ Log response data correctly
            toast.success("Registration successful!");
            navigate("/login");
        })
        .catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.error || "Registration failed");
        });
    }

    return (
        <div className='bg-picture w-full h-screen flex justify-center items-center'>
            <form onSubmit={handleOnSubmit}>
                <div className='w-[400px] h-[600px] backdrop-blur-xl rounded-lg flex justify-center items-center flex-col relative'>
                    <img src='/logo.png' alt='logo' className='w-[100px] h-[100px] object-cover' />

                    <input type='text' placeholder='First Name' className='mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type='text' placeholder='Last Name' className='mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type='email' placeholder='Email' className='mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder='Password' className='mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type='text' placeholder='Address' className='mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none' value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type='text' placeholder='Phone Number' className='mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none' value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <button className='my-6 w-[300px] h-[50px] bg-[#efac38] text-xl text-white rounded-lg'>Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
