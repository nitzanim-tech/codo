import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { deleteItem } from './tableHandler';
import { Cell, CellContent } from './PracticeTableElements';
import AddReource from './AddResourceButton';
import { useFirebase } from '../../util/FirebaseProvider';
import getRequest from '../../requests/anew/getRequest';
import { CircularProgress } from '@nextui-org/react';

const ResourcesTable = ({ resources, unit, syllabus, setClicked }) => {
  // const handleDelete = (content) => {
  //   const updatedPractice = deleteItem(practice, content);
  //   setResources(updatedPractice);
  // };

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
                      <CellContent content={resource} handleDelete={handleDelete} />
                    </Cell>
                  </td>
                ))}
                <td key={'add'} style={cellStyle}>
                  <Cell>
                    <AddReource unitId={unit} syllabusId={syllabus} index={0} setClicked={setClicked} />
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
