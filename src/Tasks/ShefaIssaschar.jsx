import React from 'react';
import AngryIcon from '../assets/svg/tasks/angry-woman.svg';
import Grid from '@mui/material/Grid';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export function testsName() {
  return [
    'המספר שבדוגמה',
    'מסיים לפני ששוני מפריעה',
    'מסיים בטווח ההפרעה',
    'מסיים בהפרעה האחרונה',
    'מסיים לאחר כל ההפרעות',
  ];
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

// RunTestButton.jsx
export function getTaskTests() {
  return { generateInputList, processTestsOutputs: (testsOutputs) => processTestsOutputs(testsOutputs) };
}
export function generateInputList() {
  return ['50\n', '10\n', '22\n', '24\n', '40\n'];
}

function checkAns({ outputLines, answer }) {
  const lines = outputLines.map((line) => line.replace(/[^0-9]/g, ''));
  const lastLine = lines[lines.length - 2];
  const nonEmptyLines = lines.filter(Boolean);
  const sum = nonEmptyLines.slice(0, -1).reduce((acc, curr) => acc + parseInt(curr), 0);
  return { questions: lastLine == answer.questions, sum: sum == answer.sum };
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = [
    { questions: 51, sum: 2545 },
    { questions: 3, sum: 55 },
    { questions: 20, sum: 694 },
    { questions: 35, sum: 1270 },
    { questions: 48, sum: 2090 },
  ];

  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      num: parseInt(inputLines[0]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines.slice(2).join(' ');
    const reasonPass = checkAns({ outputLines, answer: answers[index] });
    const correct = reasonPass.sum && reasonPass.questions;
    const name = names[index];
    return { name, input, output, correct, ans: answers[index], reasonPass: reasonPass };
  });
}
// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['counter', 'לולאות', 'אלגוריתמיקה'];
}
export function desription() {
  return (
    <>
      <p>
        ראמזי עבד ראמזי הוא עובד מסור ברשת הקמעונאית "שפע יששכר" בסניף יבנה. היום ראמזי יספור את המלאי בסופר, אך הדרך
        לשם לא תהיה קלה! שוני סטרטינר, אחת הלקוחות בסופר מבקשת את עזרתו בבחירת מוצרים, ובכך מפריעה לו בספירה. ראמזי חסר
        בטחון ושואל את שירה שיינטבוך, מנהלת הסופר, המון שאלות. לשירה נמאס מכמות השאלות העצומה שלו, ולכן היא החליטה לספור
        כמה שאלות שאל אותה בכל יום. בואו נעזור לשירה לספור כמה שאלות ראמזי שואל אותה ביום נתון. <br />
        לכל מוצר ראמזי נותן מספר סידורי שמתחיל מ1 ועולה בכל פעם. כל פעם שראמזי מגיע למוצר שמספרו הסידורי מתחלק ב3 הוא
        ניגש לשירה ושואל אותה שאלה.
        <br />
        כאשר שוני סטרטינר מבקשת את עזרתו של ראמזי היא מבלבלת אותו ומאלצת אותו להתחיל את הספירה מחדש. <br />
        תחילה, שוני מחכה שראמזי יגיע למוצר ה20, ואז ניגשת אליו. בפעם הבאה שוני מחכה למוצר ה21, וכך גם עבור המוצר ה22,
        23, וה24. כאשר ראמזי מגיע למספר ה25 שוני מסיימת את הקניה וראמזי יכול לסיים את הספירה ללא הפרעות. <br />
        שימו לב- גם כאשר ראמזי חוזר על הספירה, הוא ממשיך לשאול את שירה שאלות, גם עבור מוצר שכבר ספר וששאל את שירה עליו.{' '}
        <br />
        <b>אז מה אתם צריכים לעשות?</b>
        <br />
        ראשית, קלטו מהמשתמש כמה מוצרים ראמזי צריך לספור היום. לאחר מכן, הדפיסו כל מספר שראמזי סופר. כמו כן, הדפיסו הודעה
        על בכל פעם שראמזי שואל שאלה ובכל פעם ששוני מפריעה. לבסוף הדפיסו את מספר השאלות שנשאלו.
        <br />
        <u> דגשים:</u>
        <br />● מובטח שהמספרים שיתקבלו יהיו שלמים
        <br />● יש להדפיס את כל המספרים שרמזי סופר
        <br />● בשורה האחרונה יש להדפיס את מספר השאלות שנשאלו
      </p>
    </>
  );
}

