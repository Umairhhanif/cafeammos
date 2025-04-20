'use client';

import React, { Suspense } from 'react';
import DashboardClient from './DashboardClient';

// Type definition matching Next.js expectations
type SegmentParams = Record<string, string | string[]>;

/* eslint-disable @typescript-eslint/no-unused-vars */
interface Props {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default function DashboardPage(props: Props): React.ReactNode {
/* eslint-enable @typescript-eslint/no-unused-vars */
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary-50 dark:bg-primary-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    }>
      <ErrorBoundary>
        <DashboardClient />
      </ErrorBoundary>
    </Suspense>
  );
}

// Simple error boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Dashboard error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary-600 dark:bg-red-950 p-8 flex items-center justify-center">
          <div className="max-w-md w-full bg-primary-50 dark:bg-primary-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">The dashboard encountered an error.</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-auto mb-4 max-h-40">
              {this.state.error?.message || 'Unknown error'}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 