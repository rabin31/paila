'use client'
import { useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import { isAuthenticated, getUser, logout } from "@/src/utils/auth";

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize auth state and listen for changes
  useEffect(() => {
    setLoggedIn(isAuthenticated());
    setUser(getUser());
    
    // Listen for storage changes (logout from other tabs)
    const handler = () => {
      setLoggedIn(isAuthenticated());
      setUser(getUser());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at top
        setIsVisible(true)
      } else {
        // Scrolling down
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLogout = () => {
    logout(); // Call the actual logout function
    setLoggedIn(false);
    setUser(null);
    setMobileMenuOpen(false);
    window.location.href = "/"; // Redirect to home page
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Left - Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <img 
                  src="/logo1.png" 
                  alt="Paila logo" 
                  className="h-6 sm:h-8 lg:h-10 w-auto"
                />
              </Link>
            </div>

            {/* Center - Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Home
              </Link>
              <Link href="/trip" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Generate Trip
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                About Us
              </Link>
            </div>

            {/* Right - Auth Buttons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4">
              {loggedIn ? (
                <div className="flex items-center space-x-4">
                  {/* User avatar with first letter */}
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  {/* <span className="text-gray-700 font-medium">
                    {user?.fullName || 'User'}
                  </span> */}
                  <button 
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/register">
                    <button className="text-gray-700 hover:text-blue-600 hover:cursor-pointer font-medium px-4 py-2 transition-colors duration-200">
                      Register
                    </button>
                  </Link>
                  <Link href="/login">
                    <button className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                      <FaUserCircle className="h-4 w-4" />
                      <span>Login</span>
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white border-t border-gray-200`}>
          <div className="px-4 py-6 space-y-4">
            
            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <Link href="/" onClick={closeMobileMenu}>
                <div className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                  Home
                </div>
              </Link>
              <Link href="/trip" onClick={closeMobileMenu}>
                <div className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                  Generate Trip
                </div>
              </Link>
              <Link href="/about" onClick={closeMobileMenu}>
                <div className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                  About Us
                </div>
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-200">
              {loggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-gray-700">
                      {user?.fullName || 'User'}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/register">
                    <button 
                      onClick={closeMobileMenu}
                      className="w-full text-gray-700 hover:cursor-pointer hover:text-blue-600 border border-gray-300 hover:border-blue-600 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Register
                    </button>
                  </Link>
                  <Link href="/login">
                    <button 
                      onClick={closeMobileMenu}
                      className="w-full bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <FaUserCircle className="h-4 w-4" />
                      <span>Login</span>
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  )
}

export default NavBar