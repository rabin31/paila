'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // Store token and user in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Redirect to home page
      router.push('/');
    } else {
      console.error('Login failed:', data);
    }
  };

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center">
      <div className="h-screen w-[50%] flex flex-col items-center justify-center space-y-6">
        <Link href="/">
        <button
          className="absolute top-4 left-4 hover:cursor-pointer flex items-center text-gray-700 hover:text-gray-900 font-medium"
        >
          &#8592; Back
        </button>
        </Link>
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <Input 
                id="username"
                name="username"
                type="text"
                className="w-full" 
                placeholder="Enter your username or email"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input 
                id="password"
                name="password"
                type="password"
                className="w-full" 
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#243E8C] hover:bg-[#243e8cce] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Login
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register">
                <button className="text-blue-600 hover:text-blue-700 font-medium underline">
                  Register
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-screen w-[50%] bg-blue-500 relative overflow-hidden">
        <video 
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          src="/bg-video.mp4"
        ></video>
        
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
    </div>
  )
}

export default LoginPage;