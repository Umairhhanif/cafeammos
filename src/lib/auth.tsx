import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

// Admin credentials - in a real app, these would be stored in a database with hashed passwords
const ADMIN_CREDENTIALS = {
  email: 'admin@cafeammos.com',
  password: 'cafeadmin123',
};

export interface User {
  email: string;
  name: string;
  role: 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('cafeAmmos_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('cafeAmmos_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = {
        email: ADMIN_CREDENTIALS.email,
        name: 'Admin User',
        role: 'admin',
      };
      
      setUser(adminUser);
      localStorage.setItem('cafeAmmos_user', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cafeAmmos_user');
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Authentication guard for protected routes
export const withAuth = (Component: React.ComponentType) => {
  const AuthGuard = (props: any) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push('/admin/login');
      }
    }, [isLoading, user, router]);

    // Show loading state or nothing while checking auth status
    if (isLoading || !user) {
      return null;
    }

    return <Component {...props} />;
  };

  return AuthGuard;
}; 