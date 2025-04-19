'use client';

import React, { useEffect } from 'react';
import { AuthProvider } from '@/lib/auth';
import { ThemeProvider } from '@/lib/ThemeContext';
import Script from 'next/script';

const AdminLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Force dark mode on all admin pages
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    
    return () => {
      // Clean up when unmounting
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    };
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        {/* Script to prevent dark mode flickering */}
        <Script id="prevent-dark-mode-flicker" strategy="beforeInteractive">
          {`
            (function() {
              // Apply dark mode and temporarily disable transitions
              document.documentElement.classList.add('dark', 'transition-none');
              document.body.classList.add('dark', 'transition-none');
              
              // Remove the transition-none class after a small delay to re-enable transitions
              window.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                  document.documentElement.classList.remove('transition-none');
                  document.body.classList.remove('transition-none');
                }, 100);
              });
            })();
          `}
        </Script>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AdminLayout; 