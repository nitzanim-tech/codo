import React from 'react';
import { Button } from '@nextui-org/react';
import { Paper, Box } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const DarkBlue = '#005395';
const parctice = {
  pre: [null, null, { fgghff: 'שלום עולם' }, null, { bhvcbnm: 'בלבבב' }],
  main: [
    { asdasdasd: 'שלום עdsdsולם' },
    { dasdasad: 'שלוםsdsd עולם' },
    { asdda: 'שלוdsffdsם עולם' },
    null,
    { bhvchbnm: 'בלבבב' },
  ],
};

const Cell = ({ children, color }) => (
  <Paper variant="outlined" sx={{ height: '100%', width: '100%', backgroundColor: color }}>
    <Box p={2} textAlign="center">
      <p>{children}</p>
    </Box>
  </Paper>
);

export default function PracticeTable() {
  const renderCellContent = (content) => {
    if (content) {
      return (
        <>
          {Object.values(content)[0]}
          <Button color="primary" variant="light" radius="full" isIconOnly onClick={() => {}}  size="sm">
            <CloseRoundedIcon />
          </Button>
        </>
      );
    }
    return (
      <Button  variant="light" radius="full" isIconOnly onClick={() => {}} size="sm">
        <AddRoundedIcon />
      </Button>
    );
  };

  return (
    <div style={{ width: '100%', textAlign: 'right', direction: 'rtl' }}>
      <table style={{ width: '100%', tableLayout: 'fixed' }}>
        <tbody>
          <tr>
            {parctice.pre.map((item, index) => (
              <td key={index}>
                <Cell color={item ? 'green' : null}>{renderCellContent(item)}</Cell>
              </td>
            ))}
          </tr>
          <tr>
            {parctice.main.map((item, index) => (
              <td key={index}>
                {index}
                <Cell color={item ? '#005395' : '#0067BC'}>{renderCellContent(item)}</Cell>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
