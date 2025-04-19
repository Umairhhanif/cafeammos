import React from 'react';
import ReservationDetailClient from './ReservationDetailClient';
import { Metadata } from 'next';

type Params = {
  id: string;
}

type Props = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  return {
    title: `Reservation ${params.id} | Admin Dashboard | Café Ammos`,
    description: 'View and manage individual reservation details at Café Ammos.',
  };
};

export default function ReservationDetailPage({ params }: Props) {
  return <ReservationDetailClient id={params.id} />;
} 