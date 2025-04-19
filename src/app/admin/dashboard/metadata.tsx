import { Metadata } from 'next';

// Props interface required by Next.js App Router for proper type checking
// even though we're not using it directly in this specific file
/* eslint-disable @typescript-eslint/no-unused-vars */
type Props = {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Admin Dashboard | Café Ammos',
    description: 'Admin dashboard for Café Ammos restaurant management.',
  };
}; 