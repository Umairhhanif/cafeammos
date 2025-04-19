'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function AdminLoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, user } = useAuth();

  useEffect(() => {
    // Force dark mode on login page
    document.documentElement.classList.add('dark');
    
    // If user is already logged in, redirect to dashboard
    if (user) {
      router.push('/admin/dashboard');
    }
    
    return () => {
      // Don't remove dark mode class here since the admin layout will handle it
    };
  }, [user, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Use replace instead of push to avoid back-button issues
        router.replace('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('admin@cafeammos.com');
    setPassword('cafeadmin123');
    setIsLoading(true);
    
    // Slight delay to show the filled fields before submitting
    setTimeout(() => {
      login('admin@cafeammos.com', 'cafeadmin123')
        .then(success => {
          if (success) {
            // Use replace instead of push to avoid back-button issues
            router.replace('/admin/dashboard');
          } else {
            setError('Demo login failed. Please try again.');
          }
          setIsLoading(false);
        })
        .catch(err => {
          setError('Something went wrong. Please try again later.');
          console.error(err);
          setIsLoading(false);
        });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-primary-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-900/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary-800/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center">
            <span className="font-display text-3xl text-primary-400">Café Ammos</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Admin Dashboard
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Please sign in to access the administration area
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-primary-900/70 backdrop-blur-md py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-primary-800/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 mb-3 text-sm text-red-300 bg-red-900/40 rounded-lg border border-red-700/50" role="alert">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 border border-primary-700 rounded-md shadow-sm placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 bg-primary-950/50 text-gray-100"
                  placeholder="admin@cafeammos.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-primary-700 rounded-md shadow-sm placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 bg-primary-950/50 text-gray-100"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary-800/70"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-primary-900/70 text-gray-400">
                  Or try the demo
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleDemoLogin}
                className="w-full flex justify-center py-2 px-4 border border-primary-700/50 rounded-md shadow-sm text-sm font-medium text-primary-300 bg-primary-800/40 hover:bg-primary-800/60 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
              >
                Use Demo Credentials
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200">
              ← Return to Website
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-4 text-xs text-gray-400">
          <p>Demo credentials: admin@cafeammos.com / cafeadmin123</p>
        </div>
      </div>
    </div>
  );
} 