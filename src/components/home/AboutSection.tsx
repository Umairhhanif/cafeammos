import React from 'react';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="section-padding bg-primary-100/50 dark:bg-primary-950/50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-primary-600 font-medium mb-2 block">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl mb-6 text-primary-800 dark:text-primary-400">The Café Ammos Experience</h2>
            
            <p className="text-gray-800 dark:text-gray-300 mb-6">
              Established in 2010, Café Ammos has been serving exquisite cuisine in a sophisticated yet welcoming atmosphere. 
              Our philosophy revolves around sustainable, farm-to-table ingredients, expertly prepared by our team of passionate chefs.
            </p>
            
            <p className="text-gray-800 dark:text-gray-300 mb-8">
              We take pride in our commitment to culinary excellence, impeccable service, and creating memorable dining experiences for our guests. 
              Whether you&rsquo;re celebrating a special occasion or simply enjoying a night out, we invite you to savor the distinctive flavors and warm hospitality that define Café Ammos.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-primary-200/70 dark:bg-primary-900/30 p-5 rounded-lg text-center w-24 h-24 flex flex-col justify-center shadow-sm">
                <span className="block text-3xl font-bold text-primary-600">13</span>
                <span className="text-sm text-gray-700 dark:text-gray-400">Years of Excellence</span>
              </div>
              
              <div className="bg-primary-200/70 dark:bg-primary-900/30 p-5 rounded-lg text-center w-24 h-24 flex flex-col justify-center shadow-sm">
                <span className="block text-3xl font-bold text-primary-600">5</span>
                <span className="text-sm text-gray-700 dark:text-gray-400">Award-Winning Chefs</span>
              </div>
              
              <div className="bg-primary-200/70 dark:bg-primary-900/30 p-5 rounded-lg text-center w-24 h-24 flex flex-col justify-center shadow-sm">
                <span className="block text-3xl font-bold text-primary-600">30+</span>
                <span className="text-sm text-gray-700 dark:text-gray-400">Signature Dishes</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative h-96 lg:h-[540px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/restaurant-interior.jpg"
                alt="Café Ammos interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/30 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary-300/50 dark:bg-primary-900/50 rounded-full -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-200/50 dark:bg-secondary-900/30 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 