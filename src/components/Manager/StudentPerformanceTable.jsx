import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import '../../pages/Manager.css';

const StudentPerformanceTable = ({ students, criteria, title }) => {
  const grades = calculateGrades(students);
  const categorizedStudents = calculateAverageGrade(grades).filter(criteria);
  console.log(categorizedStudents);
  return (
    <div dir='rtl'>
      <h2>{title}</h2>
      <TableContainer>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell className="custom-cell">שם</TableCell>
              <TableCell className="custom-cell" align="right">
                ציון ממוצע
              </TableCell>
              <TableCell className="custom-cell" align="right">
                הגשות
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorizedStudents.map((student) => (
              <TableRow key={student.name}>
                <TableCell className="custom-cell">{student.name}</TableCell>
                <TableCell className="custom-cell" align="right">
                  {student.averageGrade}
                </TableCell>
                <TableCell className="custom-cell" align="right">
                  {student.submissionsCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentPerformanceTable;

const calculateGrades = (students) => {
  const firstTestId = 'ca8e2ed044c0';
  const pointsA = [
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5,
  ];
  const secondTestId = '0507467fcde3';
  const pointsB = [4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 6, 4, 4, 4, 4, 3, 3, 5, 5, 2, 4, 4, 4, 4, 4, 4, 10];

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

  const grades = students.map((student) => {
    const gradeA = calculateGrade(student.submissions, firstTestId, pointsA);
    const gradeB = calculateGrade(student.submissions, secondTestId, pointsB);
    return { name: `${student.name} ${student.lastName}`, gradeA, gradeB, submissions: student.submissions };
  });

  return grades;
};

const calculateAverageGrade = (grades) => {
  return grades.map(({ name, gradeA, gradeB, submissions }) => {
    const averageGrade = (gradeA + gradeB) / 2;
    const submissionsCount = submissions
      ? Object.values(submissions).reduce((sum, submission) => sum + submission.trials.length, 0)
      : 0;
    return { name, averageGrade, submissionsCount };
  });
};
