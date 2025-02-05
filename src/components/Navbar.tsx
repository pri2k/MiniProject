"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log("res.data",res.data.data.username);
        setUser(res.data.data.username);
    };

    getUserDetails();
  }, []);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">MyWebsite</h1>
        <div className="space-x-4 flex items-center">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>

            {user ? (
                <div className="flex items-center space-x-3">
                <Link
                    href="/profile"
                    className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold"
                >
                    {user.charAt(0).toUpperCase()}
                </Link>
                </div>
            ) : (
                <Link href="/login" className="hover:text-gray-300">Login</Link>
            )}
        </div>
      </div>
    </nav>
  );
}
