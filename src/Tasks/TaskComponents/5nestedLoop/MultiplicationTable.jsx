import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const generateMultiTable = (size) => {
  const multiTable = [];
  for (let i = 1; i < +size + 1; i++) {
    for (let j = 1; j < +size + 1; j++) {
      multiTable.push(i * j);
    }
  }
  return multiTable;
};

function CompareLinesTable({ size, output }) {
  const multiTable = generateMultiTable(size);
  const rows = multiTable.map((value, index) => {
    const expected = value.toString();
    const actual = output[index] || '';
    const result = actual.includes(expected) ? (
      <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
    ) : (
      <CancelRoundedIcon sx={{ color: '#BF1E2E' }} />
    );
    return (
      <tr key={index}>
        <td
          style={{
            marginLeft: '20px',
            textAlign: 'center',
          }}
        >
          {result}
        </td>{' '}
        <td>{index + 2}</td>
        <td>{actual}</td>
        <td>{value}</td>
      </tr>
    );
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table style={{ fontFamily: 'yarden', fontSize: '100%', textAlign: 'center', padding: '7px' }}>
        <thead>
          <tr>
            <th> </th>
            <th>מס' שורה |</th>
            <th>פלט הקוד |</th>
            <th>פלט רצוי </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>{' '}
    </div>
  );
}

export function getTaskExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          {selectedValue.input.size > 0 ? (
            <>
              <p>
                נבדוק את הפלט שורה שורה:
                <br />
              </p>
              <CompareLinesTable size={selectedValue.input.size} output={selectedValue.output} />
            </>
          ) : (
            <p>המספר שלילי והפלט של הקוד שכתבת: {selectedValue.output.join(' ')} אמור להכיל את המילה 'error'</p>
          )}
          <br />
          {selectedValue.correct ? <p>ולכן תשובך נכונה. כל הכבוד!</p> : <p>ולכן תשובתך לא נכונה. נסו שוב :)</p>}{' '}
        </div>
      )}
    </>
  );
}

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);

  const generateMultiTable = (size) => {
    const multiTable = [];
    for (let i = 1; i < +size + 1; i++) {
      for (let j = 1; j < +size + 1; j++) {
        multiTable.push(i * j);
      }
    }
    return multiTable;
  };

  function checkAns({ outputLines, size }) {
    if (size < 0) return outputLines.join('').toLowerCase().includes('error');
    const multiTable = generateMultiTable(size);
    for (let i = 0; i < Math.min(outputLines.length, multiTable.length); i++) {
      if (!outputLines[i].includes(multiTable[i])) {
        return false;
      }
    }
    return true;
  }
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      size: inputLines[0],
    };
    const outputLines = testsOutput.output.split('\n').slice(1);
    const output = outputLines;
    const correct = checkAns({ outputLines, size: input.size });
    const name = names[index];
    return { name, input, output, correct, ans: '' };
  });
}
const ans = `
size = int(input('Enter borad size: '))
for i in range(1,size+1):
    for j in range(1,size+1):
        print(str(i)+'X'+str(j)+'='+str(i*j))
`;
