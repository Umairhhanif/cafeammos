import type { Metadata } from 'next';
import ReservationsClient from './ReservationsClient';

// Type definition matching Next.js expectations
type SegmentParams = Record<string, string | string[]>;

/* eslint-disable @typescript-eslint/no-unused-vars */
interface Props {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Reservations | Admin Dashboard | Café Ammos',
    description: 'Manage all reservations for Café Ammos',
  };
};

export default function ReservationsPage(props: Props): React.ReactNode {
/* eslint-enable @typescript-eslint/no-unused-vars */
  return <ReservationsClient />;
} 