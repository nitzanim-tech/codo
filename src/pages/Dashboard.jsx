import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import { Button, Grid, CircularProgress } from '@mui/material';
import { useFirebase } from '../util/FirebaseProvider';
import getAllLessons from '../requests/lessons/getAllLessons';
import getAllTasks from '../requests/tasks/getAllTasks';

function Dashboard() {
  const { app, userData, isUserLoading } = useFirebase();
  const [lessons, setLessons] = useState({});
  const [totalPointsPerSubject, setTotalPointsPerSubject] = useState({});
  const [studentPointsPerSubject, setStudentPointsPerSubject] = useState({});

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const allLessons = await getAllLessons({ app, groupId: userData.group.id });
        const allTasks = await getAllTasks({ app });

        const tasksArray = Object.values(allTasks);

        const tasksWithIdsAndSubjects = tasksArray.map((task) => {
          return {
            id: task.id,
            subjects: task.subjects || [],
            tests: task.tests.map((test) => test.score),
          };
        });

        const totalPointsPerSubject = {};
        tasksWithIdsAndSubjects.forEach((task) => {
          const totalScoreForTask = task.tests.reduce((sum, score) => sum + score, 0);

          task.subjects.forEach((subject) => {
            if (!totalPointsPerSubject[subject]) {
              totalPointsPerSubject[subject] = 0;
            }
            totalPointsPerSubject[subject] += totalScoreForTask;
          });
        });

        const studentPointsPerSubject = {};
        if (userData.submissions) {
          Object.entries(userData.submissions).forEach(([taskId, submission]) => {
            if (submission.trials) {
              submission.trials.forEach((trial) => {
                const task = tasksArray.find((task) => task.id === taskId);
                if (task) {
                  const totalScoreForTrial =
                    trial.pass && Array.isArray(trial.pass)
                      ? task.tests.reduce((sum, test, index) => {
                          return sum + (trial.pass[index] ? test.score : 0);
                        }, 0)
                      : 0;

                  if (task.subjects)
                    task.subjects.forEach((subject) => {
                      if (!studentPointsPerSubject[subject]) {
                        studentPointsPerSubject[subject] = 0;
                      }
                      studentPointsPerSubject[subject] += totalScoreForTrial;
                    });
                }
              });
            }
          });
        }

        setLessons(allLessons);
        setTotalPointsPerSubject(totalPointsPerSubject);
        setStudentPointsPerSubject(studentPointsPerSubject);
      } catch (error) {
        console.error('Error fetching lessons or tasks:', error);
      }
    };

    if (userData) {
      fetchLessons();
    }
  }, [userData, app]);

  return (
    <>
      <NavBar />
      {isUserLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
          <CircularProgress />
        </div>
      ) : userData ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '70%' }}>
            <Grid container spacing={1} columns={3} rows={1}>
              <Grid item style={{ width: '55%', margin: '2%' }}>
                <h1>Dashboard</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Total Points</th>
                      <th>Student Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(totalPointsPerSubject).map((subject) => (
                      <tr key={subject}>
                        <td>{subject}</td>
                        <td>{totalPointsPerSubject[subject]}</td>
                        <td>{studentPointsPerSubject[subject] || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <h1>אנא התחברו</h1>
      )}
    </>
  );
}

export default Dashboard;
