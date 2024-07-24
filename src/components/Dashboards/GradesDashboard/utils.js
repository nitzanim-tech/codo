const scores = [
  {
    firstTest: {
      id: 'ca8e2ed044c0',
      score: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5],
    },
  },
  {
    secondTest: {
      id: '0507467fcde3',
      score: [4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 6, 4, 4, 4, 4, 3, 3, 5, 5, 2, 4, 4, 4, 4, 4, 4, 10],
    },
  },
];

const groupAnalysis = (students) => {
  let submissions = 0;
  let reviews = 0;

  students.forEach((student) => {
    if (student.submissions && Object.keys(student.submissions).length > 0) {
      Object.values(student.submissions).forEach((submission) => {
        submissions++;
        submission.trials?.forEach((trial) => {
          if (trial.review) {
            reviews++;
          }
        });
      });
    }
  });

  return { submissions, reviews };
};

const calculateGrades = (students) => {
  const calculateGrade = (submissions, taskId, points) => {
    let maxGrade = 0;
    if (submissions && submissions[taskId]) {
      submissions[taskId].trials.forEach((trial) => {
        const grade = trial.pass.reduce((acc, pass, index) => acc + (pass ? points[index] : 0), 0);
        if (grade > maxGrade) {
          maxGrade = grade;
        }
      });
    }

    return maxGrade;
  };

  const grades = {};
  const noSubmit = {};

  scores.forEach((scoreObj) => {
    const taskName = Object.keys(scoreObj)[0];
    const task = scoreObj[taskName];

    grades[taskName] = students.map((student) => {
      return calculateGrade(student.submissions, task.id, task.score);
    });

    noSubmit[taskName] = students.filter((student) => {
      return !student.submissions || !student.submissions[task.id];
    }).length;
  });

  return { grades, noSubmit };
};

export { groupAnalysis, calculateGrades };
