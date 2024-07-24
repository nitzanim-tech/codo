import React, { useState, useEffect } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { CircularProgress } from '@nextui-org/react';
import { useFirebase } from '../../../util/FirebaseProvider';
import NavBar from '../../NavBar/NavigateBar';
import getGroupsByRegion from '../../../requests/groups/getGroupsByRegion';
import getAllLessons from '../../../requests/lessons/getAllLessons';
import getStudentsByGroupMock from '../../../requests/mockedGetStudentBG';

import WeeklySubmissions from './WeeklySubmissions';
import VisiableLessonsGraph from './VisiableLessonsGraph';
import SubmissionsDrill from './SubmissionsDrill';
import Kpi from './Kpi';
import '../Dashboard.css';

const Cell = ({ children }) => (
  <Paper variant="outlined" sx={{ height: '100%', width: '100%' }}>
    <Box p={2} textAlign="center">
      {children}
    </Box>
  </Paper>
);

const SubmitDashboard = () => {
  const { app, isAuthorized } = useFirebase();
  const [groupsIndex, setGroupIndex] = useState(null);
  const [regions, setRegions] = useState([]);
  const [choosenGroups, setChoosenGroups] = useState(['all']);
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regionsFromDb = await getGroupsByRegion(app);
        const index = makeNameIdIndex(regionsFromDb);
        setGroupIndex(index);
        setRegions(regionsFromDb);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };

    if (isAuthorized) fetchData();
  }, [isAuthorized, app]);

  const makeNameIdIndex = (regionsFromDb) => {
    return regionsFromDb.reduce((acc, region) => {
      acc[region.id] = region.name;
      region.groups.forEach((group) => {
        acc[group.id] = group.name;
      });
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (choosenGroups.length > 0) {
          let data = [];
          let allLessons = {};
          for (const groupId of choosenGroups) {
            const groupData = await getStudentsByGroupMock({ app, groupId });
            const groupLessons = await getAllLessons({ app, groupId });
            allLessons = { ...allLessons, ...groupLessons };
            const filteredGroupData = groupData.filter((student) => !student.email.includes('@nitzanim.tech'));
            data = data.concat(filteredGroupData);
          }
          setLessons(allLessons);
          setStudents(data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (isAuthorized) fetchStudents();
  }, [choosenGroups, isAuthorized, app]);

  return (
    <>
      <NavBar />
      {!isAuthorized ? (
        <h1>הכניסה למנהלים בלבד</h1>
      ) : regions && groupsIndex ? (
        <Grid container spacing={1} sx={{ height: '100vh' }}>
          {/* Left column */}
          <Grid item xs={6}>
            <Grid container spacing={1} sx={{ height: '50%' }}>
              <Grid item xs={12}>
                <Cell>
                  {students.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <Kpi title={'שלום עולם'} value={88} />
                      <Kpi title={'שלום עולם'} value={88} />
                    </div>
                  )}
                </Cell>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ height: '40%' }}>
              <Grid item xs={12}>
                <Cell>
                  <WeeklySubmissions students={students} />
                </Cell>
              </Grid>
            </Grid>
          </Grid>

          {/* Right column */}
          <Grid item xs={6}>
            <Grid container spacing={1} sx={{ height: '20%', marginBottom: '10px' }}>
              <Grid item xs={12}>
                <Cell>{lessons && <VisiableLessonsGraph lessons={lessons} />}</Cell>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ height: '70%' }}>
              <Grid item xs={12}>
                <Cell>
                  <SubmissionsDrill
                    students={students}
                    title="Submissions Drill"
                    // taskDict={taskDict}
                    groupsIndex={groupsIndex}
                  />
                </Cell>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default SubmitDashboard;
