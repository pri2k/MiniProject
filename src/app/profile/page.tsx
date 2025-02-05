"use client";

import { getUserDetails } from "@/helpers/getUserDetails";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage({params} : any) {
    console.log("params in profile page", params);
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success('Logout successful');
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <button
                onClick={ logout }
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
            <button
                // onClick={getUserDetails()}
            ></button>
        </div>
    )
}