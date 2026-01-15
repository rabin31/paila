'use client'
import { motion } from 'framer-motion'
import React from 'react'

const Marquee = () => {
	return (
		<div data-scroll data-scroll-section data-scroll-speed=".1" className='w-full mb-6 mt-16 bg-black'>
			<div className='text border-t-2 border-b-2 border-zinc-300 flex overflow-hidden whitespace-nowrap items-center py-4'>
				<motion.h1 initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ repeat: Infinity, ease: "linear", duration: 10 }} className='text-xl md:text-2xl leading-none uppercase font-semibold pr-20 text-white'>Take the first step with Paila — Your travel companion in Nepal</motion.h1>
				<motion.h1 initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ repeat: Infinity, ease: "linear", duration: 10 }} className='text-xl md:text-2xl leading-none uppercase font-semibold pr-20 text-white'>Take the first step with Paila — Your travel companion in Nepal</motion.h1>
			</div>
		</div>
	)
}

export default Marquee