import { Metadata } from 'next';

// Type definition matching Next.js expectations
type SegmentParams = Record<string, string | string[]>;

/* eslint-disable @typescript-eslint/no-unused-vars */
interface Props {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Admin Dashboard | Café Ammos',
    description: 'Admin dashboard for Café Ammos restaurant management.',
  };
}; 