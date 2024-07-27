import React from 'react';
import CustomStepper from '../GradesDashboard/CustomStepper';

const VisiableLessonsGraph = ({ groups, allLessons, selectedRegion, selectedGroup }) => {

  const getGroupIds = () => {
    if (selectedGroup) {
      return [selectedGroup];
    }
    if (selectedRegion) {
      return Object.keys(groups).filter((groupId) => groups[groupId].region === selectedRegion);
    }
    return Object.keys(groups);
  };

const calculateLessonVisibilityStats = () => {
  const groupIds = getGroupIds();
  const lessonVisibilityStats = {};

  // Initialize lessonVisibilityStats for all lessons
  Object.keys(allLessons).forEach((lessonId, index) => {
    const lesson = allLessons[lessonId];
    lessonVisibilityStats[lessonId] = {
      lessonId,
      lessonName: lesson.lessonName || '',
      totalElements: Object.keys(lesson.elements).length,
      visibleElements: 0,
      order: index + 1, // Assign order based on the original sequence
    };
  });

  groupIds.forEach((groupId) => {
    const group = groups[groupId];
    Object.keys(group.elements).forEach((taskId) => {
      const task = group.elements[taskId];
      Object.keys(allLessons).forEach((lessonId) => {
        const lesson = allLessons[lessonId];
        if (lesson.elements[taskId]) {
          if (task.isVisible) {
            lessonVisibilityStats[lessonId].visibleElements += 1;
          }
        }
      });
    });
  });

  const filteredStats = Object.values(lessonVisibilityStats).sort((a, b) => a.order - b.order); // Sort by the order property

  let relevantStats = filteredStats;
  if (selectedGroup === null && selectedRegion === null) {
    // Calculate average visibility if no specific group or region is selected
    const avgVisibilityStats = {};
    relevantStats.forEach((stats) => {
      if (!avgVisibilityStats[stats.lessonId]) {
        avgVisibilityStats[stats.lessonId] = {
          lessonId: stats.lessonId,
          lessonName: stats.lessonName,
          totalElements: stats.totalElements,
          visibleElements: 0,
        };
      }
      avgVisibilityStats[stats.lessonId].visibleElements += stats.visibleElements;
    });

    Object.values(avgVisibilityStats).forEach((stats) => {
      stats.percentVisible = stats.totalElements > 0 ? (stats.visibleElements / stats.totalElements) * 100 : 0;
    });

    relevantStats = Object.values(avgVisibilityStats);
  }

  return relevantStats.map((stats) => ({
    lessonId: stats.lessonId,
    lessonName: stats.lessonName,
    percentVisible: stats.totalElements > 0 ? ((stats.visibleElements / stats.totalElements) * 100).toFixed(1) : '0.0',
  }));
};

  const lessonVisibilityStats = calculateLessonVisibilityStats();
  const stepsPerPage = 10;

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <h2 style={{ fontSize: '16px' }}>מפגשים פתוחים</h2>
      </div>
      <CustomStepper lessonVisibilityStats={lessonVisibilityStats} stepsPerPage={stepsPerPage} />
    </div>
  );
};

export default VisiableLessonsGraph;
