import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Card } from '@nextui-org/react';
import tasks from '../../../Tasks/TasksList.json';

export default function PassMatrix({ studentsRawData, tasksList }) {
  const calculateGrade = (scores, passedTests) => {
    const passedTestsNumeric = passedTests.map(Number);
    return passedTestsNumeric.reduce((sum, value, index) => sum + value * scores[index], 0);
  };

  const findMaxGrade = ({ taskId, student }) => {
    const submission = student.submissions ? student.submissions[taskId] || null : null;
    if (submission && submission.trials) {
      const maxGradeTrial = submission.trials.reduce((max, trial) => {
        const grade = calculateGrade(tasksList[taskId].scores, trial.pass) / tasksList[taskId].scoreSum;
        return Math.max(max, grade);
      }, 0);
      return maxGradeTrial;
    }
    return -1;
  };

  const taskData = studentsRawData.map((student) => {
    const maxGrades = [...tasks].reverse().map((task) => {
      return findMaxGrade({ taskId: task.key, student });
    });
    return {
      uid: student.uid,
      name: `${student.name} ${student.lastName}`,
      maxGrades,
    };
  });

  const getColor = (ratio) => {
    if (ratio == -1) return 'white';
    if (ratio < 0.2) return '#BC0000';
    if (ratio < 0.4) return '#C53314';
    if (ratio < 0.6) return '#EBFF66';
    if (ratio < 0.8) return '#74E945';
    return '#46C813';
  };

  const RatioCard = ({ label, ratio }) => (
    <Card
      radius="lg"
      style={{
        width: '60px',
        height: '40px',
        backgroundColor: getColor(ratio),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p style={{ margin: 0, fontSize: '12px' }}>{label}</p>
    </Card>
  );

  return (
    <div style={{ padding: '10px', width: '80%', direction: 'ltr' }}>
      <Table aria-label="Task Matrix">
        <TableHeader>
          {[...tasks].reverse().map((task) => (
            <TableColumn key={task.key} width="1px" style={{ textAlign: 'center' }}>
              <Tooltip showArrow={true} content={task.name}>
                <p>*</p>
              </Tooltip>
            </TableColumn>
          ))}
          <TableColumn>תלמיד</TableColumn>
        </TableHeader>

        <TableBody>
          {taskData.map((student) => (
            <TableRow key={student.uid}>
              {student.maxGrades.map((grade, index) => (
                <TableCell key={index} width={'10px'}>
                  <div style={{ backgroundColor: getColor(grade), height: '100%', width: '100%' }}>
                    <p style={{ color: getColor(grade), fontSize: '12px' }}>{grade >= 0 && grade.toFixed(2)}</p>
                  </div>
                </TableCell>
              ))}
              <TableCell width={'140px'}>{student.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div
        dir="ltr"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', width: '40%' }}>
          <RatioCard label="לא הוגש" ratio={-1} />
          <RatioCard label="0-19%" ratio={0.1} />
          <RatioCard label="20-39%" ratio={0.3} />
          <RatioCard label="40-59%" ratio={0.5} />
          <RatioCard label="60-79%" ratio={0.7} />
          <RatioCard label="80-100%" ratio={1} />
        </div>
      </div>
    </div>
  );
}
