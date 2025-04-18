'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Critic",
    avatar: "/images/avatar-1.jpg",
    comment: "The culinary artistry at Café Ammos is truly exceptional. Every dish is a masterpiece of flavor and presentation. The sommelier's wine pairings elevated the experience to new heights.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Guest",
    avatar: "/images/avatar-2.jpg",
    comment: "We've celebrated our anniversary at Café Ammos for three years running. The intimate atmosphere and impeccable service make it our favorite restaurant in the city.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Food Blogger",
    avatar: "/images/avatar-3.jpg",
    comment: "From the moment you walk in, you know you're in for something special. The tasting menu is a journey through exquisite flavors, and the staff's knowledge is impressive.",
    rating: 4
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Executive Chef",
    avatar: "/images/avatar-4.jpg",
    comment: "As a fellow chef, I appreciate the technical skill and creativity behind each dish. The respect for ingredients shines through in every bite. A truly remarkable dining experience.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500); // Duration of the animation
  }, [isAnimating]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500); // Duration of the animation
  }, [isAnimating]);

  const handleDotClick = useCallback((index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500); // Duration of the animation
  }, [isAnimating, activeIndex]);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <section className="relative py-20 overflow-hidden bg-primary-50/50 dark:bg-primary-950/30">
      {/* Decorative elements */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-72 h-72 bg-primary-200/40 rounded-full opacity-60 -ml-32 blur-3xl"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/30 rounded-full opacity-50 -mr-48 blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-primary-300/20 rounded-full opacity-60 blur-2xl"></div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-4xl font-serif font-semibold mb-4 text-primary-800 dark:text-primary-400">Guest Testimonials</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-800 dark:text-gray-300">
            Don&rsquo;t just take our word for it - here&rsquo;s what our valued guests have to say about their dining experiences at Café Ammos.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Testimonial Card */}
          <div 
            className="backdrop-blur-md bg-primary-100/40 dark:bg-primary-900/20 rounded-xl shadow-lg p-8 mb-8 relative z-10 animate-fadeIn border border-primary-200/50 dark:border-primary-600/20"
          >
            <div className="absolute top-6 right-8">
              {/* Stars based on rating */}
              <div className="flex space-x-1">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                <div className="absolute inset-0 bg-primary-300/30 dark:bg-primary-500/30 rounded-full -z-10 blur-md transform scale-110"></div>
                <Image 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].name}
                  className="rounded-full object-cover border-2 border-primary-300 dark:border-primary-500"
                  fill
                />
              </div>
              
              <div>
                <div className="mb-4">
                  <p className="text-gray-800 dark:text-gray-200 italic text-lg leading-relaxed mb-4">&ldquo;{testimonials[activeIndex].comment}&rdquo;</p>
                </div>
                <h4 className="text-primary-800 dark:text-primary-400 font-medium text-lg">{testimonials[activeIndex].name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{testimonials[activeIndex].role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full bg-primary-100/60 dark:bg-primary-800/30 shadow-md text-primary-800 dark:text-primary-400 hover:bg-primary-200/80 dark:hover:bg-primary-700/50 transition-colors disabled:opacity-50"
              disabled={isAnimating}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex space-x-2 justify-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`rounded-full transition-all duration-200 ${
                    activeIndex === index 
                      ? 'bg-primary-600 dark:bg-primary-500 w-6 h-3' 
                      : 'bg-primary-300/60 dark:bg-primary-700/60 w-3 h-3 hover:bg-primary-400/80 dark:hover:bg-primary-600/80'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  disabled={isAnimating}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-3 rounded-full bg-primary-100/60 dark:bg-primary-800/30 shadow-md text-primary-800 dark:text-primary-400 hover:bg-primary-200/80 dark:hover:bg-primary-700/50 transition-colors disabled:opacity-50"
              disabled={isAnimating}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 