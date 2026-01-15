import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from '../Marquee';
import Card from '../ui/Card';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardRef = useRef(null);
  const marqueeRef = useRef(null);

  const images = [
    {
      id: 1,
      image: "https://b1088268.smushcdn.com/1088268/wp-content/uploads/2021/12/everest-base-camp-trek-1-scaled-1.jpg?lossy=2&strip=1&webp=1",
      title: "Smart Trip Planner",
      description: "Easily create personalized itineraries for trekking, culture, or relaxation."
    },
    {
      id: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQczRZiGjn1VtKHpmAEXm1ddzIflI8UuZnoWQ&s",
      title: "Discover Hidden Gems",
      description: "Explore famous landmarks and offbeat destinations across Nepal."
    },
    {
      id: 3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo19ZtnGWks2oWWVHKfilHS1sC6RnkqABffA&s",
      title: "Local Insights",
      description: "Get authentic travel tips from locals — food, culture, and festivals."
    },
    {
      id: 4,
      image: "https://www.visithimalayastrek.com/uploads/packages/ganesh-himal-base-camp-trek-223106.jpeg",
      title: "Eco-Friendly Travel",
      description: "Choose sustainable options that support local communities."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, descriptionRef.current, cardRef.current, marqueeRef.current], {
        opacity: 0,
        y: 60
      });

      // Create timeline for header content
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate title
      headerTl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      // Animate description with slight delay
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

      // Animate Card component
      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate Marquee component
      gsap.to(marqueeRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

    }, containerRef);

    // Cleanup function
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-auto font-sora">
      <div className="flex flex-col items-center py-22 px-4 md:px-8 space-y-4">
        <h1 
          ref={titleRef}
          className="text-black text-3xl md:text-4xl lg:text-5xl ita font-medium text-center"
        >
          Why Choose Paila?
        </h1>
        <p 
          ref={descriptionRef}
          className="text-gray-600 text-md text-center italic max-w-4xl"
        >
          At Paila, we believe every journey starts with the right step. Our platform is designed to help travelers experience Nepal authentically and stress-free. Whether you&apos;re planning a trek to Everest Base Camp, a cultural tour of Kathmandu Valley, or a peaceful escape to Pokhara&apos;s lakeside, Paila makes it simple.
        </p>
      </div>

      <div ref={cardRef}>
        <Card />
      </div>
      
      <div ref={marqueeRef}>
        <Marquee />
      </div>
    </div>
  )
}

export default About;