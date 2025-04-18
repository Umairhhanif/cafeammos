import React from 'react';
import Layout from '@/components/layout/Layout';
import ReservationForm from '@/components/reservation/ReservationForm';

export const metadata = {
  title: 'Reserve a Table | Café Ammos',
  description: 'Book your table at Café Ammos for a memorable dining experience. Easy online reservations with instant confirmation.',
};

const ReservationPage = () => {
  return (
    <Layout>
      <div className="pt-20 bg-primary-100/50 dark:bg-primary-950/50 min-h-screen">
        <div className="container-custom py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl mb-4">Reserve Your Table</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Secure your dining experience at Café Ammos. Fill out the form below to request a reservation, and we&rsquo;ll confirm your booking promptly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <ReservationForm />
            </div>

            <div className="space-y-8">
              {/* Restaurant Hours */}
              <div className="bg-primary-100/60 dark:bg-primary-950/30 rounded-xl shadow-lg p-6">
                <h3 className="font-display text-xl mb-4 pb-3 border-b border-green-200 dark:border-gray-700">
                  Restaurant Hours
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="font-medium">Monday - Thursday:</span>
                    <span className="text-gray-600 dark:text-gray-300">11:00 AM - 2:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Friday - Saturday:</span>
                    <span className="text-gray-600 dark:text-gray-300">11:00 AM - 2:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span className="text-gray-600 dark:text-gray-300">10:30 AM - 2:00 AM</span>
                  </li>
                </ul>
              </div>

              {/* Reservation Policy */}
              <div className="bg-primary-100/60 dark:bg-primary-950/30 rounded-xl shadow-lg p-6">
                <h3 className="font-display text-xl mb-4 pb-3 border-b border-green-200 dark:border-gray-700">
                  Reservation Policy
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 flex-shrink-0 mt-1">•</span>
                    <span>Reservations can be made up to 30 days in advance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 flex-shrink-0 mt-1">•</span>
                    <span>We hold reservations for 15 minutes past the scheduled time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 flex-shrink-0 mt-1">•</span>
                    <span>For parties of 8 or more, please call us directly for availability.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 flex-shrink-0 mt-1">•</span>
                    <span>Cancellations should be made at least 4 hours in advance.</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-primary-100/60 dark:bg-primary-950/30 rounded-xl shadow-lg p-6">
                <h3 className="font-display text-xl mb-4 pb-3 border-b border-green-200 dark:border-gray-700">
                  Our Location
                </h3>
                <div className="mb-4">
                  <p className="mb-2 text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Address:</span><br />
                    AC-10, Block-4, Clifton<br />
                    Karachi, Pakistan
                  </p>
                </div>
                
                {/* Google Maps */}
                <div className="rounded-lg overflow-hidden mb-4 border border-primary-200 dark:border-primary-800">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.664138223994!2d67.03070587515023!3d24.80695167796424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d6b0eca71b1%3A0xdc762f915dc10c97!2sCafe%20Ammos!5e0!3m2!1sen!2sus!4v1744961070394!5m2!1sen!2sus"
                    width="100%"
                    height="180"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="filter brightness-95 dark:brightness-80"
                  ></iframe>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  For immediate assistance or special arrangements, please contact us directly:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">+92 21 3456 7890</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">reservations@cafeammos.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReservationPage; 