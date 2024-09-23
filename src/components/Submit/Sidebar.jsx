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
      <Button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '❌' : '☰'}
      </Button>
      {isOpen && (
        <>
          <h1>{unitData.name}</h1>
          <Divider />
          {unitData.resources && unitData.resources.length > 0 ? (
            unitData.resources
              .sort((A, B) => A.index - B.index)
              .map((resource) =>
                resource.type === 'practice' ? (
                  <>
                    <Divider />
                    <p style={{ textAlign: 'right' }}>תור אישי:</p>
                    {unitData.practices.length > 0 && <Practices practices={unitData.practices} unitId={unitData.id} />}
                  </>
                ) : resource.type === 'task' ? (
                  <TaskCard
                    key={resource.id}
                    taskId={resource.link}
                    text={resource.name}
                    unitId={unitData.id}
                    studentData={resource.submission || false}
                    // isChallenge={resource.setting?.isChallenge || null}
                    // showReview={resource.setting?.showReview || null}
                  />
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
      {practices
        .sort((A, B) => A.index - B.index)
        .map((practice) => (
          <TaskCard
            key={practice.id}
            taskId={practice.taskId}
            text={practice.name}
            unitId={unitId}
            studentData={practice.submission || false}
            // isChallenge={practice.setting?.isChallenge || null}
            // showReview={practice.setting?.showReview || null}
          />
        ))}
    </>
  );
};

const FileCard = ({ file }) => {
  return (
    <div dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
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
