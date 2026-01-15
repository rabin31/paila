'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { TiStarFullOutline } from 'react-icons/ti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const faqData = [
    {
      id: 1,
      question: 'What is AI Trip Planner?',
      answer: 'AI Trip Planner is an intelligent travel assistant that suggests destinations, itineraries, and activities based on your preferences, budget, and mood.'
    },
    {
      id: 2,
      question: 'How does the AI recommend destinations?',
      answer: 'It analyzes your travel preferences, mood, interests, budget, and past trips to suggest personalized destinations and activities.'
    },
    {
      id: 3,
      question: 'Can I plan trips for multiple people?',
      answer: 'Yes, you can add multiple travelers and the AI will consider everyone\'s preferences to create a shared itinerary.'
    },
    {
      id: 4,
      question: 'Can I set a budget limit for my trip?',
      answer: 'Absolutely! You can specify your budget, and the AI will suggest destinations, accommodations, and activities within that range.'
    }
  ];
  

const Page = () => {
  const [openItems, setOpenItems] = useState([]);
  const answersRef = useRef({});
  const iconsRef = useRef({});
  const buttonsRef = useRef({});
  
  // Animation refs
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const faqItemsRef = useRef([]);
  const ctaRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Set initial states for ScrollTrigger animations
    gsap.set([headerRef.current, ctaRef.current, buttonRef.current], {
      opacity: 0,
      y: 60
    });

    gsap.set(faqItemsRef.current, {
      opacity: 0,
      y: 50
    });

    // Create ScrollTrigger animations
    const ctx = gsap.context(() => {
      // Header animation
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // FAQ items staggered animation
      gsap.to(faqItemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: faqItemsRef.current[0],
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // CTA text animation
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Button animation
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: buttonRef.current,
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

  const toggleItem = (id) => {
    const answerEl = answersRef.current[id];
    const iconEl = iconsRef.current[id];
    const buttonEl = buttonsRef.current[id];

    if (!answerEl || !iconEl || !buttonEl) return;

    const isOpen = openItems.includes(id);

    if (isOpen) {
      gsap.to(answerEl, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.inOut' });
      gsap.to(iconEl, { rotate: 0, duration: 0.3 });
      gsap.to(buttonEl, { backgroundColor: 'transparent', duration: 0.2 });
      setOpenItems(prev => prev.filter(itemId => itemId !== id));
    } else {
      gsap.set(answerEl, { height: 'auto' });
      const naturalHeight = answerEl.offsetHeight;
      gsap.set(answerEl, { height: 0 });
      gsap.to(answerEl, { height: naturalHeight, opacity: 1, duration: 0.5, ease: 'power3.out' });
      gsap.to(iconEl, { rotate: 180, duration: 0.3 });
      gsap.to(buttonEl, { backgroundColor: 'rgba(249, 250, 251, 0.5)', duration: 0.2 });
      setOpenItems(prev => [...prev, id]);
    }
  };

  const handleButtonHover = (id, isHovering) => {
    const buttonEl = buttonsRef.current[id];
    const iconEl = iconsRef.current[id];
    if (!buttonEl || !iconEl) return;

    if (isHovering) {
      gsap.to(buttonEl, { backgroundColor: 'rgba(249, 250, 251, 1)', duration: 0.2 });
      gsap.to(iconEl, { scale: 1.1, duration: 0.2 });
    } else if (!openItems.includes(id)) {
      gsap.to(buttonEl, { backgroundColor: 'transparent', duration: 0.2 });
      gsap.to(iconEl, { scale: 1, duration: 0.2 });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen py-16 px-8 font-sora">
      <div className="mx-auto">
        <div ref={headerRef} className="faq-header mb-12">
          <h1 className="text-5xl font-medium tracking-tight text-center mt-2 mb-4 text-[#181916]">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-4 mb-12">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              ref={el => {
                if (el) faqItemsRef.current[index] = el;
              }}
              className="faq-item bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
            >
              <button
                ref={el => {
                  buttonsRef.current[item.id] = el;
                }}
                onClick={() => toggleItem(item.id)}
                onMouseEnter={() => handleButtonHover(item.id, true)}
                onMouseLeave={() => handleButtonHover(item.id, false)}
                className="w-full px-6 py-6 text-left flex items-center justify-between gap-4 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <span className="text-gray-400 font-medium text-lg min-w-[3rem]">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight">
                    {item.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div
                    ref={el => {
                      iconsRef.current[item.id] = el;
                    }}
                    className="w-8 h-8 rounded-full bg-[#1447E6] flex items-center justify-center"
                  >
                    {openItems.includes(item.id) ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </button>
              <div
                ref={el => {
                  answersRef.current[item.id] = el;
                }}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="px-6 pb-6 ml-16">
                  <div className="h-px bg-gray-200 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p ref={ctaRef} className="faq-cta text-sm text-center font-semibold text-gray-700 mb-4">
          Still have more questions?
        </p>
        <Link href="/Contact">
          <div ref={buttonRef} className="flex items-center justify-center gap-4">
            <button className="px-6 py-4 bg-[#1447E6] hover:bg-black hover:cursor-pointer text-white flex items-center justify-center gap-2 rounded-sm">
              <span>Explore Now </span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;