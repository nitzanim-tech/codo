import React, { useState, useEffect } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { CircularProgress } from '@nextui-org/react';
import { useFirebase } from '../../../util/FirebaseProvider';
import NavBar from '../../NavBar/NavigateBar';
import getGroupsByRegion from '../../../requests/groups/getGroupsByRegion';
import getAllLessons from '../../../requests/lessons/getAllLessons';
import getStudentsByGroupMock from '../../../requests/mockedGetStudentBG';
import mockedGetGroups from '../../../requests/groups/mockedGetGroups';

import WeeklySubmissions from './WeeklySubmissions';
import VisiableLessonsGraph from './VisiableLessonsGraph';
import SubmissionsDrill from './SubmissionsDrill';
import Kpi from './Kpi';
import { submissionKpi, reviewKpi } from './utils';
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
  const [allGroupsElements, setAllGroupsElements] = useState();
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regionsFromDb = await getGroupsByRegion(app);
        const index = makeNameIdIndex(regionsFromDb);
        setGroupIndex(index);
        setRegions(regionsFromDb);

        const usersData = await getStudentsByGroupMock({ app, groupId: null });
        const allLessons = await getAllLessons({ app, groupId: null });
        const allGroups = await mockedGetGroups(app);

        const filteredGroupData = usersData.filter((student) => !student.email.includes('@nitzanim.tech'));

        setAllGroupsElements(allGroups);
        setLessons(allLessons);
        setStudents(filteredGroupData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isAuthorized) fetchData();
  }, [isAuthorized, app]);

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
                      <Kpi title={'מישוב'} value={reviewKpi(students, lessons, selectedRegion, selectedGroup) || 0} />
                      <Kpi
                        title={'הגשות'}
                        value={submissionKpi(students, lessons, selectedRegion, selectedGroup) || 0}
                      />
                    </div>
                  )}
                </Cell>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ height: '40%' }}>
              <Grid item xs={12}>
                <Cell>
                  <WeeklySubmissions
                    students={students}
                    selectedRegion={selectedRegion}
                    selectedGroup={selectedGroup}
                  />
                </Cell>
              </Grid>
            </Grid>
          </Grid>

          {/* Right column */}
          <Grid item xs={6}>
            <Grid container spacing={1} sx={{ height: '20%', marginBottom: '10px' }}>
              <Grid item xs={12}>
                <Cell>
                  {lessons && (
                    <VisiableLessonsGraph
                      groups={allGroupsElements}
                      allLessons={lessons}
                      selectedRegion={selectedRegion}
                      selectedGroup={selectedGroup}
                    />
                  )}
                </Cell>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ height: '70%' }}>
              <Grid item xs={12}>
                <Cell>
                  <SubmissionsDrill
                    students={students}
                    title="Submissions Drill"
                    groupsIndex={groupsIndex}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
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

const makeNameIdIndex = (regionsFromDb) => {
  return regionsFromDb.reduce((acc, region) => {
    acc[region.id] = region.name;
    region.groups.forEach((group) => {
      acc[group.id] = group.name;
    });
    return acc;
  }, {});
};
