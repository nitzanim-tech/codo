import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import NavBar from '../components/NavBar/NavigateBar';
import { useFirebase } from '../util/FirebaseProvider';
import getAllSyllbus from '../requests/syllabus/getAllSyllbus';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import { getUnitsBySyllabus } from '../requests/units/getUnits';
import { Listbox, ListboxItem, Button } from '@nextui-org/react';
// import { ModalFooter, useDisclosure, Modal, ModalHeader } from '@nextui-org/react';
import PracticeTable from '../components/Syllabus/PracticeTable';
import getAllTasks from '../requests/tasks/getAllTasks';
import ChooseTask from '../components/Syllabus/ChooseTask';

const Cell = ({ children }) => (
  <Paper variant="outlined" sx={{ height: '100%', width: '100%' }}>
    <Box p={2} textAlign="center">
      {children}
    </Box>
  </Paper>
);

const Syllabus = () => {
  const { app, isAuthorized } = useFirebase();

  const [units, setUnits] = useState();
  const [syllabus, setSyllabus] = useState();
  const [choosenSyllabusId, setChoosenSyllabus] = useState();
  const [selectedUnit, setSelectedUnit] = useState();
  const [allTasks, setAllTasks] = useState();

  useEffect(() => {
    const getSyllabusFromDb = async () => {
      const syllabusFromDB = await getAllSyllbus(app);
      const syllabusList = Object.entries(syllabusFromDB).map(([id, data]) => ({
        id: id,
        name: `${data.program} | ${data.heb_year}`,
      }));
      const tasksFromDB =await  getAllTasks({app});
      setAllTasks(tasksFromDB);
      setSyllabus(syllabusList);
    };
    getSyllabusFromDb();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      console.log(choosenSyllabusId);
      const syllabusUnits = await getUnitsBySyllabus({ app, syllabusId: choosenSyllabusId });
      console.log(syllabusUnits);

      setUnits(syllabusUnits);
    };
    choosenSyllabusId && fetchUnits();
  }, [choosenSyllabusId]);

  return (
    <>
      <NavBar />
      {!isAuthorized ? (
        <h1>הכניסה למנהלים בלבד</h1>
      ) : true ? (
        <>
          <Grid container spacing={1} sx={{ height: '100vh', width: '100%' }}>
            {/* Right column */}
            <Grid item xs={3}>
              <Grid container spacing={1} sx={{ height: '20%' }}>
                <Grid item xs={10}>
                  <Cell><ChooseTask tasks={allTasks}/></Cell>
                </Grid>
              </Grid>
            </Grid>

            {/* Middle column */}
            <Grid item xs={6}>
              <Grid container spacing={1} sx={{ height: '20%' }}>
                <Grid item xs={12}>
                  <Cell>
                    {selectedUnit && (
                      <>
                        <PracticeTable />
                      </>
                    )}
                  </Cell>
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
                      {syllabus &&
                        Object.entries(syllabus).map(([id, syllabusData]) => (
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
                            Object.entries(units).map(([id, unit]) => (
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
                        <Button>יחידה חדשה</Button>
                      </ListboxWrapper>
                    </Cell>
                  </Grid>
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

export default Syllabus;

const ListboxWrapper = ({ children }) => (
  <div
    className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100"
    style={{ background: 'white', fontSize: '140px' }}
  >
    {children}
  </div>
);
