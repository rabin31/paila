'use client'
import React, { useRef, useEffect } from 'react'
import { MdExplore } from "react-icons/md";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Detail = () => {
  // Animation refs
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphsRef = useRef([]);
  const buttonRef = useRef(null);
  const videoRef = useRef(null);
  const bgContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([bgContainerRef.current], {
        scale: 0.95,
        opacity: 0
      });

      gsap.set([titleRef.current, buttonRef.current], {
        opacity: 0,
        x: -60
      });

      gsap.set(paragraphsRef.current, {
        opacity: 0,
        x: -40
      });

      gsap.set(videoRef.current, {
        opacity: 0,
        x: 60,
        scale: 0.9
      });

      // Create main timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate background container first
      mainTimeline.to(bgContainerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      })
      // Animate title
      .to(titleRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      // Animate paragraphs with stagger
      .to(paragraphsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.4")
      // Animate button
      .to(buttonRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2")
      // Animate video
      .to(videoRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6");

    }, containerRef);

    // Cleanup function
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full py-4 px-8 font-sora">
        <div ref={bgContainerRef} className="h-full w-full bg-[#042894] rounded-sm flex items-center justify-center">
            <div className="w-[50%] h-full px-10 py-16 space-y-8">
                <h1 ref={titleRef} className="text-4xl font-medium text-white">
                  Use our Experience Builder to put us to the test!
                </h1>
                <div className="space-y-2 text-white">
                  <p ref={el => el && (paragraphsRef.current[0] = el)}>
                    With a selection of stylish yachts to choose from, including bareboat, skippered and crewed options, we have everything you need for the sailing holiday of a lifetime.
                  </p>
                  <p ref={el => el && (paragraphsRef.current[1] = el)}>
                    We have access to every charter fleet, and pride ourselves on our ability to find the perfect fit for you, tailoring each charter to suit your individual needs.
                  </p>
                  <p ref={el => el && (paragraphsRef.current[2] = el)}>
                    Your personal charter broker will listen to your feedback and draw on years of expertise to guide you through every step of the charter process, from enquiry to booking and beyond.
                  </p>
                  <p ref={el => el && (paragraphsRef.current[3] = el)}>
                    We reject thousands of yachts and do all the hard work, so you don't have to!
                  </p>
                </div>
                <button ref={buttonRef} className="px-6 py-4 bg-white text-[#1447E6] flex items-center justify-center gap-2 rounded-sm hover:bg-gray-100 transition-colors duration-200">
                  <span>Explore Now </span> 
                  <MdExplore className="h-6 w-6"/>
                </button>
            </div>
            <div className="w-[50%] h-full px-10 py-16">
                <div className="relative h-full w-full">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-10 rounded-2xl"
                    src="/video3.mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Detail