import React, { useState, useEffect, useRef } from 'react';
import { FaPlayCircle, FaPauseCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Destination = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const gsapRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  
  // Animation refs
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const playButtonRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    
    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    
    script.onload = () => {
      scrollTriggerScript.onload = () => {
        gsapRef.current = window.gsap;
        scrollTriggerRef.current = window.ScrollTrigger;
        gsapRef.current.registerPlugin(scrollTriggerRef.current);
        
        // Initialize scroll trigger animations
        initScrollAnimations();
      };
      document.head.appendChild(scrollTriggerScript);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
      if (scrollTriggerScript.parentNode) {
        document.head.removeChild(scrollTriggerScript);
      }
      // Clean up ScrollTrigger instances
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  const initScrollAnimations = () => {
    if (!gsapRef.current || !scrollTriggerRef.current) return;

    const gsap = gsapRef.current;
    const ScrollTrigger = scrollTriggerRef.current;

    // Set initial states
    gsap.set([titleRef.current, playButtonRef.current, carouselRef.current], {
      opacity: 0,
      y: 60
    });

    // Create main timeline
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        once: false
      }
    });

    // Animate title
    mainTimeline.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    // Animate play button
    .to(playButtonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    // Animate carousel container
    .to(carouselRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.2");

    // Animate carousel elements individually
    const carouselElements = carouselRef.current?.querySelectorAll('.carousel-element');
    if (carouselElements && carouselElements.length > 0) {
      gsap.set(carouselElements, {
        opacity: 0,
        scale: 0.9
      });

      gsap.to(carouselElements, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }
  };

  const destinations = [
    {
      id: 1,
      name: "Kathmandu",
      image: "https://www.nepalhikingteam.com/_next/image?url=https%3A%2F%2Fnht-api.nepalhikingteam.com%2Fmedia%2Fblog%2Fbanner%2Fkathmandu-valley.jpg&w=1920&q=75",
      description: "Historic temples and vibrant culture"
    },
    {
      id: 2,
      name: "Nuwakot", 
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/cb/fb/91/nuwakot-s-the-famous.jpg?w=1400&h=1400&s=1",
      description: "Ancient fortress and mountain views"
    },
    {
      id: 3,
      name: "Lumbini",
      image: "https://lumbinidevtrust.gov.np/upload_file/images/slider/1721894939_276597348_lumbini.jpg", 
      description: "Birthplace of Lord Buddha"
    },
    {
      id: 4,
      name: "Pokhara",
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1920&q=75",
      description: "Lakeside paradise with mountain backdrop"
    }
  ];

  const animateToIndex = (index, immediate = false) => {
    if (!gsapRef.current || !containerRef.current) return;
    
    const translateX = -index * (100 / destinations.length);
    
    if (immediate) {
      gsapRef.current.set(containerRef.current, {
        x: `${translateX}%`
      });
    } else {
      gsapRef.current.to(containerRef.current, {
        x: `${translateX}%`,
        duration: 0.6,
        ease: "power2.inOut"
      });
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % destinations.length;
          return nextIndex;
        });
      }, 3500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, destinations.length]);

  useEffect(() => {
    animateToIndex(currentIndex);
  }, [currentIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % destinations.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(false);
  };

  const goToPrev = () => {
    const prevIndex = currentIndex === 0 ? destinations.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setIsPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  return (
    <div ref={sectionRef} className="h-screen w-full">
      <div ref={headerRef} className="px-8 py-14 flex items-center justify-between">
        <h1 ref={titleRef} className="text-5xl font-medium max-w-3xl text-[#181916]">
          Explore Nepal&apos;s Beautiful Destinations
        </h1>
        <div ref={playButtonRef} className="h-20 w-40 flex items-end justify-end">
          <button 
            onClick={handlePlayPause}
            className="flex items-center justify-center gap-3 hover:opacity-70 transition-opacity text-[#1447E6]"
          >
            <span className="text-2xl">{isPlaying ? 'Pause' : 'Play'}</span>
            {isPlaying ? (
              <FaPauseCircle className="h-6 w-6" />
            ) : (
              <FaPlayCircle className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div ref={carouselRef} className="relative h-[70vh] overflow-hidden rounded-lg mx-8">
        {/* Navigation Arrows */}
        <button 
          onClick={goToPrev}
          className="carousel-element absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 backdrop-blur-sm"
        >
          <FaChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        
        <button 
          onClick={goToNext}
          className="carousel-element absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 backdrop-blur-sm"
        >
          <FaChevronRight className="h-6 w-6 text-gray-800" />
        </button>

        {/* Images Container */}
        <div className="relative h-full w-full overflow-hidden">
          <div 
            ref={containerRef}
            className="flex h-full transition-transform duration-800 ease-in-out"
            style={{ 
              width: `${destinations.length * 100}%`,
              transform: `translateX(-${currentIndex * (100 / destinations.length)}%)`
            }}
          >
            {destinations.map((destination, index) => (
              <div 
                key={destination.id}
                className="relative flex-shrink-0 h-full"
                style={{ width: `${100 / destinations.length}%` }}
              >
                <img 
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=75';
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-all duration-500 space-y-4">
                  <h2 className="text-6xl font-bold mb-8 opacity-0 translate-y-8 animate-fade-in-up"
                      style={{ 
                        opacity: index === currentIndex ? 1 : 0,
                        transform: index === currentIndex ? 'translateY(0)' : 'translateY(2rem)',
                        transition: 'all 0.6s ease-out'
                      }}>
                    {destination.name}
                  </h2>
                  <p className="text-xl opacity-90 max-w-2xl"
                     style={{ 
                       opacity: index === currentIndex ? 0.9 : 0,
                       transform: index === currentIndex ? 'translateY(0)' : 'translateY(1rem)',
                       transition: 'all 0.8s ease-out 0.2s'
                     }}>
                    {destination.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="carousel-element absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-8 h-3 bg-white' 
                  : 'w-3 h-3 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="carousel-element absolute top-0 left-0 w-full h-1 bg-white/20 z-10">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ 
              width: `${((currentIndex + 1) / destinations.length) * 100}%` 
            }}
          />
        </div>

        {/* Counter */}
        <div className="carousel-element absolute top-8 right-8 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium z-10">
          {String(currentIndex + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default Destination;