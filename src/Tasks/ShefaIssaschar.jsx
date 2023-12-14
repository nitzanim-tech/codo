import React from 'react';
import BombIcon from '../assets/svg/tasks/bomb.svg';
import Grid from '@mui/material/Grid';

export function testsName() {
  return ['המספר שבדוגמה', 'מסיים לפני ששוני מפריעה', 'מסיים בטווח ההפרעה', 'מסיים בהפרעה האחרונה', 'מסיים לאחר כל ההפרעות'];
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
            מספר ראשון: {selectedValue.input.num + ', '}
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
  return ['50\n','10\n','22\n', '24\n', '40\n'];
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
      num: parseInt(inputLines[0]),
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
  return ['counter', 'לולאה מקוננת', 'for'];
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
      </p>
    </>
  );
}

export function examples() {
  return (
    <>
      <div dir='ltr' style={{ textAlign: 'left' }}>
        <code>
          Enter the number of products Ramsey have to count:{' '}
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
products_num = int(input("Please enter the number of products Ramsey needs to count: "))
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
        print("Shuni interrupts, starting from the beginning")

for current_index in range(1, products_num + 1):
    if current_index % 3 == 0:
        questions_counter += 1
        print(str(current_index) + " Q?")
    else:
        print(str(current_index))

print("The number of questions for Shira: " + str(questions_counter))
`;
