import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import NavBar from '../components/NavBar/NavigateBar';
import { useFirebase } from '../util/FirebaseProvider';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import { Listbox, ListboxItem, Button } from '@nextui-org/react';
import PracticeTable from '../components/Syllabus/PracticeTable';
import AddUnitButton from '../components/Syllabus/AddUnitButton';
import LessonTable from '../components/Syllabus/LessonTable';

import getAllTasks from '../requests/tasks/getAllTasks';
import getSyllbusAndUnits from '../requests/syllabus/getSyllbusList';

const Syllabus = () => {
  const { app, isAuthorized, auth } = useFirebase();
  const [units, setUnits] = useState();
  const [syllabusList, setSyllabusList] = useState();
  const [choosenSyllabusId, setChoosenSyllabus] = useState();
  const [selectedUnit, setSelectedUnit] = useState();
  const [allTasks, setAllTasks] = useState();

  useEffect(() => {
    const getSyllabusFromDb = async () => {
      const syllabusFromDB = await getSyllbusAndUnits({ auth });
      console.log({ auth });
      const syllabusList = Object.entries(syllabusFromDB).map(([id, data]) => ({
        id: id,
        name: `${data.program} | ${data.hebYear}`,
        units: data.units,
      }));
      const tasksFromDB = await getAllTasks({ app });
      setAllTasks(tasksFromDB);
      setSyllabusList(syllabusList);
    };
    auth && getSyllabusFromDb();
  }, [auth]);

  useEffect(() => {
    choosenSyllabusId && console.log(syllabusList[choosenSyllabusId].units);
    choosenSyllabusId && setUnits(syllabusList[choosenSyllabusId].units);
  }, [choosenSyllabusId]);

  return (
    <>
      <NavBar />
      {/* {!isAuthorized ? (
        <h1>הכניסה למנהלים בלבד</h1>
      ) : true ? ( */}
      <>
        <Grid container spacing={1} sx={{ height: '100vh', width: '100%' }}>
          {/* Right column */}
          <Grid item xs={9}>
            <Grid container spacing={1} sx={{ height: '20%' }}>
              <Grid item xs={12}>
                {selectedUnit && units && (
                  <>
                    <p style={{ fontSize: '24px', textAlign: 'right' }}>{units[selectedUnit]?.name}</p>
                    <Grid style={{ marginBottom: '5px' }}>
                      <LessonTable app={app} tasks={allTasks} unit={selectedUnit} />
                    </Grid>
                    <Grid>
                      <PracticeTable app={app} tasks={allTasks} unit={selectedUnit} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* Left column */}
          <Grid item>
            <Grid container spacing={1} sx={{ height: '20%' }}>
              <Grid item xs={10}>
                <Cell>
                  <p> סילבוס</p>
                  <Select
                    label="סילבוס"
                    value={choosenSyllabusId}
                    onChange={(e) => setChoosenSyllabus(e.target.value)}
                    dir="rtl"
                  >
                    {syllabusList &&
                      Object.entries(syllabusList).map(([id, syllabusData]) => (
                        <SelectItem key={syllabusData.id} value={syllabusData.id} dir="rtl">
                          {syllabusData.name}
                        </SelectItem>
                      ))}
                  </Select>
                </Cell>
              </Grid>
              <Grid container spacing={1} sx={{ height: '20%' }}>
                <Grid item xs={10}>
                  <Cell>
                    <p>יחידה</p>
                    <ListboxWrapper>
                      <Listbox aria-label="units" onAction={setSelectedUnit}>
                        {units && Object.keys(units).length > 0 ? (
                          Object.entries(units)
                            .sort(([, unitA], [, unitB]) => unitA.index - unitB.index)
                            .map(([id, unit]) => (
                              <ListboxItem key={id} value={unit.name} dir="rtl">
                                {unit.name}
                              </ListboxItem>
                            ))
                        ) : (
                          <ListboxItem dir="rtl" isDisabled>
                            אין יחידות
                          </ListboxItem>
                        )}
                      </Listbox>
                      {units && (
                        <AddUnitButton
                          auth={auth}
                          syllabus={choosenSyllabusId}
                          length={Object.keys(units).length}
                          setUnits={setUnits}
                        />
                      )}
                    </ListboxWrapper>
                  </Cell>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
      {/* ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )} */}
    </>
  );
};

export default Syllabus;

const ListboxWrapper = ({ children }) => (
  <div
    className="border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100"
    style={{ background: 'white', fontSize: '140px' }}
  >
    {children}
  </div>
);


const Cell = ({ children, size = '100%' }) => (
  <Paper variant="outlined" sx={{ height: '100%', width: size }}>
    <Box p={2} textAlign="center">
      {children}
    </Box>
  </Paper>
);
