import React from 'react';
import NewReservationClient from './NewReservationClient';
import { Metadata } from 'next';

// Props interface required by Next.js App Router for proper type checking
// even though we're not using it directly in this component
/* eslint-disable @typescript-eslint/no-unused-vars */
type Props = {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined };
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