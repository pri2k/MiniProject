"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import EmailVerification from "@/components/EmailVerification";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        image: ""
    });


    const [emailVerified, setEmailVerified] = useState(false);    

    const onSignUp = async () => {
        try {
          const response = await axios.post("/api/users/signup", user);
      
          toast.success("Signup successful!");
      
          // Automatically log in user by calling login API
          const loginRes = await axios.post("/api/users/login", {
            email: user.email,
            password: user.password,
          });
      
          const loggedInUser = loginRes.data.data;
      
          if (loggedInUser) {
            localStorage.setItem("user", JSON.stringify(loggedInUser));
          }
      
          // Full reload to trigger useContext + rehydration
          window.location.href = "/";
        } catch (error) {
          console.log("Signup failed", error.message);
          toast.error(error.response?.data?.error || "Signup failed");
        }
      };
      

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 w-80%">
            <h1 className="text-3xl font-bold mb-4">Sign up</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
                id="username"
                type="text" 
                value={user.username || ""}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <div>
              <EmailVerification
                  email={user.email}
                  setEmail={(email) => setUser({ ...user, email })}
                  onVerified={(status) => setEmailVerified(status)}
              />
            </div>


            <label htmlFor="password">password</label>
            <input 
                id="password"
                type="password" 
                value={user.password || ""}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <ImageUpload data={user} setData={setUser} />

            <button 
              className={`p-2 border rounded-lg mb-4 ${emailVerified ? "" : "opacity-50 cursor-not-allowed"}`}
              onClick={onSignUp}
              disabled={!emailVerified}
            >
              Sign up
            </button>
            <Link href="/login" className="text-blue-800">Already have an account? Login</Link>
        </div>
    )
}