'use client'
import React from 'react'
import NavBar from '../NavBar'
import Link from 'next/link'

const Hero = () => {
  return (
    <>
      <div className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          src="/video2.mp4"
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-20"></div>

        {/* Content overlay - positioned below navbar */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-center text-white px-4 mt-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">( Welcome to Paila )</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">Experience something amazing</p>
            <Link href="/trip">
            <button className="bg-white text-black px-8 hover:cursor-pointer py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Build My Dream Trip ✨
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero