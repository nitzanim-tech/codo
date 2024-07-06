import React, { useState } from 'react';
import './CustomStepper.css';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import { Button } from '@nextui-org/react';

const CustomStepper = ({ lessonVisibilityStats, stepsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalSteps = Math.ceil(lessonVisibilityStats.length / stepsPerPage);
  const stepDistance = 25;

  const start = currentPage * stepsPerPage;
  const end = start + stepsPerPage;
  const displayedLessons = lessonVisibilityStats.slice(start, end);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage < totalSteps - 1 ? prevPage + 1 : prevPage));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  return (
    <>
      <div className="custom-stepper" dir="rtl">
        <Button
          color="primary"
          variant="light"
          radius="full"
          isIconOnly
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`navigation-button prev-button ${currentPage !== 0 ? 'visible' : ''}`}
        >
          <NavigateNextRoundedIcon />
        </Button>
        {displayedLessons.map((lesson, index) => {
          let backgroundColor = 'white';
          const percentVisible = parseFloat(lesson.percentVisible);
          if (percentVisible > 80) {
            backgroundColor = '#82ca9d';
          } else if (percentVisible >= 50) {
            backgroundColor = '#FFE6A7';
          } else {
            backgroundColor = '#ccc';
          }

          const actualIndex = start + index; // Calculate the actual index

          return (
            <div key={actualIndex} className="lesson-circle" style={{ marginRight: `${stepDistance}px` }}>
              <div className="lesson-circle-content" style={{ backgroundColor}}>
                {actualIndex}
              </div>
              <div className="lesson-text">
                <div className="lesson-name">{lesson.lessonName}</div>
              </div>
              {index < displayedLessons.length - 1 && <div className="step-line"></div>}
            </div>
          );
        })}
        <Button
          color="primary"
          variant="light"
          radius="full"
          isIconOnly
          onClick={handleNext}
          disabled={currentPage === totalSteps - 1}
          className={`navigation-button next-button ${currentPage !== totalSteps - 1 ? 'visible' : ''}`}
        >
          <NavigateBeforeRoundedIcon />
        </Button>
      </div>
    </>
  );
};

export default CustomStepper;
