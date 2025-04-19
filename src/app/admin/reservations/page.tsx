import type { Metadata } from 'next';
import ReservationsClient from './ReservationsClient';

export const metadata: Metadata = {
  title: 'Reservations | Admin Dashboard | Café Ammos',
  description: 'Manage all reservations for Café Ammos',
};

export default function ReservationsPage() {
  return <ReservationsClient />;
} 