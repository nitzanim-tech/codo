import React from 'react';
import BombIcon from '../../../assets/svg/tasks/bomb.svg';

export function getTaskExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            מספר ראשון: {selectedValue.input.fisrt + ', '}
            מספר שני: {selectedValue.input.second + '.'}
            <br />
            מהלך המשחק:
            <br />
          </p>
          <BoomTable gameString={selectedValue.ans} />
          <p>
            <br />
            ההדפסה האחרונה בקוד שכתבת:
            <br />
            {selectedValue.output}
          </p>
          {selectedValue.correct ? <p>מתאימה לפלט הנדרש. כל הכבוד!</p> : <p>לא מתאימה לפלט. נסו שוב :)</p>}{' '}
        </div>
      )}
    </>
  );
} 

const BoomTable = ({ gameString }) => {
  const items = gameString.split('\n');

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', direction: 'ltr' }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            {items.map((item, index) => (
              <td
                key={`t-${index}`}
                style={{
                  border: '1px solid black',
                  padding: '2px',
                  textAlign: 'center',
                  width: '45px',
                }}
              >
                {item.toLowerCase() === 'b' ? (
                  <img key={`bomb-${index}`} src={BombIcon} alt="Bomb" style={{ width: '45px', fill: 'blue' }} />
                ) : (
                  item
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
  const answers = [
    `B\n64\n65\n66\nB\n68\n69\nB\nB\nB`,
    '1\n2\n3\n4\n5\n6\nB\n8\n9\n10',
    'Error',
    'B',
    'B\nB\nB\nB\nB\nB\nB\nB',
  ];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = { fisrt: parseInt(inputLines[0]), second: parseInt(inputLines[1]) };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines.slice(2).join(' ');
    const transformOutput = output.replace(/\s+/g, '').replace(/Boom|boom/g, 'B');
    const correct =
      index != 2
        ? transformOutput == answers[index].replace(/\s+/g, '')
        : transformOutput.toLowerCase().includes('error');
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
  });
}

const ans = `
first = int(input('First number:'))
second = int(input('Second number:'))
if first > second:
    print('Error')
else:
    for i in range (first,second+1):
        if i//10==7 or i%10==7 or i%7==0:
            print('Boom')
        else:
            print(i)
`;