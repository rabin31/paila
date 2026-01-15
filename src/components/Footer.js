import React from 'react'
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Link from "next/link";

function Footer() {
	return (
		<footer className=' relative text-white overflow-hidden'>
			{/* Background Image with Overlay */}
			<div 
				className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100'
				style={{
					backgroundImage: "url('/mountain.png')",
				}}
			></div>
			{/* Optional overlay for better text readability */}
			{/* <div className='absolute inset-0 bg-black/40'></div> */}
			
			{/* Main Footer Content */}
			<div className='relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24'>
				<div className='max-w-7xl mx-auto'>
					{/* Main Footer Grid */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-62'>
						
						{/* Company Info */}
						<div className='sm:col-span-2 lg:col-span-1 space-y-6'>
							<div className='flex justify-center sm:justify-start'>
								<img 
									src="/logo.png" 
									alt="Paila logo" 
									className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain filter brightness-110" 
								/>
							</div>
							
							<p className='text-sm sm:text-base text-gray-300 leading-relaxed text-center sm:text-left max-w-xs sm:max-w-sm mx-auto sm:mx-0'>
								Scaling new heights in travel experiences. We craft unforgettable journeys to the world&apos;s most breathtaking destinations, with Mount Everest as our inspiration.
							</p>
							
							{/* Social Media Links */}
							<div className='flex justify-center sm:justify-start space-x-4'>
								<Link 
									href="https://www.facebook.com" 
									className='text-blue-400 hover:text-blue-300 transform hover:scale-110 transition-all duration-300 text-xl sm:text-2xl'
									aria-label="Facebook"
								>
									<FaFacebook />
								</Link>
								<Link 
									href="https://www.instagram.com" 
									className='text-pink-400 hover:text-pink-300 transform hover:scale-110 transition-all duration-300 text-xl sm:text-2xl'
									aria-label="Instagram"
								>
									<FaInstagram />
								</Link>
								<Link 
									href="https://wa.me/9779812345678" 
									className='text-green-400 hover:text-green-300 transform hover:scale-110 transition-all duration-300 text-xl sm:text-2xl'
									aria-label="WhatsApp"
								>
									<FaWhatsapp />
								</Link>
								<Link 
									href="https://twitter.com" 
									className='text-blue-400 hover:text-blue-300 transform hover:scale-110 transition-all duration-300 text-xl sm:text-2xl'
									aria-label="Twitter"
								>
									<FaTwitter />
								</Link>
							</div>
						</div>

						{/* Destinations */}
						<div className='text-center sm:text-left'>
							<h3 className='text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-white relative inline-block'>
								Destinations
								<div className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-transparent'></div>
							</h3>
							<ul className='space-y-2 sm:space-y-3'>
								<li>
									<Link 
										href="/everest" 
										className='text-gray-300 hover:text-white transition-all duration-300 text-sm sm:text-base hover:underline hover:translate-x-1 inline-block'
									>
										Mount Everest
									</Link>
								</li>
								<li>
									<Link 
										href="/annapurna" 
										className='text-gray-300 hover:text-white transition-all duration-300 text-sm sm:text-base hover:underline hover:translate-x-1 inline-block'
									>
										Annapurna Circuit
									</Link>
								</li>
								<li>
									<Link 
										href="/langtang" 
										className='text-gray-300 hover:text-white transition-all duration-300 text-sm sm:text-base hover:underline hover:translate-x-1 inline-block'
									>
										Langtang Valley
									</Link>
								</li>
								<li>
									<Link 
										href="/manaslu" 
										className='text-gray-300 hover:text-white transition-all duration-300 text-sm sm:text-base hover:underline hover:translate-x-1 inline-block'
									>
										Manaslu Trek
									</Link>
								</li>
							</ul>
						</div>

						{/* Services */}
						<div className='text-center sm:text-left'>
							<h3 className='text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-white relative inline-block'>
								Services
								<div className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-transparent'></div>
							</h3>
							<ul className='space-y-2 sm:space-y-3'>
								<li>
									<Link 
										href="/trekking" 
										className='text-gray-300 hover:text-white transition-all duration-300 text-sm sm:text-base hover:underline hover:translate-x-1 inline-block'
									>
										Trekking Tours
									</Link>
								</li>
								<li>
									<Link 
										href="/expedition" 
										className='text-gray-300 hover:text-white transition-all duration-300 text-sm sm:text-base hover:underline hover:translate-x-1 inline-block'
									>
										Peak Expeditions
									</Link>
								</li>
								<li>
									<Link 
										href="/cultural" 
										className='text-gray-300 hover:text-white transition-all duration-300 text-sm sm:text-base hover:underline hover:translate-x-1 inline-block'
									>
										Cultural Tours
									</Link>
								</li>
								<li>
									<Link 
										href="/equipment" 
										className='text-gray-300 hover:text-white transition-all duration-300 text-sm sm:text-base hover:underline hover:translate-x-1 inline-block'
									>
										Equipment Rental
									</Link>
								</li>
							</ul>
						</div>

						{/* Contact Info */}
						<div className='text-center sm:text-left'>
							<h3 className='text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-white relative inline-block'>
								Contact Us
								<div className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-transparent'></div>
							</h3>
							<ul className='space-y-3 sm:space-y-4'>
								<li className='flex items-center justify-center sm:justify-start space-x-3'>
									<FaPhone className='text-green-400 text-base sm:text-lg flex-shrink-0' />
									<Link 
										href="tel:+9779876543210" 
										className='text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base hover:underline'
									>
										+977 9876543210
									</Link>
								</li>
								<li className='flex items-center justify-center sm:justify-start space-x-3'>
									<FaEnvelope className='text-blue-400 text-base sm:text-lg flex-shrink-0' />
									<Link 
										href="mailto:info@paila.com" 
										className='text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base hover:underline'
									>
										info@paila.com
									</Link>
								</li>
								<li className='flex items-start justify-center sm:justify-start space-x-3'>
									<FaMapMarkerAlt className='text-red-400 text-base sm:text-lg flex-shrink-0 mt-1' />
									<div className='text-gray-300 text-sm sm:text-base leading-relaxed text-center sm:text-left'>
										<div>Thamel, Kathmandu</div>
										<div>Nepal</div>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div className="border-white border-t-1 mt-6">

						</div>
				</div>
			</div> 
		</footer>
	)
}

export default Footer