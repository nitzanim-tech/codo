import { useEffect, useRef, useState } from 'react';

function SimpleDropdown({ isOpen, setIsDropdownOpen, triggerContent, items }) {
  const dropdownRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setIsAnimating(isOpen);
  }, [isOpen]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            padding: '0.5em',
            minWidth: '170px',
            opacity: isAnimating ? 1 : 0,
            transform: isAnimating ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              style={{
                padding: '0.5em',
                cursor: 'pointer',
                borderBottom: index !== items.length - 1 ? '1px solid #ccc' : 'none',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SimpleDropdown;
