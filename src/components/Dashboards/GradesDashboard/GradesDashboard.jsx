import React, { useState, useEffect } from 'react';
import NavBar from '../../NavBar/NavigateBar';
import getGroupsByRegion from '../../../requests/groups/getGroupsByRegion';
import getStudentsByGroupMock from '../../../requests/mockedGetStudentBG';
import { CircularProgress } from '@nextui-org/react';
import { useFirebase } from '../../../util/FirebaseProvider';
import ChooseGroups from './ChooseGroups';
import GeneralDataGraph from './GeneralDataGraph';
import { Grid, Paper, Box } from '@mui/material';
import StudentPerformanceTable from './StudentPerformanceTable';
import getAllLessons from '../../../requests/lessons/getAllLessons';
import SubmitByMainsubject from '../SubmitsDashboard/SubmitByMainsubject';
import codoData from '../CodoData.json';
import '../Dashboard.css';

const Cell = ({ children }) => (
  <Paper variant="outlined" sx={{ height: '100%', width: '100%' }}>
    <Box p={2} textAlign="center">
      {children}
    </Box>
  </Paper>
);

const GradesDashboard = () => {
  const { app, isAuthorized, userData } = useFirebase();
  const [groupsIndex, setGroupIndex] = useState(null);
  const [regions, setRegions] = useState([]);
  const [choosenRegion, setChoosenRegion] = useState(null);
  const [choosenGroups, setChoosenGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState();

  const tasks = codoData.tasks || {};

  useEffect(() => {
    const fetchData = async () => {
      const [regionsFromDb] = await Promise.all([getGroupsByRegion(app)]);
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
        let groupData = await getStudentsByGroupMock({ app, groupId });
        let groupLessons = await getAllLessons({ app, groupId });
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
                    <SubmitByMainsubject students={students} title={'שלום'} tasks={tasks} />
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

              <Grid container spacing={1} sx={{ height: '60%' }}>
                <Grid item xs={12}>
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

export default GradesDashboard;
