'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/ui/Button';
import { withAuth } from '@/lib/auth';
import Link from 'next/link';
import { ChevronLeft, Calendar, Clock, Users, Save, MessageSquare, Edit, Mail, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReservationStatus } from '@/data/mockReservations';

// Get current date in YYYY-MM-DD format for the date input
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Get current time rounded to nearest half hour for the time input
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes() >= 30 ? '30' : '00';
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

function NewReservationClient() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: getCurrentDate(),
    time: getCurrentTime(),
    partySize: 2,
    specialRequests: '',
    status: 'pending' as ReservationStatus,
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.customerName.trim()) {
      errors.customerName = 'Customer name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    
    if (!formData.time) {
      errors.time = 'Time is required';
    }
    
    if (!formData.partySize || formData.partySize < 1) {
      errors.partySize = 'Party size must be at least 1';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random reservation ID for demo purposes
      const reservationId = `R${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      
      // Combine date and time for the dateTime field
      const dateTime = new Date(`${formData.date}T${formData.time}`).toISOString();
      
      // In a real app, this would be an API call to save the reservation to the database
      console.log('Created reservation:', {
        reservationId,
        ...formData,
        dateTime,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      
      // Show success alert
      alert('Reservation created successfully!');
      
      // Redirect to reservations list
      router.push('/admin/reservations');
      
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <div>
            <Link href="/admin/reservations">
              <Button variant="outline" size="sm">
                <ChevronLeft size={16} className="mr-2" />
                Back to Reservations
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mt-4">
              Create New Reservation
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Add a new reservation to the system
            </p>
          </div>
        </div>
        
        {/* Content */}
        <div className="bg-primary-50 dark:bg-primary-900/90 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-primary-800">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-primary-800">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">Reservation Details</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Customer Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        className={`bg-primary-50 dark:bg-primary-900 border ${
                          formErrors.customerName ? 'border-red-500 dark:border-red-500' : 'border-primary-300 dark:border-primary-700'
                        } text-primary-800 dark:text-primary-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5`}
                        placeholder="Enter customer name"
                      />
                      {formErrors.customerName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.customerName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail size={16} className="text-primary-600 dark:text-primary-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`bg-primary-50 dark:bg-primary-900 border ${
                          formErrors.email ? 'border-red-500 dark:border-red-500' : 'border-primary-300 dark:border-primary-700'
                        } text-primary-800 dark:text-primary-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5`}
                        placeholder="customer@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone size={16} className="text-primary-600 dark:text-primary-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`bg-primary-50 dark:bg-primary-900 border ${
                          formErrors.phone ? 'border-red-500 dark:border-red-500' : 'border-primary-300 dark:border-primary-700'
                        } text-primary-800 dark:text-primary-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5`}
                        placeholder="+92 XXX XXX XXXX"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Reservation Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Reservation Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar size={16} className="text-primary-600 dark:text-primary-400" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`bg-primary-50 dark:bg-primary-900 border ${
                          formErrors.date ? 'border-red-500 dark:border-red-500' : 'border-primary-300 dark:border-primary-700'
                        } text-primary-800 dark:text-primary-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5`}
                        min={getCurrentDate()}
                      />
                      {formErrors.date && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Time *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock size={16} className="text-primary-600 dark:text-primary-400" />
                      </div>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`bg-primary-50 dark:bg-primary-900 border ${
                          formErrors.time ? 'border-red-500 dark:border-red-500' : 'border-primary-300 dark:border-primary-700'
                        } text-primary-800 dark:text-primary-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5`}
                        min="11:00"
                        max="22:00"
                        step="1800"
                      />
                      {formErrors.time && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.time}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="partySize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Party Size *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Users size={16} className="text-primary-600 dark:text-primary-400" />
                      </div>
                      <input
                        type="number"
                        id="partySize"
                        name="partySize"
                        value={formData.partySize}
                        onChange={handleChange}
                        min="1"
                        max="20"
                        className={`bg-primary-50 dark:bg-primary-900 border ${
                          formErrors.partySize ? 'border-red-500 dark:border-red-500' : 'border-primary-300 dark:border-primary-700'
                        } text-primary-800 dark:text-primary-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5`}
                      />
                      {formErrors.partySize && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.partySize}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Special Requests */}
              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Requests
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <MessageSquare size={16} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    className="bg-primary-50 dark:bg-primary-900 border border-primary-300 dark:border-primary-700 focus:border-primary-500 text-primary-800 dark:text-primary-200 text-sm rounded-lg focus:ring-primary-500 block w-full pl-10 p-2.5"
                    placeholder="Any special requests from the customer..."
                  ></textarea>
                </div>
              </div>
              
              {/* Admin Notes & Status */}
              <div>
                <div className="mb-3">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Initial Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="bg-primary-50 dark:bg-primary-900 border border-primary-300 dark:border-primary-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Staff Notes
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <Edit size={16} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="bg-primary-50 dark:bg-primary-900 border border-primary-300 dark:border-primary-700 focus:border-primary-500 text-primary-800 dark:text-primary-200 text-sm rounded-lg focus:ring-primary-500 block w-full pl-10 p-2.5"
                    placeholder="Internal notes about this reservation..."
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="mt-6 flex justify-end space-x-3">
              <Link href="/admin/reservations">
                <Button variant="outline" size="md" type="button">
                  Cancel
                </Button>
              </Link>
              <Button
                variant="primary"
                size="md"
                type="submit"
                disabled={isSubmitting}
                className="flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Create Reservation
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAuth(NewReservationClient); 