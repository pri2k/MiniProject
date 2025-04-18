"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import EmailVerification from "@/components/EmailVerification";
import GenderDropdown from "@/components/GenderDropdown";
import SubmitButton from "@/components/SubmitButton"; // 👈
import PopupModal from "@/components/PopupModal";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        image: "" ,
        gender: "",
        age: "",
    });
    const [emailVerified, setEmailVerified] = useState(false);    
    const [showPassword, setShowPassword] = useState(false);
    const [popup, setPopup] = useState(null);

    const onSignUp = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/users/signup", user);
            setPopup({ type: "success", message: "Signup successful!" });
    
            const loginRes = await axios.post("/api/users/login", {
                email: user.email,
                password: user.password,
            });
    
            const loggedInUser = loginRes.data.data;
            if (loggedInUser) {
                localStorage.setItem("user", JSON.stringify(loggedInUser));
            }
    
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (error) {
            console.log("Signup failed", error.message);
            const errMsg = error.response?.data?.error;
            if (errMsg === "User already exists") {
                setPopup({ type: "error", message: "User already registered with this email." });
            } else {
                setPopup({ type: "error", message: errMsg || "Signup failed. Try again." });
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 my-[10em]">
            <div className="max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Sign up</h1>

                <label htmlFor="username" className="block font-semibold mb-1">Username</label>
                <input 
                    id="username"
                    type="text" 
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="username"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                />

                <EmailVerification
                    email={user.email}
                    setEmail={(email) => setUser({ ...user, email })}
                    onVerified={(status) => setEmailVerified(status)}
                />

                <label htmlFor="password" className="block font-semibold mb-1 mt-2">Password</label>
                <div className="relative w-full">
                    <input 
                        id="password"
                        type={showPassword ? "text" : "password"} 
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="password"
                        className="w-full p-2 pr-10 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    />
                    <div 
                        className="absolute top-3 right-3 cursor-pointer text-gray-600"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? "👁️" : "🙈"}
                    </div>
                </div>

                <label htmlFor="age" className="block font-semibold mb-1">Age</label>
                <input 
                    id="age"
                    type="number"
                    value={user.age}
                    onChange={(e) => setUser({...user, age: e.target.value})}
                    placeholder="Age"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                />

                <GenderDropdown volunteer={user} setVolunteer={setUser} />

                <ImageUpload data={user} setData={setUser} />

                <SubmitButton loading={loading} onClick={onSignUp} disabled={!emailVerified}>
                    Sign up
                </SubmitButton>

                <p className="text-center">
                    <Link href="/login" className="text-blue-800">Already have an account? Login</Link>
                </p>

                {popup && (
                    <PopupModal
                        type={popup.type}
                        message={popup.message}
                        onClose={() => setPopup(null)}
                    />
                )}
            </div>
        </div>
    );
}
