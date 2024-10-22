import React, { useState } from 'react';
import styled from 'styled-components';

export default function SubmitTabs({ chosenTab:chosen, setChosenTab:setChosen }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Tab text={'משוב'} icon={ReviewSvg} chosen={chosen} setChosen={setChosen} />
      <Tab text={'טסטים'} icon={TestsSvg} chosen={chosen} setChosen={setChosen} />
      <Tab text={'תרגול'} icon={PracticeSvg} chosen={chosen} setChosen={setChosen} />
    </div>
  );
}

const Tab = ({ text, icon: Icon, chosen, setChosen }) => {
  const isTabChosen = chosen === text;
  return (
    <StyledTab onClick={() => setChosen(text)}>
      {isTabChosen ? <ChosenTabSvg /> : <NonChosenTabSvg />}
      <TabContent>
        <Icon color={isTabChosen ? 'white' : 'rgba(44, 36, 77, 1)'} />
        <span style={{ color: isTabChosen ? 'white' : 'rgba(44, 36, 77, 1)' }}>{text}</span>
      </TabContent>
    </StyledTab>
  );
};

const StyledTab = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; 
`;

const TabContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;

  svg {
    margin-bottom: 5px;
  }
`;

const NonChosenTabSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="90" viewBox="0 0 109 114" fill="none">
    <g filter="url(#filter0_d_208_4452)">
      <path
        d="M5 54.5C5 26.6096 27.6096 4 55.5 4C83.3904 4 106 26.6096 106 54.5V110H5V54.5Z"
        fill="#423768"
        fill-opacity="0.2"
        shape-rendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_208_4452"
        x="0"
        y="0"
        width="109"
        height="114"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-1" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_208_4452" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_208_4452" result="shape" />
      </filter>
    </defs>
  </svg>
);

const ChosenTabSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="90" viewBox="0 0 109 114" fill="none">
    <g filter="url(#filter0_d_208_4451)">
      <path
        d="M8 54.5C8 26.6096 30.6096 4 58.5 4C86.3904 4 109 26.6096 109 54.5V110H8V54.5Z"
        fill="#423768"
        fillOpacity="0.9"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_208_4451"
        x="0"
        y="0"
        width="109"
        height="114"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_208_4451" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_208_4451" result="shape" />
      </filter>
    </defs>
  </svg>
);

const PracticeSvg = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30"  viewBox="0 0 41 38" fill="none">
    <path
      d="M14.4904 28.0267C15.3843 28.0267 16.137 27.274 16.137 26.3801C16.137 25.4862 15.3843 24.7335 14.4904 24.7335C13.5965 24.7335 12.8438 25.4862 12.8438 26.3801C12.8438 27.274 13.5965 28.0267 14.4904 28.0267Z"
      fill={color}
    />
    <path
      d="M37.9668 33.3423H37.0729V26.8027C37.0729 21.8629 33.4502 17.6286 28.5574 16.8758C32.7916 14.1 33.9678 8.36037 31.192 4.12617C28.4163 -0.108035 22.6295 -1.28418 18.3953 1.53859C14.1611 4.36136 12.9379 10.0541 15.7607 14.2883C16.4663 15.3233 17.3132 16.2171 18.3953 16.9229C17.4073 17.0641 16.4664 17.3463 15.5725 17.7697H4.09303C2.77571 17.7697 1.69368 18.8988 1.83476 20.2632L2.96385 32.6836C3.0109 32.9188 3.05796 33.154 3.15208 33.3422H2.30533C1.03507 33.3893 0 34.4244 0 35.6947C0.0470575 36.9649 1.03507 37.9529 2.30533 38H37.9198C39.1901 37.9529 40.2251 36.918 40.2251 35.6476C40.2251 34.3773 39.19 33.3423 37.9668 33.3423ZM35.4262 26.8027V33.2952H32.133C32.2271 33.06 32.3212 32.8247 32.3682 32.5425L32.6504 30.8959C32.7445 30.3783 32.3211 29.9549 31.8506 29.9549H26.7225L25.7816 19.7928C25.7345 19.2282 25.4523 18.7108 25.123 18.3814H27.0049C31.6625 18.4284 35.3792 22.1922 35.4262 26.8027ZM30.8157 31.6486L30.7216 32.3072C30.6274 32.8718 30.1099 33.2952 29.5454 33.2952H27.0519L26.9108 31.6486H30.8157ZM15.9018 9.25427C15.9018 5.06713 19.2422 1.67976 23.4293 1.67976C27.6164 1.67976 31.0038 5.02007 31.0038 9.20722C31.0038 13.3944 27.6635 16.7817 23.4764 16.7817C23.4764 16.7817 23.4764 16.7817 23.4293 16.7817C19.2892 16.7818 15.9018 13.4415 15.9018 9.25427ZM4.09303 19.4165H23.5234C23.8527 19.4165 24.088 19.6516 24.1351 19.9811L25.3583 33.3424H5.55152C5.08105 33.3424 4.65763 32.966 4.61057 32.4955L3.48148 20.0751C3.43442 19.6987 3.81078 19.4165 4.09303 19.4165ZM37.9668 36.3533H2.30533C1.92897 36.3533 1.64672 36.024 1.64672 35.6476C1.64672 35.2712 1.92897 34.989 2.30533 34.989H37.9198C38.2962 34.989 38.5784 35.3183 38.5784 35.6947C38.5784 36.024 38.2962 36.3062 37.9668 36.3533Z"
      fill={color}
    />
  </svg>
);

