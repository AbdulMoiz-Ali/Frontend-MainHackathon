import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // React Icons for password visibility toggle
import { useDispatch } from 'react-redux';
import { setUser } from "./../../configration/reduxconfig/slice/user.slice.js";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const { email, password } = data;
        console.log(data);

        try {
            const response = await axios.post("https://backend-main-hackathon.vercel.app/auth/login", {
                email: email,
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status == 200) {
                localStorage.setItem("accessToken", response.data.ACCESS_TOKEN)
                dispatch(setUser(response.data?.data))
                // navigate("/login")
            }
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={`mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-2">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className={`p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('password', { required: 'Password is required' })}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;