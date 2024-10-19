import React, { useState } from 'react';
import './Sidebar.css'; // Add this to style the sidebar
import { Button, Divider } from '@nextui-org/react';
import TaskCard from '../Home/TaskCard';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';

const unitData = {
  id: '95e017a52ea0',
  name: 'חזרה',
  index: 1,
  resources: [
    {
      id: 'bb627278cdef',
      name: 'הכנה 0 - שלום עולם',
      type: 'task',
      link: '7e9e4f50c46c',
      syllabus_id: 'ba5ef88b6577',
      unit_id: '95e017a52ea0',
      index: 0,
      submission: true,
    },
    {
      id: 'a4033ff2c232',
      name: 'הכנה  1- אליס והמעלית',
      type: 'task',
      link: 'c3194b8af385',
      syllabus_id: 'ba5ef88b6577',
      unit_id: '95e017a52ea0',
      index: 1,
      submission: true,
    },
    {
      id: '02b8e4f8432b',
      name: 'ברוכים הבאים לניצנים',
      type: 'ppt',
      link: 'https://1drv.ms/p/s!AhbjJ-PvNB7Dd513ZLFuzAOiqow?e=ETi23c',
      syllabus_id: 'ba5ef88b6577',
      unit_id: '95e017a52ea0',
      index: 2,
      submission: false,
    },
    {
      id: '3c090b48e824',
      name: 'נספח התקנות',
      type: 'pdf',
      link: 'https://1drv.ms/b/s!AhbjJ-PvNB7Ddi1doErWmMGb7tw?e=njl3z4',
      syllabus_id: 'ba5ef88b6577',
      unit_id: '95e017a52ea0',
      index: 3,
      submission: false,
    },
    {
      id: '8368e7b32e59',
      name: 'תור תרגול אישי',
      type: 'practice',
      link: null,
      syllabus_id: '50711b265cce',
      unit_id: '0c59ea4c70bc',
      index: 99,
      submission: false,
    },
  ],
  practices: [
    {
      id: '8c8c99f85663',
      index: 0,
      name: 'חימום - תנאים',
      unitId: '0c59ea4c70bc',
      type: 'main',
      taskId: '8e37e437f83e',
      submission: true,
    },
    {
      id: 'feeeada33049',
      index: 1,
      name: 'מה הסיסמא?',
      unitId: '0c59ea4c70bc',
      type: 'main',
      taskId: '65d204aa39aa',
      submission: true,
    },
    {
      id: '3e53a8596a96',
      index: 2,
      name: 'החבר הדמיוני',
      unitId: '0c59ea4c70bc',
      type: 'drill',
      taskId: 'c664ba1217e3',
      submission: false,
    },
  ],
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <Button  onClick={toggleSidebar}>
        {isOpen ? '❌' : '☰'}
      </Button>
      {isOpen && (
        <>
          <h1 style={{ fontSize: '30px', textAlign: 'right', width: '100%' }}>{unitData.name}</h1>
          <Divider />
          {unitData.resources && unitData.resources.length > 0 ? (
            unitData.resources
              .sort((A, B) => A.index - B.index)
              .map((resource) =>
                resource.type === 'practice' ? (
                  <>
                    <div className="sidebar-box">
                      <Divider />
                      <p style={{ textAlign: 'right', fontSize: '22px' }}>תור אישי:</p>
                      {unitData.practices.length > 0 && (
                        <Practices practices={unitData.practices} unitId={unitData.id} />
                      )}
                    </div>
                  </>
                ) : resource.type === 'task' ? (
                  <div className="sidebar-box">
                    <TaskCard
                      key={resource.id}
                      taskId={resource.link}
                      text={resource.name}
                      unitId={unitData.id}
                      studentData={resource.submission || false}
                      // isChallenge={resource.setting?.isChallenge || null}
                      // showReview={resource.setting?.showReview || null}
                    />
                  </div>
                ) : (
                  <FileCard key={resource.id} file={resource} />
                ),
              )
          ) : (
            <p>No resources available</p>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;

const Practices = ({ practices, unitId }) => {
  return (
    <>
      <CustomScrollbar>
        {practices
          .sort((A, B) => A.index - B.index)
          .map((practice, index) => (
            <>
              <div key={practice.id}>
                <TaskIcon />
                {practice.name}
              </div>
              {index !== practices.length - 1 && (
                <hr className="solid" style={{ background: '#36356A', height: '1px', border: 'none' }} />
              )}
            </>
          ))}
      </CustomScrollbar>
    </>
  );
};

const CustomScrollbar = ({ children }) => {
  const customScrollbarStyle = {
    overflowX: 'auto',
    scrollbarWidth: 'thick',
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

            {/* <TaskCard
              key={practice.id}
              taskId={practice.taskId}
              text={practice.name}
              unitId={unitId}
              studentData={practice.submission || false}
              // isChallenge={practice.setting?.isChallenge || null}
              // showReview={practice.setting?.showReview || null}
            /> */}

const FileCard = ({ file }) => {
  return (
    <div dir="rtl" style={{ margin: '5px', textAlign: 'right', opacity: '1' }}>
      <Button radius="full" variant="faded" onClick={() => window.open(file.link)}>
        {file.type === 'ppt' && <SlideshowIcon style={{ color: '#FAE233' }} />}
        {file.type === 'pdf' && <PictureAsPdfIcon style={{ color: '#BF1E2E' }} />}
        {file.type === 'zip' && <FolderZipRoundedIcon style={{ color: '#386641' }} />}
        {file.type === 'webLink' && <PublicRoundedIcon style={{ color: '#BF1E2E' }} />}
      </Button>
      {file.name}
    </div>
  );
};

const TaskIcon = ()=>{
  return(
<svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M7.5 0.174805C6.41333 0.174805 5.49716 0.878117 5.15299 1.85536H1.66667C0.745833 1.85536 0 2.60741 0 3.53592V15.2998C0 16.2283 0.745833 16.9804 1.66667 16.9804H13.3333C14.2542 16.9804 15 16.2283 15 15.2998V3.53592C15 2.60741 14.2542 1.85536 13.3333 1.85536H9.847C9.50284 0.878117 8.58667 0.174805 7.5 0.174805ZM7.5 1.85536C7.96 1.85536 8.33333 2.2318 8.33333 2.69564C8.33333 3.15947 7.96 3.53592 7.5 3.53592H13.3333V15.2998H1.66667V3.53592H7.5C7.04 3.53592 6.66667 3.15947 6.66667 2.69564C6.66667 2.2318 7.04 1.85536 7.5 1.85536ZM3.33333 6.89703V8.57758H8.33333V6.89703H3.33333ZM10 6.89703V8.57758H11.6667V6.89703H10ZM3.33333 11.0984V12.779H8.33333V11.0984H3.33333ZM10 11.0984V12.779H11.6667V11.0984H10Z"
    fill="white"
  />
</svg>)
} ;
