import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-bg.jpg"
            alt="Elegant restaurant interior"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/65"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight text-white">
            Experience Fine Dining at <span className="text-primary-400">Café Ammos</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 font-medium">
            Indulge in exquisite cuisine prepared by award-winning chefs in a sophisticated ambiance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              href="/reservation" 
              size="lg" 
              animation="pulse-glow"
            >
              Reserve a Table
            </Button>
            <Button 
              href="/order" 
              variant="outline" 
              size="lg" 
              className="text-white border-white hover:text-primary-400 hover:border-primary-400"
              animation="rotating-border"
            >
              Order Online
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 