import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

export default function ReservationCta() {
  return (
    <section className="section-padding bg-primary-900/10 dark:bg-primary-950/60 relative">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-repeat bg-pattern-dots"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="/images/restaurant-table.jpg"
              alt="Café Ammos dining table"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/50 to-primary-900/20"></div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <span className="text-primary-600 font-medium mb-2 block">Reserve Your Table</span>
            <h2 className="font-display text-3xl md:text-4xl mb-4 text-primary-800 dark:text-primary-400">
              Experience Café Ammos Today
            </h2>
            <p className="text-gray-800 dark:text-gray-300 mb-6">
              Join us for an unforgettable dining experience. Reserve your table now and indulge in our delicious Mediterranean cuisine in a warm and inviting atmosphere.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-primary-100/60 dark:bg-primary-900/30 rounded-lg p-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-600 mb-2">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <h3 className="font-display text-lg text-primary-800 dark:text-primary-400 mb-1">Our Location</h3>
                <p className="text-gray-700 dark:text-gray-400">AC-10, Block-4, Clifton, Karachi</p>
                <p className="text-gray-700 dark:text-gray-400 mt-1">Phone: +92 21 3456 7890</p>
                <p className="text-gray-700 dark:text-gray-400 mb-2">Email: reservations@cafeammos.com</p>
                
                <div className="rounded-lg overflow-hidden h-[200px] mt-3 mb-2">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.664138223994!2d67.03070587515023!3d24.80695167796424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d6b0eca71b1%3A0xdc762f915dc10c97!2sCafe%20Ammos!5e0!3m2!1sen!2sus!4v1744961070394!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                
                <a 
                  href="https://goo.gl/maps/6jRf3F6gCrkyLKgc9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 text-sm inline-flex items-center mt-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  View on map
                </a>
              </div>
              
              <div className="bg-primary-100/60 dark:bg-primary-900/30 rounded-lg p-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-600 mb-2">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                </svg>
                <h3 className="font-display text-lg text-primary-800 dark:text-primary-400 mb-1">Hours</h3>
                <p className="text-gray-700 dark:text-gray-400">
                  Mon - Thu: 11:00 AM - 2:00 AM<br />
                  Fri - Sat: 11:00 AM - 2:00 AM<br />
                  Sunday: 10:30 AM - 2:00 AM<br />
                  Happy Hour: 4:00 PM - 6:00 PM
                </p>
              </div>
            </div>
            
            <Button 
              href="/reservations" 
              variant="primary" 
              className="w-full sm:w-auto" 
              animation="wave"
            >
              Make a Reservation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 