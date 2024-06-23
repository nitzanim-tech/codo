import React from 'react';
import { Card } from '@nextui-org/react';
import Histogram from './Histogram';

const GeneralDataGraph = ({ students }) => {
  const paramters = groupAnalysys(students);
  const gradesVector = calculateGrades(students);

  const histogramDataA = createHistogramData(gradesVector.gradeA);
  const histogramDataB = createHistogramData(gradesVector.gradeB);

  return (
    <>
      <Card >
        <p>מספר חניכים: {students.length}</p>
        <p>מספר הגשות: {paramters.submissions}</p>
        <p>מספר משובים: {paramters.reviews}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Histogram title="בוחן 1" data={histogramDataA} barColor="#8884d8" />
          <Histogram title="בוחן 2" data={histogramDataB} barColor="#82ca9d" />
        </div>
      </Card>
    </>
  );
};

export default GeneralDataGraph;

const groupAnalysys = (students) => {
  let submissions = 0;
  let reviews = 0;

  students.forEach((student) => {
    Object.values(student.submissions).forEach((submission) => {
      submissions++;
      submission.trials.forEach((trial) => {
        if (trial.review) {
          reviews++;
        }
      });
    });
  });

  return { submissions, reviews };
};

const calculateGrades = (students) => {
  const firstTestId = 'ca8e2ed044c0';
  const pointsA = [
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5,
  ];
  const secondTestId = '0507467fcde3';
  const pointsB = [4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 6, 4, 4, 4, 4, 3, 3, 5, 5, 2, 4, 4, 4, 4, 4, 4, 10];

  const calculateGrade = (submissions, taskId, points) => {
    let maxGrade = 0;

    if (submissions[taskId]) {
      submissions[taskId].trials.forEach((trial) => {
        const grade = trial.pass.reduce((acc, pass, index) => acc + (pass ? points[index] : 0), 0);
        if (grade > maxGrade) {
          maxGrade = grade;
        }
      });
    }

    return maxGrade;
  };

  const gradeA = students.map((student) => calculateGrade(student.submissions, firstTestId, pointsA));
  const gradeB = students.map((student) => calculateGrade(student.submissions, secondTestId, pointsB));

  return { gradeA, gradeB };
};

const createHistogramData = (grades, binSize = 10, numBins = 12) => {
  const bins = Array.from({ length: numBins }, (_, index) => ({
    range: `${index * binSize}-${(index + 1) * binSize}`,
    count: 0,
  }));

  grades.forEach((grade) => {
    const binIndex = Math.min(Math.floor(grade / binSize), bins.length - 1);
    bins[binIndex].count += 1;
  });

  return bins;
};
