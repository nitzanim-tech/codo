import React, { useState } from 'react';
import './Sidebar.css'; 
import { Button, Divider } from '@nextui-org/react';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import CustomScrollbar from '../general/CustomScrollbar';
import { Loading } from '../general/Messages';
import { useParams } from 'react-router-dom';
import { ArrowButtonIcon, TaskIcon, CompleteIcon, ReviewIcon, PDFIcon, PPTIcon } from './Icons';

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
    <div className="sidebar">
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
                  <h1 style={{ fontSize: '30px', textAlign: 'right', width: '100%', direction: 'rtl' }}>
                    {unitData.name}
                  </h1>
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
