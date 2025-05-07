import { useState } from 'react';
import type { ClientUser } from '../types/ClientUser';
import './ClientUserSwitcher.css';

interface ClientUserSwitcherProps {
  currentUser: ClientUser;
  onUserChange: (user: ClientUser) => void;
}

const ClientUserSwitcher = ({ currentUser, onUserChange }: ClientUserSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Define users from the provided SQL data
  const userOptions: ClientUser[] = [
    {
      id: '4c0e6a0a-dfd1-404c-88d1-1e9c9cc77885',
      name: 'Daryna Bondar',
      contactNumber: '+380987654324',
      email: 'daryna@email.com'
    },
    {
      id: '77b70ebe-835a-4897-bfa2-ed3618032784',
      name: 'Ivan Kravets',
      contactNumber: '+380987654325',
      email: 'ivan@email.com'
    },
    {
      id: 'a0ad38ea-88bf-4020-84f1-55d06372ab7e',
      name: 'Nadiia Melnyk',
      contactNumber: '+380987654326',
      email: 'nadiia@email.com'
    },
    {
      id: 'a7ae17bb-c999-4806-9c56-991621206fc0',
      name: 'Olena Yaremchuk',
      contactNumber: '+380987654327',
      email: 'olena@email.com'
    },
    {
      id: '7dd15947-58b0-47c6-b158-59d003ddfbc2',
      name: 'Roman Shulha',
      contactNumber: '+380987654328',
      email: 'roman@email.com'
    },
    {
      id: 'ac42fc40-d33c-45c3-a410-c22978b8e29d',
      name: 'Andrii Zabolotnyi',
      contactNumber: '+380987654329',
      email: 'andrii@email.com'
    }
  ];

  const handleUserSelect = (user: ClientUser) => {
    onUserChange(user);
    setIsOpen(false);
  };

  return (
    <div className="client-user-switcher">
      <div className="user-switcher-current" onClick={() => setIsOpen(!isOpen)}>
        <span className="user-icon">👤</span>
        <span>{currentUser.name}</span>
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
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientUserSwitcher; 