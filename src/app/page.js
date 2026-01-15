'use client'
// import About from '@/components/pag'A
import About from 'src/components/pages/About'
import Hero from 'src/components/pages/Hero'
// import Preloader from '@/components/ui/Preloader'
import Preloader from 'src/components/Preloader'
import Detail from '../components/pages/Detail'
import Destination from '../components/pages/Destination'
import Faqs from '../components/Faqs'

// import React from 'react'
// import Form from './trip/Form'
// import Footer from 'src/components/ui/Footer'
import Card from '../components/ui/Card'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
// import Footer from '../components/Footer'
// import Tester from '../components/ui/Tester'
const page = () => {
	return (
		<div className="">
			
			<Hero />
			<About />
			<Destination />
			<Faqs />
			<Detail />
			
			{/* <Tester /> */}
		</div>
	)
}
export default page