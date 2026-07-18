import { createContext, useState, useEffect, useContext } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Admin', email: 'admin@zoho.com', role: 'Administrator' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setUser({ name: 'Admin', email: 'admin@zoho.com', role: 'Administrator' });
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    if (email === 'admin@zoho.com' && password === 'admin123') {
      localStorage.setItem('token', 'mock-token-12345');
      setUser({ name: 'Admin', email: 'admin@zoho.com', role: 'Administrator' });
      return true;
    }
    throw new Error('Invalid credentials. Use admin@zoho.com and admin123');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
