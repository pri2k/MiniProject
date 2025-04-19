'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from '../../components/SubmitButton';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/users/login', user);
            const userData = response.data.user;

            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            toast.success('Login success');

            window.location.href = '/';
        } catch (error) {
            toast.error(error.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
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
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full max-w-sm"
            />

            <label htmlFor="password" className="font-semibold">password</label>
            <div className="relative w-full max-w-sm mb-4">
                <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                    className="p-2 border border-gray-300 rounded-lg w-full pr-10 focus:outline-none focus:border-gray-600 text-black"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    {showPassword ? '👁️' : '🙈'}
                </button>
            </div>

            <div className='widthLogin'>
                <SubmitButton onClick={onLogin} loading={loading}>
                    Login
                </SubmitButton>
            </div>



            <Link href="/signup" className="text-blue-600 mt-2">Go to Signup</Link>
        </div>
    );
}
