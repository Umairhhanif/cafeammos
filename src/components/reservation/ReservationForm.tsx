'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';

const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
];

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    occasion: '',
    specialRequests: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Reservation submitted:', formData);
    // Show success message, reset form, etc.
    alert('Your reservation request has been submitted. We will confirm shortly!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 2,
      occasion: '',
      specialRequests: '',
    });
  };

  // Get tomorrow's date for min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-primary-100/60 dark:bg-primary-950/30 rounded-xl shadow-lg p-8 animate-fadeIn" style={{ animationDuration: '0.8s' }}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/80 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/80 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/80 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="(123) 456-7890"
            />
          </div>

          {/* Guests */}
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Number of Guests *
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/80 text-gray-800 dark:text-gray-100 transition-colors duration-200"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'person' : 'people'}
                </option>
              ))}
              <option value={11}>Larger party (11+)</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={minDate}
              required
              className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/80 text-gray-800 dark:text-gray-100 transition-colors duration-200"
            />
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time *
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/80 text-gray-800 dark:text-gray-100 transition-colors duration-200"
            >
              <option value="">Select a time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Occasion */}
          <div className="md:col-span-2">
            <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Occasion (Optional)
            </label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/80 text-gray-800 dark:text-gray-100 transition-colors duration-200"
            >
              <option value="">Select an occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Date">Date</option>
              <option value="Business">Business</option>
              <option value="Special Occasion">Special Occasion</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Special Requests */}
          <div className="md:col-span-2">
            <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Special Requests (Optional)
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-primary-300 dark:border-primary-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/80 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="Any dietary restrictions, allergies, or seating preferences?"
            ></textarea>
          </div>
        </div>

        <div className="mt-8">
          <Button 
            type="submit" 
            size="lg" 
            fullWidth
            animation="pulse-glow"
          >
            Request Reservation
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
            * We&rsquo;ll send a confirmation email once your reservation is confirmed.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm; 