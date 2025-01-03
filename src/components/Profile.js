import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { signOutUser } from '../utils/firebase';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="profile" ref={dropdownRef}>
      <div className="profile-avatar-container" onClick={() => setIsOpen(!isOpen)}>
        <img 
          src={user.photoURL || 'https://via.placeholder.com/32'} 
          alt="Profile" 
          className="profile-avatar"
        />
      </div>

      {isOpen && (
        <div className="profile-dropdown">
          <button onClick={signOutUser} className="dropdown-item">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile; 