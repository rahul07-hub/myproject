import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Login failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="sidebar-logo" style={{ width: '48px', height: '48px', margin: '0 auto 16px', fontSize: '24px' }}>Z</div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Welcome back</h1>
          <p className="text-muted">Enter your credentials to access your account.</p>
        </div>

        {error && (
          <div className="status-badge absent" style={{ width: '100%', padding: '12px', marginBottom: '20px', justifyContent: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group full-width">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} className="input-icon text-muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@zoho.com"
                style={{ paddingLeft: '36px' }}
                required 
              />
            </div>
          </div>
          
          <div className="form-group full-width">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} className="input-icon text-muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingLeft: '36px' }}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn full-width" disabled={isLoading} style={{ marginTop: '16px' }}>
            {isLoading ? 'Signing in...' : <><LogIn size={16} /> Sign In</>}
          </button>
        </form>

        <p className="text-muted" style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem' }}>
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
