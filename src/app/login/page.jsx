"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", user);
            const userData = response.data.user;
    
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            console.log("userData: ", userData);
            toast.success("Login success");
            router.push("/");
        } catch (error) {
            toast.error(error.response?.data?.error || "Login failed");
        }
    };     

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">Login</h1>
            <hr className="w-1/2 my-4" />

            <label htmlFor="email" className="font-semibold">email</label>
            <input 
                id="email"
                type="email" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <label htmlFor="password" className="font-semibold">password</label>
            <input 
                id="password"
                type="password" 
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <button 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
                onClick={onLogin}
            >
                Login
            </button>
            <Link href="/signup" className="text-blue-600">Go to Signup</Link>
        </div>
    )
}