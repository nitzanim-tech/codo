import React, { useState, useEffect } from 'react';
import { Card } from '@nextui-org/react';

const COLORS = {
  purple: { fill: '#bb4ded', outline: '#560bad' },
  green: { fill: '#80ed99', outline: '#57cc99' },
  red: { fill: '#ff5a5f', outline: '#c81d25' },
};

const SetCard = React.memo(({ number, shape, color, shading, clickedCards, setClickedCards, index }) => {
  const [paramsKey, setParamsKey] = useState('');

  useEffect(() => {
    // Update the key whenever any of the parameters change
    setParamsKey(`${number}-${shape}-${color}-${shading}-${index}`);
  }, [number, shape, color, shading, index]);

  const shapes = [];

  for (let i = 0; i < number; i++) {
    switch (shape) {
      case 'squiggle':
        shapes.push(<Squiggle key={i} color={color} shading={shading} />);
        break;
      case 'diamond':
        shapes.push(<Diamond key={i} color={color} shading={shading} />);
        break;
      case 'oval':
        shapes.push(<Oval key={i} color={color} shading={shading} />);
        break;
      default:
        break;
    }
  }

  const setClicked = (index) => {
    if (!clickedCards.includes(index)) {
      if (clickedCards.length === 3) setClickedCards([index]);
      else setClickedCards([...clickedCards, index]);
    } else {
      // setClickedCards(clickedCards.filter((cardIndex) => cardIndex !== index));
    }
  };

  return (
    <>
      <Card
        key={paramsKey}
        className="scale-in-hor-center"
        shadow="sm"
        style={{
          width: '100px',
          height: '150px',
          boxShadow: clickedCards.includes(index) && `0px 0px 20px 5px ${color}`,
        }}
        isPressable
        onPress={() => setClicked(index)}
      >
        <div style={{ justifyContent: 'center' }}>{shapes}</div>
      </Card>
    </>
  );
});

export default SetCard;

const getFill = (shading, color) => {
  switch (shading) {
    case 'solid':
      return color;
    case 'striped':
      return `url(#pattern-${color})`;
    case 'open':
      return 'none';
    default:
      return 'none';
  }
};

const StripedPattern = ({ color }) => {
  return (
    <pattern
      id={`pattern-${color}`}
      x="0"
      y="0"
      width="25"
      height="25"
      patternUnits="userSpaceOnUse"
      viewBox="0 0 100 100"
    >
      <rect x="0" y="0" width="50" height="100" style={{ fill: color }} />
    </pattern>
  );
};

const Squiggle = ({ color, shading }) => {
  return (
    <div>
      <svg
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlnsBx="https://boxy-svg.com"
        style={{ height: '80px', marginBottom: '-50px', marginLeft: '-5px' }}
      >
        <defs>
          <StripedPattern color={COLORS[color].fill} />
        </defs>

        <path
          style={{
            strokeWidth: '10px',
            stroke: COLORS[color].outline,
            fill: getFill(shading, COLORS[color].fill),
            fillRule: 'nonzero',
          }}
          d="M 37.071 242.8 C 37.071 242.8 34.29813633877161 218.60978287191912 41.36 206.036 C 53.55840503386975 184.31650729417166 93.20410015102681 144.5005765645228 128.371 138.021 C 170.99253841402793 130.1678903247806 241.32405143263597 192.73736400043686 283.395 185.815 C 316.5096368392593 180.3663096863841 340.55825446475734 133.2591532804265 364.889 126.992 C 381.2916314206994 122.76698333674314 399.14628418028906 123.49864650936338 410.233 132.506 C 424.0095961685796 143.698734945684 436.5805096604715 179.07449403765358 432.904 199.295 C 429.227493056593 219.51549101871083 408.94877447695444 240.45309468372827 388.174 253.829 C 362.56663270035955 270.3163857369158 319.65618419020063 281.5907129566405 284.62 281.403 C 248.40885555225628 281.20899197245 208.00151461295525 248.0722373817512 174.326 250.765 C 144.2961674877439 253.1662464649959 115.44698934130321 291.990538092452 91.606 288.756 C 70.50351106289807 285.89299782607793 37.071 242.8 37.071 242.8 C 37.071 242.79999999999998 37.07099999999999 242.79999999999998 37.071 242.8"
          transform="matrix(1, 0, 0, 1, 7.105427357601002e-15, 7.105427357601002e-15)"
        />
      </svg>
    </div>
  );
};

const Diamond = ({ color, shading }) => {
  return (
    <div>
      <svg
        viewBox="0 0 500 500"
        width="500"
        height="500"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ height: '160Px', marginBottom: '-125px', marginLeft: '-208px', marginTop: '-10px' }}
      >
        <defs>
          <StripedPattern color={COLORS[color].fill} />
        </defs>
        <polygon
          style={{
            strokeWidth: '5px',
            stroke: COLORS[color].outline,
            fill: getFill(shading, COLORS[color].fill),
            fillRule: 'nonzero',
          }}
          points="210 80  320 120  210 160  100 120"
        />
      </svg>
    </div>
  );
};

const Oval = ({ color, shading }) => {
  return (
    <div>
      <svg
        viewBox="0 0 500 500"
        width="500"
        height="500"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ height: '140px', marginBottom: '-100px', marginLeft: '-211px', marginTop: '-8px' }}
      >
        <defs>
          <StripedPattern color={COLORS[color].fill} />
        </defs>

        <path
          style={{
            strokeWidth: '5px',
            stroke: COLORS[color].outline,
            fill: getFill(shading, COLORS[color].fill),
            fillRule: 'nonzero',
          }}
          d="M 142.95 71.637 H 299.483 A 47.542 47.542 0 0 1 347.025 119.179 V 119.179 A 47.542 47.542 0 0 1 299.483 166.721 H 142.95 A 47.542 47.542 0 0 1 95.408 119.179 V 119.179 A 47.542 47.542 0 0 1 142.95 71.637 Z M 221.2165 119.179 V 119.179 H 221.2165 V 119.179 H 221.2165 Z"
        />
      </svg>
    </div>
  );
};
