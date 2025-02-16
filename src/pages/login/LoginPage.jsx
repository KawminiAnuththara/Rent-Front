import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(email, password);

        // Email and password validation
        if (!email || !password) {
            toast.error("Email and Password are required.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email.");
            return;
        }

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        axios.post(`${backendUrl}/api/users/login`, {
            email: email,
            password: password
        })
        .then((res) => {
            console.log(res);
            toast.success("Login successful");

            const user = res.data.user;
            localStorage.setItem("token", res.data.token);

            if (user.role === "admin") {
                navigate("/admin/");
            } else {
                navigate("/");
            }
        })
        .catch((err) => {
            console.log(err);
            const errorMessage = err.response?.data?.error || "An error occurred";
            toast.error(errorMessage);
        });
    }

    return (
        <div className="bg-picture w-full h-screen flex justify-center items-center">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[400px] h-[400px] backdrop-blur-xl rounded-lg flex justify-center items-center flex-col relative">
                    <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] object-cover" />
                    <input
                        type="email"
                        placeholder="Email"
                        className="mt-6 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="mt-6 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="my-8 w-[300px] h-[50px] bg-[#efac38] text-xl text-white rounded-lg">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
