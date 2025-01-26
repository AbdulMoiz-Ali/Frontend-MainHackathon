import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { username, email, cnic } = data;
    console.log(data);

    try {
      const response = await axios.post("https://backend-main-hackathon.vercel.app/auth/register", {
        name: username,
        email: email,
        cnic: cnic
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        localStorage.setItem("accessToken", response.data.ACCESS_TOKEN);
        navigate("/login")
      }
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className={`mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
          </div>

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
                  value: /^[a-zA-Z0-9._-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* CNIC Field */}
          <div className="mb-4">
            <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">CNIC</label>
            <input
              id="cnic"
              type="text"
              placeholder="Enter your CNIC"
              className={`mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cnic ? 'border-red-500' : 'border-gray-300'}`}
              {...register('cnic', {
                required: 'CNIC is required',
                minLength: 13,
                maxLength: 13
              })}
            />
            {errors.cnic && <p className="mt-1 text-sm text-red-500">{errors.cnic.message}</p>}
          </div>
          <p>Already have an account ? <Link to={"/login"}>Login</Link></p>
          {/* Submit Button */}
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
            Register
          </button>
        </form>
      </div >
    </div >
  );
};

export default Register;