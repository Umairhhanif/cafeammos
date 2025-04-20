import React from 'react';
import NewReservationClient from './NewReservationClient';
import { Metadata } from 'next';

// Type definition matching Next.js expectations
type SegmentParams = Record<string, string | string[]>;

/* eslint-disable @typescript-eslint/no-unused-vars */
interface Props {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'New Reservation | Admin Dashboard | Café Ammos',
    description: 'Create a new reservation in the admin dashboard',
  };
};

export default function NewReservationPage(props: Props): React.ReactNode {
/* eslint-enable @typescript-eslint/no-unused-vars */
  return <NewReservationClient />;
} 