'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';

const Preloader = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to('body', {
      overflow: 'hidden',
    })
      .to(
        '.preloader .text-container',
        {
          duration: 0,
          opacity: 1,
          ease: 'power3.out',
        }
      )
      .from('.preloader .text-container h1', {
        duration: 1.5,
        delay: 0.2,
        y: 200,
        skewY: 10,
        stagger: 0.4,
        ease: 'power3.out',
      })
      .to('.preloader .text-container h1', {
        duration: 1.2,
        y: 200,
        skewY: -20,
        stagger: 0.2,
        ease: 'power3.out',
      })
      .to('.preloader', {
        duration: 1,
        height: '0vh',
        ease: 'power3.out',
      })
      .to(
        'body',
        {
          overflow: 'auto',
        },
        '-=1'
      )
      .set('.preloader', { display: 'none' });
  }, []);

  return (
    <div className="preloader">
      <div className="text-container">
        <h1 className="big-text">PREDICT YOUR</h1>
        <h1 className="big-text">NEXT</h1>
        <h1 className="big-text">TRIP</h1>
      </div>
      <style jsx>{`
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #000000;
          overflow: hidden;
          z-index: 100;
        }
        .text-container {
          display: flex;
          flex-direction: row;
          gap: 1em;
          overflow: hidden;
          color: white;
          opacity: 0;
        }
        .big-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 5rem;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
