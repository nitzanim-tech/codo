import React from 'react';
import BombIcon from '../assets/svg/tasks/bomb.svg';

export function testsName() {
  return ['המספרים שבדוגמה', 'התחלה מ1', 'מספר שני קטן מהראשון', 'מספר יחיד', 'רצף של בום'];
}

// TestsList.jsx
export function getTaskExplanation() {
  return { generateExplanation: (selectedValue) => generateExplanation(selectedValue) };
}
export function generateExplanation(selectedValue) {
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

// RunTestButton.jsx
export function getTaskTests() {
  return { generateInputList, processTestsOutputs: (testsOutputs) => processTestsOutputs(testsOutputs) };
}
export function generateInputList() {
  return ['63\n72\n', '1\n10\n', '80\n70\n', '7\n7\n', '70\n77\n'];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = [
    `B\n64\n65\n66\nB\n68\n69\nB\nB\nB`,
    '1\n2\n3\n4\n5\n6\nB\n8\n9\n10',
    'Error',
    'B',
    'B\nB\nB\nB\nB\nB\nB\nB',
  ];

  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      fisrt: parseInt(inputLines[0]),
      second: parseInt(inputLines[1]),
    };
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
// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['אופרטורים', 'תנאים', 'for'];
}
export function desription() {
  return (
    <>
      <p>
        שבע בום. החוקים פשוטים:
        <br />
        סופרים את כל המספרים השלמים ממספר אחד עד מספר שני, אך אם מגיעים למספר ש<b> מתחלק ב-7 או מכיל את הספרה 7</b>
        , מחליפים אותו במילה "Boom" וממשיכים למספר הבא.
        <br />
        קלוט מהמשתמש 2 מספרים, והדפס את מהלך המשחק מהמספר הראשון (כולל) עד המספר השני (כולל).
        <br />
        <br />
        <u> דגשים:</u>
        <br />
        ● מובטח שהמספרים שתקבלו יהיו שלמים בין 0 ל100
        <br />● אם המספר הראשון שתקבלו גדול מהשני, הדפיסו 'Error'
      </p>
    </>
  );
}
export function examples() {
  return (
    <>
      <p style={{ textAlign: 'left', dir: 'rtl' }}>
        <code>
          First number:
          <span style={{ color: '#003061' }}>
            <b> 63</b>
          </span>
          <br /> Second number:
          <span style={{ color: '#003061' }}>
            <b> 72</b>
          </span>
          <br /> Boom
          <br /> 64
          <br /> 65
          <br /> 66
          <br /> Boom
          <br /> 68
          <br /> 69
          <br /> Boom
          <br /> Boom
          <br /> Boom
        </code>
      </p>
      <br />
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