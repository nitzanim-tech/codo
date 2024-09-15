import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
// import getGroupsByRegion from '../requests/groups/getGroupsByRegion';
// import getStudentsByGroup from '../requests/getStudents';
import { CircularProgress } from '@nextui-org/react';
import { useFirebase } from '../util/FirebaseProvider';
import ChooseGroups from '../components/Manager/ChooseGroups';
import GeneralDataGraph from '../components/Manager/GeneralDataGraph';
import WeeklySubmissions from '../components/Manager/WeeklySubmissions';
import { Grid, Paper, Box } from '@mui/material';
import StudentPerformanceTable from '../components/Manager/StudentPerformanceTable';
import VisiableLessonsGraph from '../components/Manager/VisiableLessonsGraph';
import TaskGraph from '../components/Manager/TaskGraph';
import './Manager.css';

const Cell = ({ children }) => (
  <Paper variant="outlined" sx={{ height: '100%', width: '100%' }}>
    <Box p={2} textAlign="center">
      {children}
    </Box>
  </Paper>
);

const Manager = () => {
  const { app, isAuthorized, userData } = useFirebase();
  const [groupsIndex, setGroupIndex] = useState(null);
  const [regions, setRegions] = useState([]);
  const [choosenRegion, setChoosenRegion] = useState(null);
  const [choosenGroups, setChoosenGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState();
  useEffect(() => {
    const fetchData = async () => {
      // const [regionsFromDb] = await Promise.all([getGroupsByRegion(app)]);
      const [regionsFromDb] = [];

      const index = makeNameIdIndex(regionsFromDb);
      setGroupIndex(index);
      setRegions(regionsFromDb);
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

  const fetchStudents = async () => {
    if (choosenGroups.length > 0) {
      let data = [];
      let allLessons = {};
      for (const groupId of choosenGroups) {
        let groupData = null;
        let groupLessons = null;
        // let groupData = await getStudentsByGroup({ app, groupId });
        // let groupLessons = await getAllLessons({ app, groupId });
        allLessons = { ...allLessons, ...groupLessons };
        groupData = groupData.filter((student) => !student.email.includes('@nitzanim.tech'));
        data = data.concat(groupData);
      }
      setLessons(allLessons);
      setStudents(data);
    }
  };

  return (
    <>
      <NavBar />
      {!isAuthorized ? (
        <h1>הכניסה למנהלים בלבד</h1>
      ) : regions && groupsIndex ? (
        <>
          <Grid container spacing={1} sx={{ height: '100vh' }}>
            {/* Left column */}
            <Grid item xs={6}>
              <Grid container spacing={1} sx={{ height: '50%' }}>
                <Grid item xs={12}>
                  <Cell>
                    <GeneralDataGraph students={students} />
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
              <Grid container spacing={1} sx={{ height: '12%', marginBottom: '15px' }}>
                <Grid item xs={12}>
                  <Cell>
                    <ChooseGroups
                      regions={regions}
                      choosenRegion={choosenRegion}
                      setChoosenRegion={setChoosenRegion}
                      choosenGroups={choosenGroups}
                      setChoosenGroups={setChoosenGroups}
                      fetchStudents={fetchStudents}
                    />
                  </Cell>
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ height: '20%', marginBottom: '10px' }}>
                <Grid item xs={12}>
                  <Cell>{lessons && <VisiableLessonsGraph lessons={lessons} />}</Cell>
                </Grid>
              </Grid>

              <Grid container spacing={1} sx={{ height: '60%' }}>
                <Grid item xs={5}>
                  <Cell>{/* <TaskGraph students={students} /> */}</Cell>
                </Grid>

                <Grid item xs={7}>
                  <Cell>
                    {students && (
                      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        {/* <div style={{ display: 'flex', justifyContent: 'space-between', width: '85%' }}> */}
                        <StudentPerformanceTable students={students} title="חניכים " />
                        {/* </div> */}
                      </div>
                    )}
                  </Cell>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Manager;