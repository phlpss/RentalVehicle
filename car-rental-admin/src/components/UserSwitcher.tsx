import { useState } from 'react';
import { User } from '../types';
import './UserSwitcher.css';

interface UserSwitcherProps {
  currentUser: User;
  onUserChange: (user: User) => void;
}

const UserSwitcher = ({ currentUser, onUserChange }: UserSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const userOptions: User[] = [
    {
      id: '1',
      username: 'Worker 1',
      role: 'WORKER'
    },
    {
      id: '2',
      username: 'Worker 2',
      role: 'WORKER'
    },
    {
      id: '3',
      username: 'Admin',
      role: 'ADMIN'
    }
  ];

  const handleUserSelect = (user: User) => {
    onUserChange(user);
    setIsOpen(false);
  };

  return (
    <div className="user-switcher">
      <div className="user-switcher-current" onClick={() => setIsOpen(!isOpen)}>
        <span className="user-icon">👤</span>
        <span>{currentUser.username}</span>
        <span className="dropdown-icon">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <ul className="user-switcher-options">
          {userOptions.map(user => (
            <li 
              key={user.id} 
              className={user.id === currentUser.id ? 'active' : ''}
              onClick={() => handleUserSelect(user)}
            >
              <span className="user-role">{user.role}</span>
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSwitcher; 