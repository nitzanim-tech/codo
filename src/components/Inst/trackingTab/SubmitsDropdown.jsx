import { useState, useEffect, useRef } from 'react';
import DonutChart from '../Chart';
import ReactDOM from 'react-dom';

const HasReview = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <path d="M0.4 0.53 L0.47 0.6 L0.62 0.45" stroke={color} strokeWidth=".05" fill="none" strokeLinecap="round" />
  </svg>
);

function SubmitsDropdown({ id, isOpen, setIsDropdownOpen, triggerContent, items }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  console.log(triggerContent.conflict);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container') && !event.target.closest('.dropdown-content') && isOpen) {
        setIsDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsDropdownOpen]);

  const toggleDropdown = (event) => {
    if (event.button === 0) {
      setIsDropdownOpen(isOpen ? null : id);
    }
  };

  useEffect(() => {
    setIsAnimating(isOpen);
  }, [isOpen]);

  const dropdownContent = (
    <div
      className="dropdown-content"
      style={{
        position: 'absolute',
        top: dropdownRef.current?.getBoundingClientRect().bottom || '100%',
        left: dropdownRef.current?.getBoundingClientRect().left || 0,
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
      {items
        .sort((a, b) => new Date(a.time) - new Date(b.time))
        .map((item) => (
          <div
            key={item.id}
            onClick={() => window.open(item.link)}
            style={{
              display: 'grid',
              direction: 'rtl',
              gridTemplateColumns: '25% 35% 40%',
              alignItems: 'center',
              margin: '0.1em',
              cursor: 'pointer',
              background: item.reviewed ? 'rgba(0, 0, 255, 0.1)' : null,
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
              {item.reviewed && <HasReview color={'black'} size={'3em'} />}
            </div>
            <div>
              <div style={{ fontSize: '0.9em', fontWeight: 'bold' }}>
                {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div style={{ fontSize: '0.8em', color: 'gray', marginTop: '-5px' }}>
                {new Date(item.time).toLocaleDateString()}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <DonutChart percentage={item.score * 100} size={40} textSize={10} />
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="dropdown-container" style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      {triggerContent.reviewed && (
        <div style={{ position: 'absolute', top: '-0.8em', left: '-0.8em' }}>
          <HasReview color={'rgba(255, 255, 255, 0.8)'} size={'3em'} />
        </div>
      )}
      {triggerContent.conflict && (
        <div
          style={{
            position: 'absolute',
            top: '1em',
            left: '1em',
            backgroundColor: 'rgba(44, 36, 77, 0.9)',
            width: '0.5em',
            height: '0.5em',
            borderRadius: '50%',
          }}
        ></div>
      )}

      <div
        onClick={toggleDropdown}
        style={{
          width: '1.5em',
          height: '1.5em',
          borderRadius: '50%',
          backgroundColor: triggerContent.backgroundColor,
          display: 'inline-block',
          cursor: 'pointer',
        }}
        title={triggerContent.tooltip}
      />
      {isOpen && ReactDOM.createPortal(dropdownContent, document.body)}
    </div>
  );
}

export default SubmitsDropdown;
