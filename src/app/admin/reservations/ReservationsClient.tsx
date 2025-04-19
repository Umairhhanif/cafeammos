'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { withAuth } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { mockReservations, Reservation, ReservationStatus } from '@/data/mockReservations';
import { Search, Filter, ChevronLeft, ChevronRight, Download, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Status badge component for reservation status
const StatusBadge = ({ status }: { status: ReservationStatus }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

function ReservationsClient() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'all'>('all');
  const [dateFilter, setDateFilter] = useState('');
  const reservationsPerPage = 10;

  // Fetch reservations data
  useEffect(() => {
    // Simulate API fetch
    const fetchReservations = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setReservations(mockReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReservations();
  }, []);

  // Format date for display and filter comparisons
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Format date for filter input
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Apply filters
  useEffect(() => {
    let result = [...reservations];
    
    // Apply search term filter
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        res => 
          res.customerName.toLowerCase().includes(lowercaseSearchTerm) ||
          res.email.toLowerCase().includes(lowercaseSearchTerm) ||
          res.phone.includes(searchTerm) ||
          res.reservationId.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(res => res.status === statusFilter);
    }
    
    // Apply date filter
    if (dateFilter) {
      result = result.filter(res => 
        formatDateForInput(res.dateTime) === dateFilter
      );
    }
    
    setFilteredReservations(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [reservations, searchTerm, statusFilter, dateFilter]);

  // Get current reservations based on pagination
  const indexOfLastRecord = currentPage * reservationsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - reservationsPerPage;
  const currentReservations = filteredReservations.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);

  // Handle page navigation
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('');
  }, []);

  // Export reservations to CSV
  const exportToCSV = useCallback(() => {
    // Function to convert reservations to CSV format
    const convertToCSV = (data: Reservation[]) => {
      const header = ["ID", "Customer", "Email", "Phone", "Date & Time", "Party Size", "Status", "Notes"];
      const rows = data.map(res => [
        res.reservationId,
        res.customerName,
        res.email,
        res.phone,
        formatDate(res.dateTime),
        res.partySize,
        res.status,
        res.notes || ""
      ]);
      
      return [header, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(","))
        .join("\n");
    };
    
    const csvContent = convertToCSV(filteredReservations);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `cafe-ammos-reservations-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredReservations]);

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Reservations</h1>
          </div>
          
          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              size="small"
              onClick={resetFilters}
              className="flex items-center gap-1"
            >
              <RefreshCw size={16} />
              <span>Reset</span>
            </Button>
            <Button 
              variant="primary" 
              size="small"
              onClick={exportToCSV}
              className="flex items-center gap-1"
            >
              <Download size={16} />
              <span>Export</span>
            </Button>
            <Link href="/admin/reservations/new">
              <Button variant="secondary" size="small">New Reservation</Button>
            </Link>
          </div>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-primary-50 dark:bg-primary-900/50 border border-gray-300 dark:border-primary-800/50 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Status filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              className="bg-primary-50 dark:bg-primary-900/50 border border-gray-300 dark:border-primary-800/50 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ReservationStatus | 'all')}
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          {/* Date filter */}
          <div className="relative">
            <input
              type="date"
              className="bg-primary-50 dark:bg-primary-900/50 border border-gray-300 dark:border-primary-800/50 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          
          {/* Record count */}
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-end">
            Showing {currentReservations.length} of {filteredReservations.length} reservations
          </div>
        </div>
        
        {/* Reservations Table */}
        <div className="bg-primary-50 dark:bg-primary-900/50 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-primary-800/50">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : currentReservations.length === 0 ? (
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                No reservations found.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-primary-800/50">
                <thead className="bg-primary-100 dark:bg-primary-800/70">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Party Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-primary-50 dark:bg-primary-900/50 divide-y divide-gray-200 dark:divide-primary-800/50">
                  {currentReservations.map((reservation) => (
                    <tr key={reservation.reservationId} className="hover:bg-primary-100/50 dark:hover:bg-primary-800/40">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {reservation.reservationId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{reservation.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {formatDate(reservation.dateTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {reservation.partySize} people
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={reservation.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-300">{reservation.email}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">{reservation.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/admin/reservations/${reservation.reservationId}`}
                          className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Pagination */}
          {!loading && filteredReservations.length > 0 && (
            <div className="px-6 py-3 bg-primary-100 dark:bg-primary-800/30 border-t border-gray-200 dark:border-primary-800/50 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline" 
                  size="small"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </Button>
                <Button
                  variant="outline" 
                  size="small"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAuth(ReservationsClient); 