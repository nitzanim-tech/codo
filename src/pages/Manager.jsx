import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import getGroupsByRegion from '../requests/groups/getGroupsByRegion';
import getStudentsByGroup from '../requests/getStudents';
import { CircularProgress } from '@nextui-org/react';
import { useFirebase } from '../util/FirebaseProvider';
import ChooseGroups from '../components/Manager/ChooseGroups';
import GeneralDataGraph from '../components/Manager/GeneralDataGraph';
import WeeklySubmissions from '../components/Manager/WeeklySubmissions';
import { Grid, Paper, Box } from '@mui/material';

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
      console.log({ choosenGroups });
      for (const groupId of choosenGroups) {
        let groupData = await getStudentsByGroup({ app, groupId });
        groupData = groupData.filter((student) => !student.email.includes('@nitzanim.tech'));
        data = data.concat(groupData);
      }
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
              <Grid container spacing={1} sx={{ height: '50%' }}>
                <Grid item xs={12}>
                  <Cell>
                    <WeeklySubmissions students={students} />
                  </Cell>
                </Grid>
              </Grid>
            </Grid>

            {/* Right column */}
            <Grid item xs={6}>
              <Grid container spacing={1} sx={{ height: '15%' }}>
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
              <Grid container spacing={1} sx={{ height: '20%' }}>
                <Grid item xs={12}>
                  <Cell>5x1 Cell</Cell>
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ height: '60%' }}>
                <Grid item xs={4}>
                  <Cell>3x5 Cell</Cell>
                </Grid>
                <Grid item xs={4}>
                  <Cell>3x5 Cell</Cell>
                </Grid>
                <Grid item xs={4}>
                  <Cell>3x5 Cell</Cell>
                </Grid>
                <Grid item xs={4}>
                  <Cell>3x5 Cell</Cell>
                </Grid>
                <Grid item xs={4}>
                  <Cell>3x5 Cell</Cell>
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
}

export default Manager;
// function Manager() {


//   return (
//     <>
//       <NavBar />
//       {!isAuthorized ? (
//         <h1>הכניסה למנהלים בלבד</h1>
//       ) : regions && groupsIndex ? (
//         <>
//           <Grid container spacing={3} sx={{ flexGrow: 1 }}>
//             <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
//               <ChooseGroups
//                 regions={regions}
//                 choosenRegion={choosenRegion}
//                 setChoosenRegion={setChoosenRegion}
//                 choosenGroups={choosenGroups}
//                 setChoosenGroups={setChoosenGroups}
//                 fetchStudents={fetchStudents}
//               />
//             </Grid>
//             {students && (
//               <>
//                 {' '}
//                 <Grid xs={4} xsOffset={4} md={2} mdOffset={0}>
//                   {' '}
//                   <GeneralDataGraph students={students} />
//                 </Grid>
//                 <Grid xs md={6} mdOffset={2}>
//                   {' '}
//                   <WeeklySubmissions students={students} />
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </>
//       ) : (
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <CircularProgress />
//         </div>
//       )}
//     </>
//   );
// }

// export default Manager;


