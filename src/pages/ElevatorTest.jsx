import React from 'react';
import elevatorImg from "../assets/img/elevator/elevator.png";
import childImg from "../assets/img/elevator/child.png";

const ElevatorTable = (props) => {
  const { init, test } = props;
  const rows = Array.from({ length: 8 }, (_, i) => i + 1);
  const columns = Array.from({ length: 3 }, (_, i) => i);

  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        {rows.map((row) => (
          <tr key={row}>
            {columns.map((column) => (
              <td key={column} style={{ border: '1px solid black', width: '50px', height: '50px' }}>
                {(column === 0 && row === init[0]) && <img src={elevatorImg} alt="elevator" style={{ width: '100%', height: '100%' }} />}
                {(column === 2 && row === init[1]) && <img src={elevatorImg} alt="elevator" style={{ width: '100%', height: '100%' }} />}
                {(column === 1 && row === test[0].from) && <img src={childImg} alt="child" style={{ width: '100%', height: '100%' }} />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ElevatorTable;
