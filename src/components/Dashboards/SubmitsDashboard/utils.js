// utils.js
export const groupSubmissions = (key, items, groupsIndex) => {
  return items.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = {
        key: groupKey,
        label: groupsIndex[groupKey] || groupKey,
        submissionsCount: 0,
        reviewsCount: 0,
      };
    }

    Object.entries(item.submissions || {}).forEach(([taskId, submission]) => {
      if (submission.trials.length > 0) {
        acc[groupKey].submissionsCount += 1;
      }
      if (submission.trials.some((trial) => trial.review)) {
        acc[groupKey].reviewsCount += 1;
      }
    });

    return acc;
  }, {});
};

export const getCurrentData = (students, selectedRegion, selectedGroup, groupsIndex) => {
  if (selectedGroup) {
    // Show students within the selected group
    const studentsInGroup = students.filter((student) => student.group === selectedGroup);
    return studentsInGroup.map((student) => ({
      key: `${student.name} ${student.lastName}`,
      submissionsCount: Object.values(student.submissions || {}).reduce(
        (acc, sub) => acc + (sub.trials.length > 0 ? 1 : 0),
        0,
      ),
      reviewsCount: Object.values(student.submissions || {}).reduce(
        (acc, sub) => acc + (sub.trials.some((trial) => trial.review) ? 1 : 0),
        0,
      ),
    }));
  } else if (selectedRegion) {
    // Group by groups
    const studentsInRegion = students.filter((student) => student.region === selectedRegion);
    return Object.values(groupSubmissions('group', studentsInRegion, groupsIndex));
  } else {
    // Group by regions
    return Object.values(groupSubmissions('region', students, groupsIndex));
  }
};

// Function to get the count of task elements in the lessons
const getTaskCount = (lessons) => {
  console.log({ lessons });
  return Object.values(lessons).reduce((count, lesson) => {
    const taskCount = Object.values(lesson.elements).filter((element) => element.type === 'task').length;
    return count + taskCount;
  }, 0);
};

// Function to calculate the submission KPI
export const submissionKpi = (students, lessons, selectedRegion = null, selectedGroup = null) => {
  let filteredStudents = students;
  if (selectedGroup) {
    filteredStudents = students.filter((student) => student.group === selectedGroup);
  } else if (selectedRegion) {
    filteredStudents = students.filter((student) => student.region === selectedRegion);
  }
  console.log(filteredStudents);

  const taskCount = getTaskCount(lessons);
  console.log(taskCount);
  const totalSubmissions = filteredStudents.reduce((acc, student) => {
    const studentSubmissions = Object.values(student.submissions || {}).reduce((subAcc, submission) => {
      return subAcc + (submission.trials.length > 0 ? 1 : 0);
    }, 0);
    return acc + studentSubmissions;
  }, 0);

  const kpi = taskCount > 0 ? ((totalSubmissions / (taskCount * filteredStudents.length)) * 100).toFixed(1) : 0;
  console.log(kpi);
  return kpi;
};

// Function to calculate the review KPI
export const reviewKpi = (students, lessons, selectedRegion = null, selectedGroup = null) => {
  let filteredStudents = students;

  if (selectedGroup) {
    filteredStudents = students.filter((student) => student.group === selectedGroup);
  } else if (selectedRegion) {
    filteredStudents = students.filter((student) => student.region === selectedRegion);
  }

  const totalUniqueSubmissions = filteredStudents.reduce(
    (acc, student) =>
      acc +
      Object.values(student.submissions || {}).reduce(
        (subAcc, submission) => subAcc + (submission.trials.length > 0 ? 1 : 0),
        0,
      ),
    0,
  );

  const totalReviews = filteredStudents.reduce(
    (acc, student) =>
      acc +
      Object.values(student.submissions || {}).reduce(
        (subAcc, submission) => subAcc + (submission.trials.some((trial) => trial.review) ? 1 : 0),
        0,
      ),
    0,
  );

  const kpi = totalUniqueSubmissions > 0 ? ((totalReviews / totalUniqueSubmissions) * 100).toFixed(1) : 0;
  return kpi;
};
