import React from 'react';
import AngryIcon from '../../../assets/svg/tasks/angry-woman.svg';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export function getTaskExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            עבור כמות המוצרים: {selectedValue.input.num + ', '}
            מהלך הספירה:
            <br /> <br />
          </p>
          <TableAA number={selectedValue.input.num} />
          <br />
          <p>סכום השאלות {selectedValue.ans.questions}</p>
          <p>בקוד שכתבת,</p>
          {
            <>
              <div style={{ display: 'flex' }}>
                {selectedValue.reasonPass.sum ? (
                  <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
                ) : (
                  <CancelRoundedIcon sx={{ color: '#BF1E2E' }} />
                )}
                <p>כל המספרים הודפסו</p>
              </div>
              <div style={{ display: 'flex' }}>
                {selectedValue.reasonPass.questions ? (
                  <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
                ) : (
                  <CancelRoundedIcon sx={{ color: '#BF1E2E' }} />
                )}
                <p>סכום השאלות נכון</p>
              </div>
            </>
          }
          {selectedValue.correct ? <p>כל הכבוד!</p> : <p>נסו שוב :)</p>}{' '}
        </div>
      )}
    </>
  );
}



const TableAA = ({ number }) => {
  const interrupts = [20, 21, 22, 23, 24];
  const numbers = [];
  interrupts.forEach((inter) => {
    number > inter && numbers.push(inter);
  });
  numbers.push(number);
  return (
    <>
      {numbers.map((number, index) => {
        const rows = [];
        let currentRow = [];
        for (let i = 1; i <= number; i++) {
          currentRow.push(i);
          if (i % 9 === 0) {
            rows.push(currentRow);
            currentRow = [];
          }
        }

        if (currentRow.length > 0) {
          rows.push(currentRow);
        }

        return (
          <table key={index}>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, index) => (
                    <td
                      key={index}
                      style={{
                        padding: '2px',
                        textAlign: 'center',
                        width: '45px',
                        color: cell % 3 === 0 ? 'white' : '',
                        backgroundColor: cell % 3 === 0 ? '#BF1E2E' : 'white',
                        border: '1px solid black',
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                  {interrupts.includes(row[row.length - 1]) ? (
                    <td>
                      <img src={AngryIcon} alt="Angry" style={{ width: '30px' }} />
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        );
      })}
    </>
  );
};

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
  function checkAns({ outputLines, answer }) {
    const lines = outputLines.map((line) => line.replace(/[^0-9]/g, ''));
    const lastLine = lines[lines.length - 2];
    const nonEmptyLines = lines.filter(Boolean);
    const sum = nonEmptyLines.slice(0, -1).reduce((acc, curr) => acc + parseInt(curr), 0);
    return { questions: lastLine == answer.questions, sum: sum == answer.sum };
  }
  const answers = [
    { questions: 51, sum: 2545 },
    { questions: 3, sum: 55 },
    { questions: 20, sum: 694 },
    { questions: 35, sum: 1270 },
    { questions: 48, sum: 2090 },
  ];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = { num: parseInt(inputLines[0]) };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines.slice(2).join(' ');
    const reasonPass = checkAns({ outputLines, answer: answers[index] });
    const correct = reasonPass.sum && reasonPass.questions;
    const name = names[index];
    return { name, input, output, correct, ans: answers[index], reasonPass: reasonPass };
  });
}

const ans = `
products_num = int(input("Please enter the number of products: "))
questions_counter = 0
for interrupt_index in range(20, 25):
        for current_index in range(1, interrupt_index+1):
            if current_index % 3 == 0:
                questions_counter += 1
                print(str(current_index) + " Q?")
            else:
                print(str(current_index))
            if current_index >= products_num:
                break
        if current_index >= products_num:
            break
        else:
            print("Shuni interrupts")
if products_num > 24:
    for current_index in range(1, products_num + 1):
        if current_index % 3 == 0:
            questions_counter += 1
            print(str(current_index) + " Q?")
        else:
            print(str(current_index))

print("Questions: " + str(questions_counter))
`;
