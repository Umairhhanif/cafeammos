'use client';

import React, { useEffect, useState } from 'react';
import { withAuth } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import { getReservationStats, mockReservations, Reservation } from '@/data/mockReservations';
import Link from 'next/link';

// Stat card component
const StatCard = ({ title, value, icon, color }: { title: string; value: number; icon: React.ReactNode; color: string }) => (
  <div className="bg-primary-50 dark:bg-primary-900/90 rounded-lg shadow-sm p-6 border border-primary-100 dark:border-primary-800/80">
    <div className="flex items-center">
      <div className={`rounded-md p-3 ${color}`}>
        {icon}
      </div>
      <div className="ml-5">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h3>
        <div className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</div>
      </div>
    </div>
  </div>
);

// Define the stats interface
interface DashboardStats {
  total: number;
  upcoming: number;
  confirmed: number;
  pending: number;
  canceled: number;
}

const DashboardClient = () => {
  const [stats, setStats] = useState<DashboardStats>({ 
    total: 0, 
    upcoming: 0, 
    confirmed: 0, 
    pending: 0, 
    canceled: 0 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    try {
      // Get stats safely
      const reservationStats = getReservationStats();
      console.log('Reservation stats:', reservationStats);
      setStats(reservationStats);
      
      // Get recent reservations (last 5)
      const recent = [...mockReservations]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
      setRecentReservations(recent);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).format(date);
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Invalid date';
    }
  };

  // Extract time from a dateTime string (e.g., "2023-11-15T19:00:00Z" -> "7:00 PM")
  const formatTime = (dateTimeString: string) => {
    try {
      const date = new Date(dateTimeString);
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (err) {
      console.error('Error formatting time:', err);
      return 'Invalid time';
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <AdminLayout>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md text-red-700 dark:text-red-300">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Overview of your restaurant&apos;s reservations and activity
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Reservations"
              value={stats.total || 0}
              icon={
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              }
              color="bg-indigo-600"
            />
            <StatCard
              title="Upcoming Reservations"
              value={stats.upcoming || 0}
              icon={
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              }
              color="bg-primary-600"
            />
            <StatCard
              title="Confirmed"
              value={stats.confirmed || 0}
              icon={
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              }
              color="bg-green-600"
            />
            <StatCard
              title="Pending"
              value={stats.pending || 0}
              icon={
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              }
              color="bg-yellow-600"
            />
          </div>

          {/* Recent Reservations */}
          <div className="bg-primary-50 dark:bg-primary-900/90 rounded-lg shadow-sm border border-primary-100 dark:border-primary-800/80 overflow-hidden">
            <div className="px-6 py-5 border-b border-primary-100 dark:border-primary-800/80">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Reservations</h2>
            </div>
            <div className="overflow-x-auto">
              {recentReservations.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No recent reservations found.
                </div>
              ) : (
                <table className="min-w-full divide-y divide-primary-100 dark:divide-primary-800/80">
                  <thead className="bg-primary-100 dark:bg-primary-800/90">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        Party Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-primary-50 dark:bg-primary-900/90 divide-y divide-primary-100 dark:divide-primary-800/80">
                    {recentReservations.map((reservation) => (
                      <tr key={reservation.reservationId} className="hover:bg-primary-100/70 dark:hover:bg-primary-800/70">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{reservation.customerName}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-300">{reservation.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{formatDate(reservation.dateTime)}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">{formatTime(reservation.dateTime)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{reservation.partySize} people</div>
                          {reservation.specialRequests && (
                            <div className="text-sm text-gray-500 dark:text-gray-300 truncate max-w-[200px]" title={reservation.specialRequests}>
                              {reservation.specialRequests}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={reservation.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/admin/reservations/${reservation.reservationId}`} className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="px-6 py-4 border-t border-primary-100 dark:border-primary-800/80 bg-primary-100 dark:bg-primary-800/70">
              <Link href="/admin/reservations" className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200 font-medium text-sm">
                View all reservations →
              </Link>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default withAuth(DashboardClient); 