const ReviewSvg = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30"  viewBox="0 0 34 32" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M33.294 12.2464C33.2939 5.48292 27.8111 0 21.0476 0C18.1838 0 15.1102 0 12.2464 0C8.99848 0 5.88353 1.29024 3.58691 3.58691C1.29024 5.88359 0 8.99849 0 12.2464V16.8033C0 20.0512 1.29024 23.1661 3.58691 25.4628C5.88353 27.7594 8.99848 29.0497 12.2464 29.0497H27.401C27.4764 29.0497 27.5488 29.0796 27.6022 29.1328L29.8923 31.4176C30.4629 31.9869 31.32 32.1566 32.0644 31.8477C32.8088 31.5388 33.294 30.8122 33.294 30.0063C33.294 26.0805 33.294 18.6316 33.294 12.2464ZM31.5851 12.2464V30.0063C31.5851 30.1214 31.5158 30.2253 31.4095 30.2694C31.3032 30.3135 31.1808 30.2892 31.0992 30.2079C31.0992 30.2079 28.8091 27.9231 28.8091 27.9231C28.4354 27.5503 27.929 27.3409 27.401 27.3409C25.5519 27.3409 18.5808 27.3409 12.2464 27.3409C9.45167 27.3409 6.77138 26.2306 4.79521 24.2545C2.81905 22.2783 1.70879 19.598 1.70879 16.8033C1.70879 15.297 1.70879 13.7527 1.70879 12.2464C1.70879 9.45167 2.81905 6.77138 4.79521 4.79521C6.77138 2.81905 9.45167 1.70879 12.2464 1.70879H21.0476C26.8673 1.70879 31.5851 6.42664 31.5851 12.2464ZM10.1822 20.2194H22.7992C23.2708 20.2194 23.6537 19.8365 23.6537 19.365C23.6537 18.8934 23.2708 18.5106 22.7992 18.5106H10.1822C9.71067 18.5106 9.32781 18.8934 9.32781 19.365C9.32781 19.8365 9.71067 20.2194 10.1822 20.2194ZM10.1822 15.3147H22.7992C23.2708 15.3147 23.6537 14.9319 23.6537 14.4603C23.6537 13.9887 23.2708 13.6059 22.7992 13.6059H10.1822C9.71067 13.6059 9.32781 13.9887 9.32781 14.4603C9.32781 14.9319 9.71067 15.3147 10.1822 15.3147ZM10.1822 10.41H22.7992C23.2708 10.41 23.6537 10.0272 23.6537 9.55561C23.6537 9.08404 23.2708 8.70125 22.7992 8.70125H10.1822C9.71067 8.70125 9.32781 9.08404 9.32781 9.55561C9.32781 10.0272 9.71067 10.41 10.1822 10.41Z"
      fill={color}
    />
  </svg>
);

const TestsSvg = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" viewBox="0 0 30 34" fill="none">
    <path d="M11.9456 3.19168H29.0002H11.9456Z" fill={color} />
    <path d="M11.9456 3.19168H29.0002" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11.9456 16.3898H29.0002H11.9456Z" fill={color} />
    <path d="M11.9456 16.3898H29.0002" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M1 4.76508L2.73091 6.44028L7.41454 1.8208"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1 16.8976L2.73091 18.5728L7.41454 13.9025"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M11.9456 29.0809H29.0002H11.9456Z" fill={color} />
    <path d="M11.9456 29.0809H29.0002" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M1 30.6039L2.73091 32.3298L7.41454 27.6596"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
