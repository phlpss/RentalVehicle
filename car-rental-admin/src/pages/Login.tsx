import { useState } from 'react';
import { User } from '../types';
import './Login.css';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // TODO: Replace with actual API call
      // This is just a mock login for now
      if (username === 'worker' && password === 'worker') {
        onLogin({
          id: '1',
          username: 'worker',
          role: 'WORKER'
        });
      } else if (username === 'admin' && password === 'admin') {
        onLogin({
          id: '2',
          username: 'admin',
          role: 'ADMIN'
        });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Car Rental Admin</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 