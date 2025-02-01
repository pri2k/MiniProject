"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });

    const onSignUp = async () => {
        try {
            const response = await axios.post("/api/users/signup", user);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed",error.message);
            toast.error(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Sign up</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
                id="username"
                type="text" 
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <label htmlFor="email">email</label>
            <input 
                id="email"
                type="email" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <label htmlFor="password">password</label>
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
                onClick={onSignUp}
            >
                Sign up
            </button>
            <Link href="/login">Visit login Page</Link>
        </div>
    )
}