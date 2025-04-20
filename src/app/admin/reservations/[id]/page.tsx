import React from 'react';
import ReservationDetailClient from './ReservationDetailClient';
import { Metadata } from 'next';

// For dynamic route with [id] parameter
interface Params {
  id: string;
}

interface PageProps {
  params?: Promise<Params>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
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

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function ReservationDetailPage({ params }: ResolvedProps): React.ReactNode {
/* eslint-enable @typescript-eslint/no-unused-vars */
  return <ReservationDetailClient id={params.id} />;
} 