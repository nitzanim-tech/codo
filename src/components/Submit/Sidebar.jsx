import React, { useState } from 'react';
import './Sidebar.css'; 
import { Button, Divider } from '@nextui-org/react';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import CustomScrollbar from '../general/CustomScrollbar';
import { Loading } from '../general/Messages';
import { useParams } from 'react-router-dom';

/*
const unitData = {
  id: '95e017a52ea0',
  name: 'חזרה',
  index: 1,
  practiceGoalIndex: 6,
  files: [
    {
      id: '02b8e4f8432b',
      name: 'ברוכים הבאים לניצנים',
      type: 'ppt',
      link: 'https://1drv.ms/p/s!AhbjJ-PvNB7Dd513ZLFuzAOiqow?e=ETi23c',
      index: 2,
    },
    {
      id: '3c090b48e824',
      name: 'נספח התקנות',
      type: 'pdf',
      link: 'https://1drv.ms/b/s!AhbjJ-PvNB7Ddi1doErWmMGb7tw?e=njl3z4',
      index: 3,
    },
  ],
  tasks: [
    {
      id: 'bb627278cdef',
      name: 'הכנה 0 - שלום עולם',
      type: 'task',
      taskId: '7e9e4f50c46c', // make sure that it chnges to taskId inst of "link"
      index: 0, // update the indexes
      submission: true, // add submittion and reviews
      review: true,
      personal: false, // add personal
    },
    {
      id: 'a4033ff2c232',
      name: 'הכנה  1- אליס והמעלית',
      type: 'task',
      taskId: 'c3194b8af385',
      index: 1,
      submission: true,
      personal: false,
    },

    {
      id: '8c8c99f85663',
      index: 2, // update here too
      name: 'חימום - תנאים',
      type: 'main',
      taskId: '8e37e437f83e',
      submission: true,
      review: true,
      personal: true,
    },
    {
      id: 'feeeada33049',
      index: 3,
      name: 'מה הסיסמא?',
      type: 'main',
      taskId: '65d204aa39aa',
      submission: true,
      personal: true,
    },
    {
      id: '3e53a8596a96',
      index: 5,
      name: 'הוספה 1',
      type: 'drill',
      taskId: 'c664ba1217e3',
      submission: false,
      personal: true,
    },
    ,
    {
      id: '3e53a8596a96',
      index: 6,
      name: 'הוספה 2',
      type: 'drill',
      taskId: 'c664ba1217e3',
      submission: false,
      personal: true,
    },
    ,
    {
      id: '3e53a8596a96',
      index: 4,
      name: 'החבר הדמיוני',
      type: 'drill',
      taskId: 'c664ba1217e3',
      submission: false,
      personal: true,
    },
  ],
};
*/

const lastSubmittedTask = (tasks) => {
  return tasks
    .filter((task) => task.submission === true)
    .reduce(
      (maxTask, task) => {
        return task.index > maxTask.index ? task : maxTask;
      },
      { index: 0 },
    );
};

