import React from 'react';
import ReservationDetailClient from './ReservationDetailClient';
import { Metadata } from 'next';

// For dynamic route with [id] parameter
interface Params {
  id: string;
}

// For the actual component, Next.js resolves the promise
interface ResolvedProps {
  params: Params;
}

export const generateMetadata = async ({ params }: ResolvedProps): Promise<Metadata> => {
  return {
    title: `Reservation ${params.id} | Admin Dashboard | Café Ammos`,
    description: 'View and manage individual reservation details at Café Ammos.',
  };
};

export default function ReservationDetailPage({ params }: ResolvedProps): React.ReactNode {
  return <ReservationDetailClient id={params.id} />;
} 