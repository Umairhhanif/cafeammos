'use client';

import React, { useEffect } from 'react';
import { AuthProvider } from '@/lib/auth';
import { ThemeProvider } from '@/lib/ThemeContext';

const AdminLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Force dark mode on all admin pages
  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    return () => {
      // Clean up when unmounting
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AdminLayout; 