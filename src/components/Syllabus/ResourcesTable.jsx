import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { defaultPractice, deleteItem } from './tableHandler';
import savePractice from '../../requests/practice/savePractice';
import { Cell } from './PracticeTableElements';
import AddUnitReource from './AddReource';
import { useFirebase } from '../../util/FirebaseProvider';

const ResourcesTable = ({ task, unit, syllabus, setClicked }) => {
  const { auth } = useFirebase();

  const [lessonsList, setLesson] = useState();
  const [clickedCell, setClickedCell] = useState();

  useEffect(() => {
    const fetchPractice = async () => {
      // const savedLesson = localStorage.getItem(`lesson_${unit}`);
      // const lessonsFromDb = await getLessons({ app, unit });
      // if (savedLesson) setLesson(JSON.parse(savedLesson));
      // else if (lessonsFromDb) setLesson(lessonsFromDb);
      // else setLesson(defaultPractice);
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
    setLesson(updatedPractice);
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
    <Grid item >
      <Cell>
        <p>מהלך המפגש</p>
        {lessonsList && (
          <table style={{ width: '95%', tableLayout: 'fixed', direction: 'rtl' }}>
            <colgroup>{colElements}</colgroup>
            <tbody>
              <tr key={0}>
                {/* {Object.entries([data]).map(([id, material]) => (
                  <td key={id} style={cellStyle}>
                    <Cell>
                      <CellContent content={material} handleDelete={handleDelete} />
                    </Cell>
                  </td>
                ))} */}
                <td key={'add'} style={cellStyle}>
                  <Cell>
                    <AddUnitReource auth={auth} unitId={unit} syllabusId={syllabus} index={0} />
                  </Cell>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </Cell>
    </Grid>
  );
};

export default ResourcesTable;