export function examples() {
  return (
    <>
      <p>
        (חילקנו עבורכם את הפלט לעמודות, והוספנו סימון באינקדסים של השאלות כדי שיהיה קל לעקוב)
        <br /> <br />
      </p>
      <div dir="ltr" style={{ textAlign: 'left' }}>
        <code>
          Enter the number of products Ramzi has to count:{' '}
          <span style={{ color: '#003061' }}>
            <b> 50</b>
          </span>
        </code>
        <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-start">
          <Grid>
            <>
              <code>
                1<br />
                2<br />
                3 Q?
                <br />
                4<br />
                5<br />
                6 Q?
                <br />
                7<br />
                8<br />
                9 Q?
                <br />
                10
                <br />
                11
                <br />
                12 Q?
                <br />
                13
                <br />
                14
                <br />
                15 Q?
                <br />
                16
                <br />
                17
                <br />
                18 Q?
                <br />
                19
                <br />
                20
                <br />
                Shuni
              </code>
            </>
          </Grid>
          <Grid>
            <>
              <code>
                1<br />
                2<br />
                3 Q?
                <br />
                4<br />
                5<br />
                6 Q?
                <br />
                7<br />
                8<br />
                9 Q?
                <br />
                10
                <br />
                11
                <br />
                12 Q?
                <br />
                13
                <br />
                14
                <br />
                15 Q?
                <br />
                16
                <br />
                17
                <br />
                18 Q?
                <br />
                19
                <br />
                20
                <br />
                21 Q?
                <br />
                Shuni
              </code>
            </>
          </Grid>
          <Grid>
            <>
              <code>
                1<br />
                2<br />
                3 Q?
                <br />
                4<br />
                5<br />
                6 Q?
                <br />
                7<br />
                8<br />
                9 Q?
                <br />
                10
                <br />
                11
                <br />
                12 Q?
                <br />
                13
                <br />
                14
                <br />
                15 Q?
                <br />
                16
                <br />
                17
                <br />
                18 Q?
                <br />
                19
                <br />
                20
                <br />
                21 Q?
                <br />
                22
                <br />
                Shuni
              </code>
            </>
          </Grid>
          <Grid>
            <>
              <code>
                1<br />
                2<br />
                3 Q?
                <br />
                4<br />
                5<br />
                6 Q?
                <br />
                7<br />
                8<br />
                9 Q?
                <br />
                10
                <br />
                11
                <br />
                12 Q?
                <br />
                13
                <br />
                14
                <br />
                15 Q?
                <br />
                16
                <br />
                17
                <br />
                18 Q?
                <br />
                19
                <br />
                20
                <br />
                21 Q?
                <br />
                22
                <br />
                23
                <br />
                Shuni
              </code>
            </>
          </Grid>
          <Grid>
            <>
              <code>
                1<br />
                2<br />
                3 Q?
                <br />
                4<br />
                5<br />
                6 Q?
                <br />
                7<br />
                8<br />
                9 Q?
                <br />
                10
                <br />
                11
                <br />
                12 Q?
                <br />
                13
                <br />
                14
                <br />
                15 Q?
                <br />
                16 <br />
                17
                <br />
                18 Q?
                <br />
                19
                <br />
                20
                <br />
                21 Q?
                <br />
                22
                <br />
                23
                <br />
                24 Q?
                <br />
                Shuni
              </code>
            </>
          </Grid>
          <Grid>
            <>
              <code>
                1<br />
                2<br />
                3 Q?
                <br />
                4<br />
                5<br />
                6 Q?
                <br />
                7<br />
                8<br />
                9 Q?
                <br />
                10
                <br />
                11
                <br />
                12 Q?
                <br />
                13
                <br />
                14
                <br />
                15 Q?
                <br />
                16
                <br />
                17
                <br />
                18 Q?
                <br />
                19
                <br />
                20
                <br />
                21 Q?
                <br />
                22
                <br />
                23
                <br />
                24 Q?
                <br />
                25
                <br />
                26
                <br />
                27 Q?
                <br />
                28
                <br />
                29
                <br />
                30 Q?
                <br />
                31
                <br />
                32
                <br />
                33 Q?
                <br />
                34
                <br />
                35
                <br />
                36 Q?
                <br />
                37
                <br />
                38
                <br />
                39 Q?
                <br />
                40
                <br />
                41
                <br />
                42 Q?
                <br />
                43
                <br />
                44
                <br />
                45 Q?
                <br />
                46
                <br />
                47
                <br />
                48 Q?
                <br />
                49
                <br />
                50
              </code>
            </>
          </Grid>
        </Grid>
        <br />
        <code>Questions for Shira: 51</code>
      </div>
      <p>
        מכוון שאם נספור את כל השאלות, נגיע למספר 51
        <br /> <br />
      </p>
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
