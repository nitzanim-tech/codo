import React from 'react';
import './Manager.css';
import CustomStepper from './CustomStepper';

const VisiableLessonsGraph = ({ lessons }) => {
  const lessonVisibilityStats = Object.keys(lessons).map((lessonId) => {
    const lesson = lessons[lessonId];
    const elements = lesson.elements || {}; 
    const visibleElements = Object.values(elements).filter((element) => {
      return element.setting && element.setting.isVisible;
    }).length;

    const totalElements = Object.values(elements).length;
    const percentVisible = totalElements > 0 ? (visibleElements / totalElements) * 100 : 0;

    return {
      lessonId,
      lessonName: lesson.lessonName || '',
      percentVisible: percentVisible.toFixed(1),
    };
  });

  const stepsPerPage = 10;

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <h2 style={{fontSize:'16px'}}>מפגשים פתוחים</h2>
      </div>
      <CustomStepper lessonVisibilityStats={lessonVisibilityStats} stepsPerPage={stepsPerPage} />
    </div>
  );
};

export default VisiableLessonsGraph;
