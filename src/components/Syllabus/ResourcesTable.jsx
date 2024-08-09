import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { defaultPractice, deleteItem } from './tableHandler';
import savePractice from '../../requests/practice/savePractice';
import { Cell, CellContent } from './PracticeTableElements';
import AddReource from './AddReourceButton';
import { useFirebase } from '../../util/FirebaseProvider';
import getRequest from '../../requests/anew/getRequest';
import { CircularProgress } from '@nextui-org/react';
import { ResourcesIcons } from './ResoucresIcons';

const ResourcesTable = ({ task, unit, syllabus, setClicked }) => {
  const { auth } = useFirebase();
  const [resources, setResources] = useState();
  const [clickedCell, setClickedCell] = useState();

  useEffect(() => {
    const fetchPractice = async () => {
      const recorcesFromLocalstroge = localStorage.getItem(`resources_${unit}`);
      console.log(unit);
      const ResurcesFromDb = await getRequest({ getUrl: `getResourcesByUnit/?unit=${unit}` });
      console.log({ ResurcesFromDb });
      if (recorcesFromLocalstroge) setResources(JSON.parse(recorcesFromLocalstroge));
      else if (ResurcesFromDb) setResources(ResurcesFromDb);
      else setResources([]);
    };

    fetchPractice();
  }, [unit]);

  // useEffect(() => {
  //   if (chosenTask && clickedCell) {
  //     const newPractice = addItem(practice, clickedCell, chosenTask);
  //     localStorage.setItem(`lesson_${unit}`, JSON.stringify(newPractice));
  //     setLesson(newPractice);
  //     setChosenTask(null);
  //     setClickedCell(null);
  //   }
  // }, [chosenTask, clickedCell, practice]);

  const handleDelete = (content) => {
    const updatedPractice = deleteItem(practice, content);
    setResources(updatedPractice);
  };

  const handleClick = (column, type, row = null) => {
    setClicked(true);
    setClickedCell({ column, type, row });
  };

  const handleSave = async () => {
    const success = await savePractice({ app, practice, unit });
    if (success) {
      console.log('saved successfully');
      localStorage.removeItem(`practice_${unit}`);
    } else {
      console.log('ERROR');
    }
  };

  const cellStyle = { width: '16.66%' };
  const colElements = Array.from({ length: 6 }, (_, index) => <col key={index} style={{ width: '16.66%' }} />);

  return (
    <Grid item>
      <Cell>
        <p>מהלך המפגש</p>
        {resources ? (
          <table style={{ width: '95%', tableLayout: 'fixed', direction: 'rtl' }}>
            <colgroup>{colElements}</colgroup>
            <tbody>
              <tr key={0}>
                {Object.entries(resources).map(([id, resource]) => (
                  <td key={id} style={cellStyle}>
                    <Cell>
                      <ResourcesIcons type={resource.type} />
                      <CellContent content={resource} handleDelete={handleDelete} />
                    </Cell>
                  </td>
                ))}
                <td key={'add'} style={cellStyle}>
                  <Cell>
                    <AddReource auth={auth} unitId={unit} syllabusId={syllabus} index={0} />
                  </Cell>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        )}
      </Cell>
    </Grid>
  );
};

export default ResourcesTable;
