import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode
} from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../api/api';

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setUser(localStorage.getItem('user'));
    }
  }, []);

  const login = async (username: string, password: string) => {
    const response = await api.post('/users/login', { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
    setAuthToken(token);
    setUser(username);
    navigate('/tasks');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    setUser(null);
    navigate('/login');
  };

  const register = async (username: string, password: string) => {
    await api.post('/users/register', { username, password });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
