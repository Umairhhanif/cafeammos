// Reservation status options
export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Interface for reservation data
export interface Reservation {
  reservationId: string;
  customerName: string;
  email: string;
  phone: string;
  dateTime: string;
  partySize: number;
  specialRequests?: string;
  status: ReservationStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Generate mock reservation data
export const mockReservations: Reservation[] = [
  {
    reservationId: 'RES-2023-1001',
    customerName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+923001234567',
    dateTime: '2023-11-15T19:00:00Z',
    partySize: 4,
    specialRequests: 'Window table if possible',
    status: 'confirmed',
    notes: 'Regular customer, prefers the corner table near the window',
    createdAt: '2023-11-01T10:30:00Z',
    updatedAt: '2023-11-01T14:45:00Z'
  },
  {
    reservationId: 'RES-2023-1002',
    customerName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+923002345678',
    dateTime: '2023-11-15T20:00:00Z',
    partySize: 2,
    specialRequests: 'Celebrating anniversary',
    status: 'confirmed',
    notes: 'Mentioned it\'s their 5th anniversary, prepare a special dessert',
    createdAt: '2023-11-02T09:15:00Z',
    updatedAt: '2023-11-02T09:15:00Z'
  },
  {
    reservationId: 'RES-2023-1003',
    customerName: 'Michael Wong',
    email: 'michael.w@example.com',
    phone: '+923003456789',
    dateTime: '2023-11-16T18:30:00Z',
    partySize: 6,
    specialRequests: 'Need high chair for toddler',
    status: 'pending',
    createdAt: '2023-11-03T16:20:00Z',
    updatedAt: '2023-11-03T16:20:00Z'
  },
  {
    reservationId: 'RES-2023-1004',
    customerName: 'Emily Davis',
    email: 'emily.d@example.com',
    phone: '+923004567890',
    dateTime: '2023-11-17T19:30:00Z',
    partySize: 3,
    status: 'cancelled',
    notes: 'Customer called to cancel due to illness',
    createdAt: '2023-11-04T11:45:00Z',
    updatedAt: '2023-11-06T14:30:00Z'
  },
  {
    reservationId: 'RES-2023-1005',
    customerName: 'Ali Hassan',
    email: 'ali.h@example.com',
    phone: '+923005678901',
    dateTime: '2023-11-18T20:15:00Z',
    partySize: 8,
    specialRequests: 'Business dinner, need private area',
    status: 'confirmed',
    notes: 'Corporate client, ensure the private dining room is prepared',
    createdAt: '2023-11-05T10:00:00Z',
    updatedAt: '2023-11-05T15:20:00Z'
  },
  {
    reservationId: 'RES-2023-1006',
    customerName: 'Fatima Khan',
    email: 'fatima.k@example.com',
    phone: '+923006789012',
    dateTime: '2023-11-14T18:00:00Z',
    partySize: 4,
    status: 'completed',
    notes: 'Enjoyed the meal, left positive feedback',
    createdAt: '2023-11-06T09:30:00Z',
    updatedAt: '2023-11-14T22:10:00Z'
  },
  {
    reservationId: 'RES-2023-1007',
    customerName: 'David Wilson',
    email: 'david.w@example.com',
    phone: '+923007890123',
    dateTime: '2023-11-19T19:00:00Z',
    partySize: 2,
    specialRequests: 'Gluten-free menu options',
    status: 'confirmed',
    createdAt: '2023-11-07T13:15:00Z',
    updatedAt: '2023-11-07T13:15:00Z'
  },
  {
    reservationId: 'RES-2023-1008',
    customerName: 'Maria Garcia',
    email: 'maria.g@example.com',
    phone: '+923008901234',
    dateTime: '2023-11-20T18:45:00Z',
    partySize: 5,
    specialRequests: 'Birthday celebration',
    status: 'pending',
    notes: 'Will bring their own cake, need space for that',
    createdAt: '2023-11-08T14:40:00Z',
    updatedAt: '2023-11-08T14:40:00Z'
  },
  {
    reservationId: 'RES-2023-1009',
    customerName: 'Ahmed Raza',
    email: 'ahmed.r@example.com',
    phone: '+923009012345',
    dateTime: '2023-11-13T19:15:00Z',
    partySize: 3,
    status: 'completed',
    createdAt: '2023-11-09T10:20:00Z',
    updatedAt: '2023-11-13T22:30:00Z'
  },
  {
    reservationId: 'RES-2023-1010',
    customerName: 'Jessica Brown',
    email: 'jessica.b@example.com',
    phone: '+923000123456',
    dateTime: '2023-11-21T20:30:00Z',
    partySize: 6,
    specialRequests: 'Vegetarian options for 3 guests',
    status: 'confirmed',
    createdAt: '2023-11-10T11:05:00Z',
    updatedAt: '2023-11-10T16:45:00Z'
  },
  {
    reservationId: 'RES-2023-1011',
    customerName: 'Zainab Malik',
    email: 'zainab.m@example.com',
    phone: '+923001112233',
    dateTime: '2023-11-22T19:00:00Z',
    partySize: 4,
    status: 'pending',
    createdAt: '2023-11-11T09:50:00Z',
    updatedAt: '2023-11-11T09:50:00Z'
  },
  {
    reservationId: 'RES-2023-1012',
    customerName: 'Robert Chen',
    email: 'robert.c@example.com',
    phone: '+923002223344',
    dateTime: '2023-11-12T18:30:00Z',
    partySize: 2,
    status: 'completed',
    notes: 'First-time customers, enjoyed the seafood platter',
    createdAt: '2023-11-12T13:25:00Z',
    updatedAt: '2023-11-12T22:15:00Z'
  },
  {
    reservationId: 'RES-2023-1013',
    customerName: 'Sophia Lee',
    email: 'sophia.l@example.com',
    phone: '+923003334455',
    dateTime: '2023-11-23T19:30:00Z',
    partySize: 7,
    specialRequests: 'Family gathering, need space for stroller',
    status: 'confirmed',
    createdAt: '2023-11-13T10:40:00Z',
    updatedAt: '2023-11-13T10:40:00Z'
  },
  {
    reservationId: 'RES-2023-1014',
    customerName: 'Omar Sheikh',
    email: 'omar.s@example.com',
    phone: '+923004445566',
    dateTime: '2023-11-24T20:00:00Z',
    partySize: 5,
    status: 'cancelled',
    notes: 'Cancelled due to change of plans',
    createdAt: '2023-11-14T15:10:00Z',
    updatedAt: '2023-11-15T09:30:00Z'
  },
  {
    reservationId: 'RES-2023-1015',
    customerName: 'Daniel Park',
    email: 'daniel.p@example.com',
    phone: '+923005556677',
    dateTime: '2023-11-25T19:15:00Z',
    partySize: 2,
    specialRequests: 'Prefer quiet seating area',
    status: 'confirmed',
    createdAt: '2023-11-15T11:30:00Z',
    updatedAt: '2023-11-15T11:30:00Z'
  }
];

// Utility functions
export const getReservationsByStatus = (status?: ReservationStatus) => {
  if (!status) return mockReservations;
  return mockReservations.filter(reservation => reservation.status === status);
};

export const getReservationById = (id: string) => {
  return mockReservations.find(reservation => reservation.reservationId === id);
};

export const getReservationStats = () => {
  const today = new Date().toISOString().split('T')[0];
  const upcoming = mockReservations.filter(r => r.dateTime >= today && r.status !== 'cancelled').length;
  const confirmed = mockReservations.filter(r => r.status === 'confirmed').length;
  const pending = mockReservations.filter(r => r.status === 'pending').length;
  const canceled = mockReservations.filter(r => r.status === 'cancelled').length;
  
  return { upcoming, confirmed, pending, canceled, total: mockReservations.length };
}; 