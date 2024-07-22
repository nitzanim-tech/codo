import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import PythonIDE from '../components/IDE/PythonIDE';
import NavBar from '../components/NavBar/NavigateBar';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import { useFirebase } from '../util/FirebaseProvider';
import getAllSyllbus from '../requests/syllabus/getAllSyllbus';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';

const Cell = ({ children }) => (
  <Paper variant="outlined" sx={{ height: '100%', width: '100%' }}>
    <Box p={2} textAlign="center">
      {children}
    </Box>
  </Paper>
);

const Syllabus = () => {
  const { app, isAuthorized, userData } = useFirebase();

  const [lessons, setLessons] = useState();
  const [syllabus, setSyllabus] = useState();
  const [choosenSyllabusId, setChoosenSyllabus] = useState();

  useEffect(() => {
    const getSyllabusFromDb = async () => {
      const syllabusFromDB = await getAllSyllbus(app);
      setSyllabus(syllabusFromDB);
    };
    getSyllabusFromDb();
  }, []);

  //   const fetchStudents = async () => {
  //     let groupLessons = await getAllLessons({ app, groupId });
  //     setLessons(allLessons);
  //     setStudents(data);
  //   };

  return (
    <>
      <NavBar />
      {!isAuthorized ? (
        <h1>הכניסה למנהלים בלבד</h1>
      ) : true ? (
        <>
          <Grid container spacing={1} sx={{ height: '100vh' }}>
            {/* Left column */}
            <Grid item xs={6}>
              <Grid container spacing={1} sx={{ height: '20%' }}>
                <Grid item xs={8}>
                  <Cell>
                    <p>בחירת סילבוס</p>
                    <Select
                      label="סילבוס"
                      value={choosenSyllabusId}
                      onChange={(e) => setChoosenSyllabus(e.target.value)}
                      dir="rtl"
                    >
                      {syllabus &&
                        Object.entries(syllabus).map(
                          ([id, syllabusData]) =>
                            syllabusData.open_register && (
                              <SelectItem key={id} value={id} dir="rtl">
                                {syllabusData.program}
                              </SelectItem>
                            ),
                        )}
                    </Select>
                  </Cell>
                </Grid>
              </Grid>
            </Grid>
            {/* Left column */}
            <Grid item xs={4}>
              <Grid container spacing={1} sx={{ height: '20%' }}>
                <Grid item xs={4}>
                  <Cell>
                    <p>בחירת סילבוס</p>
                  </Cell>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ height: '40%' }}>
              <Grid item xs={2}>
                <Cell>
                  <p>כככ</p>
                </Cell>
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

export default Syllabus;
