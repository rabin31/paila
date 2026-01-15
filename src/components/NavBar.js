'use client'
import { useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { isAuthenticated, getUser, logout } from "@/src/utils/auth";
import Link from 'next/link';

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
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

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setUser(null);
    window.location.href = "/"; // or router.push("/")
  };

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Set scrolled state based on scroll position
      setIsScrolled(currentScrollY > 50)
      
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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Dynamic classes based on scroll state
  const navBgClass = isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'
  const textColorClass = isScrolled ? 'text-gray-700' : 'text-white'
  const hoverColorClass = isScrolled ? 'hover:text-blue-600' : 'hover:text-gray-200'
  const mobileButtonClass = isScrolled ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100' : 'text-white hover:text-gray-200 hover:bg-white/10'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${navBgClass} ${
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
                  style={{
                    filter: !isScrolled ? 'brightness(0) invert(1)' : 'none'
                  }}
                />
              </Link>
            </div>

            {/* Center - Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className={`${textColorClass} ${hoverColorClass} font-medium transition-colors duration-200`}>
                Home
              </Link>
              <Link href="/trip" className={`${textColorClass} ${hoverColorClass} font-medium transition-colors duration-200`}>
                Generate Trip
              </Link>
              <Link href="/about" className={`${textColorClass} ${hoverColorClass} font-medium transition-colors duration-200`}>
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
                    <button className={`${textColorClass} ${hoverColorClass} font-medium hover:cursor-pointer px-4 py-2 transition-colors duration-200`}>
                      Register
                    </button>
                  </Link>
                  <Link href="/login">
                    <button className={`${isScrolled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/20 hover:cursor-pointer hover:bg-white/30 backdrop-blur-sm border border-white/30'} text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2`}>
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
                className={`p-2 rounded-md ${mobileButtonClass} transition-colors duration-200`}
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
        } overflow-hidden ${isScrolled ? 'bg-white border-t border-gray-200' : 'bg-black/80 backdrop-blur-md border-t border-white/20'}`}>
          <div className="px-4 py-6 space-y-4">
            
            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <Link href="/" onClick={closeMobileMenu}>
                <div className={`block px-4 py-3 ${isScrolled ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' : 'text-white hover:text-gray-200 hover:bg-white/10'} rounded-lg font-medium transition-colors duration-200`}>
                  Home
                </div>
              </Link>
              <Link href="/generate-trip" onClick={closeMobileMenu}>
                <div className={`block px-4 py-3 ${isScrolled ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' : 'text-white hover:text-gray-200 hover:bg-white/10'} rounded-lg font-medium transition-colors duration-200`}>
                  Generate Trip
                </div>
              </Link>
              <Link href="/about" onClick={closeMobileMenu}>
                <div className={`block px-4 py-3 ${isScrolled ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' : 'text-white hover:text-gray-200 hover:bg-white/10'} rounded-lg font-medium transition-colors duration-200`}>
                  About Us
                </div>
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <div className={`pt-4 ${isScrolled ? 'border-t border-gray-200' : 'border-t border-white/20'}`}>
              {loggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className={isScrolled ? 'text-gray-700' : 'text-white'}>
                      {user?.fullName || 'User'}
                    </span>
                  </div>
                  <button 
                    onClick={() => { handleLogout(); closeMobileMenu(); }}
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
                      className={`w-full ${isScrolled ? 'text-gray-700 hover:text-blue-600 border-gray-300 hover:border-blue-600' : 'text-white hover:text-gray-200 border-white/30 hover:border-white/50'} border px-4 py-3 rounded-lg font-medium transition-colors duration-200`}
                    >
                      Register
                    </button>
                  </Link>
                  <Link href="/login">
                    <button 
                      onClick={closeMobileMenu}
                      className={`w-full ${isScrolled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/30 hover:bg-white/40 backdrop-blur-sm border border-white/50'} text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2`}
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
          className="fixed inset-0 bg-black bg-opacity-25 z-43 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  )
}

export default NavBar