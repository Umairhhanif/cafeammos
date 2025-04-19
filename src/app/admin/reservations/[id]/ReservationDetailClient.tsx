'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/ui/Button';
import { withAuth } from '@/lib/auth';
import { Reservation, ReservationStatus } from '@/data/mockReservations';
import Link from 'next/link';
import { ChevronLeft, Clock, Users, CalendarDays, Mail, Phone, MessageSquare, AlertCircle, CheckCircle, Edit } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Move StatusBadge outside the main component and use regular function instead of useCallback
const StatusBadge = ({ status }: { status: ReservationStatus }) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <AlertCircle className="w-4 h-4 mr-1" /> },
    confirmed: { color: 'bg-green-100 text-green-800 border-green-200', icon: <CheckCircle className="w-4 h-4 mr-1" /> },
    cancelled: { color: 'bg-red-100 text-red-800 border-red-200', icon: <AlertCircle className="w-4 h-4 mr-1" /> },
    completed: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <CheckCircle className="w-4 h-4 mr-1" /> },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
      {config.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

interface ReservationDetailClientProps {
  id: string;
}

function ReservationDetailClient({ id }: ReservationDetailClientProps) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [statusOptions] = useState<ReservationStatus[]>(['pending', 'confirmed', 'cancelled', 'completed']);
  const [updatedStatus, setUpdatedStatus] = useState<ReservationStatus | ''>('');
  const [notes, setNotes] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  // Format utility functions - memoize them with useCallback
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(date);
  }, []);

  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }, []);

  const formatDateTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }, []);

  // Fetch reservation data with useCallback
  const fetchReservation = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockReservation: Reservation = {
        reservationId: id as string,
        customerName: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567',
        dateTime: '2023-06-15T19:00:00Z',
        partySize: 4,
        status: 'confirmed' as ReservationStatus,
        specialRequests: 'Prefer a table by the window if possible.',
        notes: 'Celebration dinner.',
        createdAt: '2023-06-01T12:30:00Z',
        updatedAt: '2023-06-01T14:25:00Z'
      };
      
      setReservation(mockReservation);
      setUpdatedStatus(mockReservation.status);
      setNotes(mockReservation.notes || '');
    } catch (err) {
      console.error('Error fetching reservation:', err);
      setError('Failed to load reservation details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReservation();
  }, [fetchReservation]);

  // Handle save changes with useCallback
  const handleSaveChanges = useCallback(async () => {
    if (!reservation) return;
    
    setSaveLoading(true);
    setError('');
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedReservation = {
        ...reservation,
        status: updatedStatus,
        notes: notes,
        updatedAt: new Date().toISOString()
      };
      
      setReservation(updatedReservation);
      setEditMode(false);
      toast.success('Reservation updated successfully!');
    } catch (err) {
      console.error('Error updating reservation:', err);
      setError('Failed to update reservation. Please try again.');
      toast.error('Failed to update reservation');
    } finally {
      setSaveLoading(false);
    }
  }, [reservation, updatedStatus, notes]);

  // Handle edit toggle with useCallback
  const toggleEditMode = useCallback(() => {
    if (editMode && reservation) {
      // Reset form values if canceling edit
      setUpdatedStatus(reservation.status);
      setNotes(reservation.notes || '');
    }
    // Toggle edit mode after setting values if needed
    setEditMode(prev => !prev);
  }, [editMode, reservation]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !reservation) {
    return (
      <AdminLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error || 'Reservation not found'}</span>
          </div>
          <Link href="/admin/reservations">
            <Button variant="outline" size="sm" className="mt-4">
              <ChevronLeft size={16} className="mr-2" />
              Back to Reservations
            </Button>
          </Link>
        </div>
      </AdminLayout>
    );
  }

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
              Reservation #{reservation.reservationId}
            </h1>
            <div className="flex items-center mt-2">
              <StatusBadge status={reservation.status} />
              <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                Last updated: {formatDateTime(reservation.updatedAt)}
              </span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0">
            {editMode ? (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleEditMode}
                  disabled={saveLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveChanges}
                  disabled={saveLoading}
                  className="flex items-center"
                >
                  {saveLoading ? (
                    <>
                      <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleEditMode}
                className="flex items-center"
              >
                <Edit size={16} className="mr-2" />
                Edit Reservation
              </Button>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Information */}
          <div className="col-span-2">
            <div className="bg-primary-50 dark:bg-primary-900/90 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-primary-800">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-primary-800">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-white">Customer Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</h3>
                    <p className="text-base font-medium text-gray-800 dark:text-white">{reservation.customerName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Contact Information</h3>
                    <div className="flex items-center mb-2">
                      <Mail size={16} className="text-primary-600 dark:text-primary-400 mr-2" />
                      <a href={`mailto:${reservation.email}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                        {reservation.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="text-primary-600 dark:text-primary-400 mr-2" />
                      <a href={`tel:${reservation.phone}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                        {reservation.phone}
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date & Time</h3>
                    <div className="flex items-center mb-2">
                      <CalendarDays size={16} className="text-primary-600 dark:text-primary-400 mr-2" />
                      <span className="text-primary-800 dark:text-primary-200">{formatDate(reservation.dateTime)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="text-primary-600 dark:text-primary-400 mr-2" />
                      <span className="text-primary-800 dark:text-primary-200">{formatTime(reservation.dateTime)}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Party Size</h3>
                    <div className="flex items-center">
                      <Users size={16} className="text-primary-600 dark:text-primary-400 mr-2" />
                      <span className="text-primary-800 dark:text-primary-200">{reservation.partySize} people</span>
                    </div>
                  </div>
                </div>
                
                {reservation.specialRequests && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Special Requests</h3>
                    <div className="bg-primary-100 dark:bg-primary-800/90 rounded-md p-4 border border-primary-200 dark:border-primary-700">
                      <div className="flex">
                        <MessageSquare size={18} className="text-primary-600 dark:text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-primary-800 dark:text-primary-200">{reservation.specialRequests}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Status Management */}
          <div className="col-span-1">
            <div className="bg-primary-50 dark:bg-primary-900/90 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-primary-800">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-primary-800">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {editMode ? 'Edit Status' : 'Reservation Status'}
                </h2>
              </div>
              <div className="p-6">
                {editMode ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Update Status
                    </label>
                    <select
                      value={updatedStatus}
                      onChange={(e) => setUpdatedStatus(e.target.value as ReservationStatus)}
                      className="bg-primary-50 dark:bg-primary-900 border border-gray-300 dark:border-primary-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 mb-4"
                    >
                      <option value="">Select status</option>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                    
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Staff Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="bg-primary-50 dark:bg-primary-900 border border-gray-300 dark:border-primary-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      placeholder="Add internal notes about this reservation..."
                    ></textarea>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Current Status</h3>
                      <StatusBadge status={reservation.status} />
                    </div>
                    
                    {reservation.notes && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Staff Notes</h3>
                        <div className="bg-primary-100 dark:bg-primary-800/90 rounded-md p-4 border border-primary-200 dark:border-primary-700">
                          <p className="text-primary-800 dark:text-primary-200 whitespace-pre-line">{reservation.notes}</p>
                        </div>
                      </div>
                    )}
                    
                    {!reservation.notes && (
                      <div className="flex items-start mt-4 text-gray-500 dark:text-gray-400 text-sm">
                        <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                        <p>No staff notes have been added to this reservation yet.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Reservation Timeline */}
            <div className="bg-primary-50 dark:bg-primary-900/90 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-primary-800 mt-6">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-primary-800">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-white">Reservation Timeline</h2>
              </div>
              <div className="p-6">
                <div className="relative pb-2">
                  <div className="absolute left-3.5 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  
                  <div className="relative flex items-start mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white z-10 mr-4">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Reservation Created</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDateTime(reservation.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white z-10 mr-4">
                      <Clock size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Last Updated</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDateTime(reservation.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAuth(ReservationDetailClient); 