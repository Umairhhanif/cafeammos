'use client';

import React, { useEffect, useState } from 'react';
import MenuList from '@/components/menu/MenuList';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';

const MenuClient = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Layout>
      <div className="pt-20 bg-primary-100/30 dark:bg-primary-950/30 min-h-screen relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-primary-200/30 -z-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-primary-300/20 -z-10 animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-secondary-200/20 -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        {/* Hero Banner */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <Image
            src="/images/menu-banner.jpg"
            alt="Café Ammos Menu"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-primary-900/40 dark:from-primary-950/90 dark:to-primary-950/50"></div>
          <div 
            className={`container-custom relative z-10 h-full flex flex-col justify-center items-center text-center text-white transition-all duration-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="font-display text-4xl md:text-5xl mb-4 animate-fadeIn" style={{ animationDuration: '1.2s' }}>Our Menu</h1>
            <p className="text-lg md:text-xl max-w-2xl animate-fadeIn" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }}>
              Discover our culinary creations made with seasonal ingredients, passion, and artistry
            </p>
            <div className="mt-6 animate-fadeIn" style={{ animationDuration: '1.8s', animationDelay: '0.5s' }}>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#starters" className="px-4 py-2 bg-primary-600/90 hover:bg-primary-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 btn-lift">
                  Starters
                </a>
                <a href="#salads" className="px-4 py-2 bg-primary-600/90 hover:bg-primary-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 btn-ripple">
                  Salads
                </a>
                <a href="#main-courses" className="px-4 py-2 bg-primary-600/90 hover:bg-primary-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 btn-lift">
                  Main Courses
                </a>
                <a href="#desserts" className="px-4 py-2 bg-primary-600/90 hover:bg-primary-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 btn-ripple">
                  Desserts
                </a>
                <a href="#beverages" className="px-4 py-2 bg-primary-600/90 hover:bg-primary-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 btn-lift">
                  Beverages
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-16 relative">
          <div className="max-w-4xl mx-auto mb-12 text-center animate-fadeIn" style={{ animationDuration: '1s', animationDelay: '0.8s' }}>
            <p className="text-primary-700 dark:text-primary-300 italic">
              &ldquo;Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors - it&rsquo;s how you combine them that sets you apart.&rdquo;
            </p>
            <p className="mt-2 text-primary-600 font-medium">— Wolfgang Puck</p>
          </div>
          
          <MenuList />
        </div>
      </div>
    </Layout>
  );
};

export default MenuClient; 