const Sidebar = ({ openUnit, setOpenUnit, unitData }) => {
  const { task: currentTask } = useParams() || '';

  const toggleSidebar = () => {
    setOpenUnit(!openUnit);
  };
  const progressPrecent = lastSubmittedTask(unitData.tasks).index / unitData.practiceGoalIndex;

  return (
    <div className="sidebar" >
      <div className={`sidebar ${openUnit ? 'open' : 'closed'}`}>
        <div
          onClick={toggleSidebar}
          style={{
            position: 'absolute',
            top: '50%',
            right: openUnit ? '300px' : '2px',
            transform: openUnit ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'right 0.5s ease, transform 0.5s ease',
          }}
        >
          <ArrowButtonIcon />
        </div>
        {openUnit &&
          (unitData ? (
            <>
              <div style={{ width: '100%', overflow: 'visible' }}>
                <div style={{ width: '100%', padding: '10% 10% 0 10% ' }}>
                  <h1 style={{ fontSize: '30px', textAlign: 'right', width: '100%', direction:'rtl' }}>{unitData.name}</h1>
                  <ProgressBar percent={progressPrecent} />
                  <Divider style={{ marginBottom: '20px' }} />
                </div>
                <CustomScrollbar>
                  <div style={{ width: '100%', height: '75vh', padding: '0 10% 0 10% ', overflow: 'visible' }}>
                    {unitData.files?.length > 0 && (
                      <>
                        <p style={{ textAlign: 'right', fontSize: '22px' }}>חומרי עזר</p>
                        <div className="sidebar-box">
                          {unitData.files
                            .sort((A, B) => A.index - B.index)
                            .map((file, index) => (
                              <React.Fragment key={file.id || index}>
                                <Divider />
                                <FileCard file={file} />
                              </React.Fragment>
                            ))}
                        </div>
                      </>
                    )}
                    <p style={{ textAlign: 'right', fontSize: '22px', marginTop: '20px' }}>תרגילים</p>
                    {unitData.tasks?.length > 0 &&
                      unitData.tasks
                        .sort((A, B) => A.index - B.index)
                        .map((task, index) => (
                          <TaskCard
                            key={task.id || index}
                            task={task}
                            index={index}
                            isCurrent={task.id == currentTask}
                          />
                        ))}
                  </div>
                </CustomScrollbar>
              </div>
            </>
          ) : (
            <Loading />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;

const TaskCard = ({ task, index, isCurrent }) => (
  <div style={{ position: 'relative', overflow: 'visible' }}>
    {!task.personal && <ClassTag />}
    {task.submission && <CompleteIcon />}
    <div
      className="sidebar-box"
      key={task.id || index}
      style={{
        cursor: 'pointer',
        boxShadow: isCurrent ? '0 0 8px 0.5px white' : 'none', 
      }}
      onClick={() => (window.location.href = `${task.id}`)}
    >
      {task.review && <ReviewIcon />}
      <p style={{ marginRight: '15px' }}>{task.name}</p>
    </div>
  </div>
);

const ClassTag = () => (
  <div
    style={{
      position: 'absolute',
      marginTop: '-20px',
      background: '#423768',
      borderRadius: '10px 10px 0 0',
      left: '67%',
      width: '30%',
      height: '20px',
    }}
  >
    <p style={{ fontSize: '11px', padding: '4px' }}>משימת כיתה</p>
  </div>
);

const CompleteIcon = () => (
  <div
    style={{
      position: 'absolute',
      left: '94%',
      top: '6px',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(58.67deg, #05C4FD 16.63%, #09D5CE 92%)',
      zIndex: '1900',
    }}
  >
    <CompleteSvg />
  </div>
);

const ReviewSvg = ({ color = 'white' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 36 32" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M33.294 12.2464C33.2939 5.48292 27.8111 0 21.0476 0C18.1838 0 15.1102 0 12.2464 0C8.99848 0 5.88353 1.29024 3.58691 3.58691C1.29024 5.88359 0 8.99849 0 12.2464V16.8033C0 20.0512 1.29024 23.1661 3.58691 25.4628C5.88353 27.7594 8.99848 29.0497 12.2464 29.0497H27.401C27.4764 29.0497 27.5488 29.0796 27.6022 29.1328L29.8923 31.4176C30.4629 31.9869 31.32 32.1566 32.0644 31.8477C32.8088 31.5388 33.294 30.8122 33.294 30.0063C33.294 26.0805 33.294 18.6316 33.294 12.2464ZM31.5851 12.2464V30.0063C31.5851 30.1214 31.5158 30.2253 31.4095 30.2694C31.3032 30.3135 31.1808 30.2892 31.0992 30.2079C31.0992 30.2079 28.8091 27.9231 28.8091 27.9231C28.4354 27.5503 27.929 27.3409 27.401 27.3409C25.5519 27.3409 18.5808 27.3409 12.2464 27.3409C9.45167 27.3409 6.77138 26.2306 4.79521 24.2545C2.81905 22.2783 1.70879 19.598 1.70879 16.8033C1.70879 15.297 1.70879 13.7527 1.70879 12.2464C1.70879 9.45167 2.81905 6.77138 4.79521 4.79521C6.77138 2.81905 9.45167 1.70879 12.2464 1.70879H21.0476C26.8673 1.70879 31.5851 6.42664 31.5851 12.2464ZM10.1822 20.2194H22.7992C23.2708 20.2194 23.6537 19.8365 23.6537 19.365C23.6537 18.8934 23.2708 18.5106 22.7992 18.5106H10.1822C9.71067 18.5106 9.32781 18.8934 9.32781 19.365C9.32781 19.8365 9.71067 20.2194 10.1822 20.2194ZM10.1822 15.3147H22.7992C23.2708 15.3147 23.6537 14.9319 23.6537 14.4603C23.6537 13.9887 23.2708 13.6059 22.7992 13.6059H10.1822C9.71067 13.6059 9.32781 13.9887 9.32781 14.4603C9.32781 14.9319 9.71067 15.3147 10.1822 15.3147ZM10.1822 10.41H22.7992C23.2708 10.41 23.6537 10.0272 23.6537 9.55561C23.6537 9.08404 23.2708 8.70125 22.7992 8.70125H10.1822C9.71067 8.70125 9.32781 9.08404 9.32781 9.55561C9.32781 10.0272 9.71067 10.41 10.1822 10.41Z"
      fill={color}
    />
  </svg>
);

const ReviewIcon = () => (
  <div
    style={{
      position: 'absolute',
      left: '5%',
      marginTop: '-20px',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(54.94deg, #DD41B1 22.19%, #FF7BDA 82.85%)',
    }}
  >
    <ReviewSvg />
  </div>
);

const CompleteSvg = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 5.5L5 9L13 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const ProgressBar = ({ percent }) => {
  const containerStyle = {
    height: '20px',
    width: '100%',
    background: 'linear-gradient(90deg, #5683F9 0%, #4362B4 100%)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const fillerStyle = {
    height: '100%',
    width: `${percent * 100}%`,
    background: 'rgba(123, 160, 255, 1)',
    borderRadius: '10px',
    transition: 'width 0.5s ease-in-out',
  };

  return (
    <div style={containerStyle}>
      <div style={fillerStyle}></div>
    </div>
  );
};

const TaskIcon = () => {
  return (
    <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 0.174805C6.41333 0.174805 5.49716 0.878117 5.15299 1.85536H1.66667C0.745833 1.85536 0 2.60741 0 3.53592V15.2998C0 16.2283 0.745833 16.9804 1.66667 16.9804H13.3333C14.2542 16.9804 15 16.2283 15 15.2998V3.53592C15 2.60741 14.2542 1.85536 13.3333 1.85536H9.847C9.50284 0.878117 8.58667 0.174805 7.5 0.174805ZM7.5 1.85536C7.96 1.85536 8.33333 2.2318 8.33333 2.69564C8.33333 3.15947 7.96 3.53592 7.5 3.53592H13.3333V15.2998H1.66667V3.53592H7.5C7.04 3.53592 6.66667 3.15947 6.66667 2.69564C6.66667 2.2318 7.04 1.85536 7.5 1.85536ZM3.33333 6.89703V8.57758H8.33333V6.89703H3.33333ZM10 6.89703V8.57758H11.6667V6.89703H10ZM3.33333 11.0984V12.779H8.33333V11.0984H3.33333ZM10 11.0984V12.779H11.6667V11.0984H10Z"
        fill="white"
      />
    </svg>
  );
};

const PPTIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="17" viewBox="0 0 25 17" fill="none">
    <g clip-path="url(#clip0_208_4547)">
      <path
        d="M23.1208 0H1.87922C0.840372 0 0 0.81715 0 1.82729V15.1768C0 16.1828 0.840372 17 1.87922 17.0041H23.1208C24.1596 17.0041 25 16.187 25 15.1768V1.82729C25 0.81715 24.1596 0.00410628 23.1208 0ZM1.87922 0.821256H23.1208C23.6909 0.821256 24.1554 1.27295 24.1554 1.82729V2.84565H0.844595V1.82729C0.844595 1.27295 1.30912 0.825362 1.87922 0.821256ZM23.1208 16.1787H1.87922C1.30912 16.1787 0.848818 15.7271 0.844595 15.1727V3.66691H24.1554V15.1768C24.1554 15.7312 23.6909 16.1787 23.1208 16.1828V16.1787Z"
        fill="white"
      />
      <path
        d="M16.0304 9.16521L10.1056 5.83913C9.56079 5.53526 8.864 5.71594 8.5515 6.24565C8.45015 6.414 8.39948 6.60289 8.39948 6.79589V13.4481C8.39948 14.0558 8.90201 14.5527 9.53123 14.5568C9.73393 14.5568 9.93241 14.5075 10.1056 14.4048L16.0304 11.0787C16.5752 10.7708 16.761 10.0973 16.4442 9.56763C16.3429 9.39927 16.1993 9.25966 16.0304 9.16521ZM15.6081 10.3725L9.68326 13.6985C9.5439 13.7766 9.36231 13.7314 9.28208 13.5959C9.25674 13.5507 9.24407 13.5055 9.24407 13.4522V6.79999C9.24407 6.69734 9.29897 6.60289 9.39187 6.55362C9.43833 6.52898 9.489 6.51666 9.53968 6.51666C9.59035 6.51666 9.64103 6.52898 9.68326 6.55362L15.6081 9.8797C15.7474 9.95772 15.7939 10.1343 15.7137 10.2698C15.6883 10.3109 15.6503 10.3478 15.6081 10.3725Z"
        fill="white"
      />
      <path
        d="M2.12839 2.06136C2.20862 2.13938 2.3142 2.18044 2.42822 2.18044C2.54224 2.18044 2.64781 2.13938 2.72805 2.06136C2.76606 2.0244 2.79562 1.97923 2.81673 1.92995C2.83785 1.88068 2.85052 1.82319 2.85052 1.76981C2.85052 1.74517 2.85052 1.71643 2.84207 1.69179C2.84207 1.66305 2.8294 1.63841 2.81673 1.61377C2.80829 1.58913 2.79562 1.5645 2.77872 1.54396C2.76183 1.52343 2.74494 1.5029 2.72805 1.48237C2.55913 1.32633 2.29731 1.32633 2.12839 1.48237C2.10727 1.4988 2.09038 1.51933 2.07771 1.54396C2.06082 1.5645 2.04815 1.58913 2.03548 1.61377C2.02704 1.63841 2.01859 1.66715 2.01437 1.69179C2.00592 1.71643 2.00592 1.74517 2.00592 1.76981C2.00592 1.82319 2.01437 1.88068 2.03548 1.92995C2.06082 1.97923 2.09038 2.0244 2.12839 2.06136Z"
        fill="white"
      />
      <path
        d="M3.76266 2.06136C3.92736 2.2215 4.19763 2.2215 4.36233 2.06136C4.40033 2.0244 4.42989 1.97923 4.45101 1.92996C4.47212 1.88068 4.48479 1.82319 4.48479 1.76981C4.48479 1.66305 4.43834 1.56039 4.36233 1.48237C4.19341 1.33044 3.93158 1.33044 3.76266 1.48237C3.68665 1.56039 3.6402 1.66305 3.6402 1.76981C3.6402 1.82319 3.65287 1.88068 3.67398 1.92996C3.6951 1.97923 3.72466 2.0244 3.76266 2.06136Z"
        fill="white"
      />
      <path
        d="M5.39694 2.06135C5.43917 2.09831 5.48562 2.13116 5.5363 2.15169C5.58698 2.17222 5.64187 2.18043 5.69677 2.18043C5.72633 2.18043 5.75167 2.18043 5.78123 2.17222C5.80657 2.16811 5.83191 2.1599 5.85725 2.15169C5.88258 2.13937 5.90792 2.12705 5.93326 2.11063C5.95437 2.09831 5.97971 2.08188 5.9966 2.06135C6.03461 2.02439 6.06417 1.97922 6.08529 1.92995C6.11062 1.88067 6.11907 1.82319 6.11907 1.7698C6.11907 1.74517 6.11907 1.71642 6.11062 1.69179C6.11062 1.66304 6.09795 1.6384 6.08529 1.61377C6.07684 1.58913 6.06417 1.56449 6.04728 1.54396C6.03461 1.51932 6.01772 1.49879 5.9966 1.48237C5.97549 1.46183 5.95437 1.44541 5.93326 1.42898C5.90792 1.41666 5.88258 1.40435 5.85725 1.39203C5.83191 1.38381 5.80657 1.3756 5.78123 1.36739C5.701 1.35096 5.61231 1.35918 5.5363 1.39203C5.48562 1.41256 5.43495 1.4413 5.39694 1.48237C5.38005 1.5029 5.36316 1.52343 5.34627 1.54396C5.32937 1.56449 5.3167 1.58913 5.30826 1.61377C5.29559 1.6384 5.28714 1.66304 5.28292 1.69179C5.2787 1.71642 5.27448 1.74517 5.27448 1.7698C5.27448 1.82319 5.28714 1.88067 5.30826 1.92995C5.32937 1.97922 5.35893 2.02439 5.39694 2.06135Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_208_4547">
        <rect width="25" height="17" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PDFIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
    <path
      d="M18.2468 4.50319L13.8718 0.128174C13.7898 0.0461426 13.6787 0 13.5625 0H4.37497C3.40983 0 2.625 0.784834 2.625 1.75001V19.25C2.625 20.2152 3.40983 21 4.37501 21H16.625C17.5902 21 18.375 20.2152 18.375 19.25V4.81249C18.375 4.69629 18.3289 4.58522 18.2468 4.50319ZM14 1.49367L16.8813 4.37501H14.875C14.3926 4.37501 14 3.98237 14 3.50003V1.49367ZM17.5 19.25C17.5 19.7323 17.1074 20.125 16.625 20.125H4.37501C3.89267 20.125 3.50003 19.7323 3.50003 19.25V1.75001C3.50003 1.26767 3.89267 0.875027 4.37501 0.875027H13.125V3.50003C13.125 4.46517 13.9098 5.25 14.875 5.25H17.5V19.25Z"
      fill="white"
    />
    <path
      d="M12.7306 12.8434C12.3256 12.5247 11.9407 12.197 11.6843 11.9407C11.3511 11.6074 11.0541 11.2844 10.7961 10.9768C11.1986 9.73309 11.375 9.09181 11.375 8.74998C11.375 7.29778 10.8504 6.99997 10.0625 6.99997C9.46395 6.99997 8.75003 7.31099 8.75003 8.79186C8.75003 9.44471 9.10764 10.2373 9.81643 11.1584C9.64298 11.6877 9.43917 12.2983 9.21018 12.9866C9.09993 13.3168 8.98033 13.6227 8.85384 13.9056C8.75089 13.9513 8.65089 13.9979 8.55434 14.0461C8.20657 14.22 7.87631 14.3764 7.56997 14.5217C6.17285 15.183 5.25 15.6206 5.25 16.4844C5.25 17.1116 5.93147 17.5 6.5625 17.5C7.37596 17.5 8.6043 16.4135 9.50152 14.5831C10.4329 14.2157 11.5908 13.9435 12.5046 13.7731C13.2369 14.3362 14.0457 14.875 14.4375 14.875C15.5223 14.875 15.75 14.2478 15.75 13.7218C15.75 12.6874 14.5682 12.6874 14 12.6874C13.8235 12.6875 13.3502 12.7396 12.7306 12.8434ZM6.5625 16.625C6.31255 16.625 6.14336 16.5071 6.12499 16.4844C6.12499 16.1742 7.04997 15.7359 7.94464 15.3121C8.00145 15.2852 8.05916 15.2582 8.11769 15.2305C7.46058 16.1832 6.81073 16.625 6.5625 16.625ZM9.62501 8.79186C9.62501 7.875 9.90958 7.875 10.0625 7.875C10.3719 7.875 10.5 7.875 10.5 8.74998C10.5 8.93455 10.377 9.39598 10.1518 10.1163C9.80827 9.5874 9.62501 9.13409 9.62501 8.79186ZM9.9604 13.4941C9.98776 13.4181 10.0143 13.3412 10.0399 13.2634C10.2022 12.7764 10.3484 12.3389 10.4787 11.9449C10.6602 12.1449 10.8559 12.3496 11.0657 12.5593C11.1478 12.6413 11.3511 12.8259 11.622 13.057C11.0827 13.1745 10.509 13.3202 9.9604 13.4941ZM14.875 13.7219C14.875 13.9184 14.875 14 14.4691 14.0026C14.3499 13.9769 14.0743 13.8146 13.7342 13.583C13.8577 13.5694 13.9487 13.5625 14 13.5625C14.6464 13.5625 14.8297 13.6257 14.875 13.7219Z"
      fill="white"
    />
  </svg>
);

const ArrowButtonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
    <g filter="url(#filter0_d_223_6901)">
      <circle cx="22" cy="22" r="22" fill="url(#paint0_linear_223_6901)" />
    </g>
    <path d="M19 12.5L29 22.5L19 32.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <defs>
      <filter
        id="filter0_d_223_6901"
        x="0"
        y="0"
        width="45"
        height="45"
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
        <feOffset dx="1" dy="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_223_6901" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_223_6901" result="shape" />
      </filter>
      <linearGradient
        id="paint0_linear_223_6901"
        x1="7.09677"
        y1="36.1935"
        x2="44"
        y2="9.93548"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#5786FF" />
        <stop offset="1" stop-color="#91B0FF" />
      </linearGradient>
    </defs>
  </svg>
);

const FileCard = ({ file }) => {
  return (
    <div dir="rtl" style={{ margin: '5px', textAlign: 'right', opacity: '1' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => window.open(file.link)}
      >
        <p style={{ fontSize: '16px', margin: 0 }}>{file.name}</p>
        {file.type === 'ppt' && <PPTIcon />}
        {file.type === 'pdf' && <PDFIcon />}
        {file.type === 'zip' && <FolderZipRoundedIcon />}
        {file.type === 'webLink' && <PublicRoundedIcon />}
      </div>
    </div>
  );
};
