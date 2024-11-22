import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { useFirebase } from '../util/FirebaseProvider';
import { Input, Select, Divider, SelectItem, CircularProgress } from '@nextui-org/react';
import { Listbox, ListboxItem, Button } from '@nextui-org/react';
import AddUnitButton from '../components/Syllabus/AddUnitButton';
import UnitTables from '../components/Syllabus/UnitTabels';
import getRequest from '../requests/anew/getRequest';
import { Unauthorized } from '../components/general/Messages';

const Syllabus = () => {
  const { userData, auth } = useFirebase();
  const [units, setUnits] = useState();
  const [syllabusList, setSyllabusList] = useState();
  const [choosenSyllabusId, setChoosenSyllabus] = useState();
  const [selectedUnit, setSelectedUnit] = useState();
  const [allTasks, setAllTasks] = useState();

  useEffect(() => {
    const getSyllabusFromDb = async () => {
      const syllabusFromDB = await getRequest({ getUrl: `getSyllabusListWithUnits` });
      const syllabusList = Object.entries(syllabusFromDB).map(([id, data]) => ({
        id: data.id,
        name: `${data.program} | ${data.hebYear}`,
        units: data.units,
      }));
      const tasksFromDB = await getRequest({ getUrl: `getTasksList` });
      setAllTasks(tasksFromDB);
      setSyllabusList(syllabusList);
    };
    userData && userData.permission > 1 && getSyllabusFromDb();
  }, [userData]);

  useEffect(() => {
    if (choosenSyllabusId) {
      const selectedSyllabus = syllabusList.find((syllabus) => syllabus.id === choosenSyllabusId);
      if (selectedSyllabus) {
        setUnits(selectedSyllabus.units);
      }
    }
  }, [choosenSyllabusId]);

  return (
    <>
      {userData?.permission < 2 ? (
        <Unauthorized text="הכניסה למנהלים בלבד" />
      ) : (
        <>
          {syllabusList ? (
            <Grid container spacing={1} sx={{ height: '100%', width: '100%', padding: '10px' }}>
              {/* Right column */}
              <Grid item xs={10}>
                {selectedUnit && units && (
                  <>
                    <p style={{ fontSize: '24px', textAlign: 'right' }}>{units[selectedUnit]?.name}</p>
                    <UnitTables tasks={allTasks} unit={selectedUnit} syllabus={choosenSyllabusId} />
                  </>
                )}
              </Grid>

              {/* Left column */}
              <Grid item xs={2}>
                <Grid item>
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

                <Grid item>
                  <Cell>
                    <p>יחידה</p>
                    <ListboxWrapper>
                      <Listbox aria-label="units" onAction={setSelectedUnit}>
                        {units && Object.keys(units).length > 0 ? (
                          Object.entries(units)
                            .sort(([, unitA], [, unitB]) => unitA.index - unitB.index)
                            .map(([id, unit]) => (
                              <ListboxItem
                                key={unit.id}
                                value={unit.name}
                                dir="rtl"
                                className={unit.id == selectedUnit && 'text-primary'}
                                color={unit.id == selectedUnit ? 'primary' : 'default'}
                              >
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
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          )}
        </>
      )}
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
