const CustomScrollbar = ({ children }) => {
  const customScrollbarStyle = {
    direction: 'rtl',
    width: '100%',
    overflowX: 'auto',
    scrollbarColor: '#616099; gray',
  };

  return (
    <div style={customScrollbarStyle}>
      {children}
      <style>
        {`
          /* WebKit (Chrome, Safari) Scrollbar Styles */
          div::-webkit-scrollbar {
            width: 10px;
          }

          div::-webkit-scrollbar-track {
            box-shadow: inset 0 0 1px grey;
            border-radius: 10px;
          }

          div::-webkit-scrollbar-thumb {
            background: #616099;;
            border-radius: 10px;
          }

          div::-webkit-scrollbar-thumb:hover {
            background: #2C244D;
          }
        `}
      </style>
    </div>
  );
};

export default CustomScrollbar;
