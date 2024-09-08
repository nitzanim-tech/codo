import React, { useState } from 'react';
import './Sidebar.css'; // Add this to style the sidebar
import { Button } from '@nextui-org/react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <Button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '❌' : '☰'}
      </Button>
      {isOpen && (
        <ul className="sidebar-list">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
