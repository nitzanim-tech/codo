import React from 'react';

// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['while', 'רשימות', 'תנאים'];
}

export function desription() {
  return (
    <>
      <p>
        Wordle הוא משחק ניחוש מילים שכבש את העולם. במשחק, עליכם לנחש מילה סודית בת 5 אותיות. לאחר כל ניחוש, כל אות מקבלת
        צבע:
        <br />
        אפור – אם האות אינה חלק מהמילה הסודית
        <br />
        כתום – אם האות היא חלק מהמילה אבל לא בעמדה שניחשתם
        <br />
        ירוק – אם האות נמצאת בעמדה הנכונה שניחשתם
        <br />
        לדוגמה, אם המילה הסודית היא "lists" והניחוש הוא "light", האותיות l ו-i יהיו ירוקות, האותיות g ו-h יהיו אפורות,
        והאות t תהיה כתומה.
        <br /> <br />
        בתרגיל זה, תאפשרו למשתמש ניחוש אחד בלבד (בהמשך נלמד איך לאפשר מספר ניחושים).
        <b>ממשו סיבוב אחד של המשחק וורדל עם המילה הסודית "lists".</b> <br />
        לאחר שהמשתמש מנחש מילה, הדפיסו את צבעי האותיות כמשוב. שימו לב שמותרות רק מילים בנות 5 אותיות.
        <br />
        <u>דגשים:</u>
        <br />
        ● אם המילה שניחש הכילה מספר אותיות שגוי, הדפיסו כמה אותיות יש במילה שלו
        <br />
        ● אם המשתמש ניחש נכון, הדפיסו "Correct"
        <br />
        ● אם מספר האותיות נכון אבל הניחוש שגוי, הדפיסו את הצבע (ירוק, כתום, אפור) ואז את כל האותיות באותו הצבע
        <br />
      </p>
    </>
  );
}
export function examples() {
  return (
    <>
      <p style={{ textAlign: 'left' }}>
        <p style={{ textAlign: 'right', dir: 'rtl' }}>
          {' '}
          דוגמה 1:
          <br />{' '}
        </p>
        <code>
          Enter guess:
          <span style={{ color: '#003061' }}>
            <b> python</b>
          </span>
          <br />
          Your guess has 6 letters and should have 5<br />
        </code>
        <p style={{ textAlign: 'right', dir: 'rtl' }}>
          <br />
          דוגמה 2:
          <br />{' '}
        </p>
        <code>
          Enter guess:
          <span style={{ color: '#003061' }}>
            <b> light</b>
          </span>
          <br />
          Green letters: ['l', 'i']
          <br />
          Orange letters: ['t']
          <br />
          Gray letters: ['g', 'h']
          <br />
        </code>

        <p style={{ textAlign: 'right', dir: 'rtl' }}>
          {' '}
          דוגמה 3:
          <br />{' '}
        </p>
        <code>
          Enter guess:
          <span style={{ color: '#003061' }}>
            <b> lists</b>
          </span>
          <br />
          !Correct
          <br />
        </code>
      </p>
    </>
  );
}

// RunTestButton.jsx
export function testsName() {
  return [
    'פחות מ5 אותיות',
    'יותר מ5 אותיות',
    'מילה נכונה',
    'אותיות אפורות',
    'אותיות כתומות',
    'אותיות ירוקות',
    'שילוב של כמה סוגי אותיות',
  ];
}
export function getTaskTests() {
  return { generateInputList, processTestsOutputs: (testsOutputs) => processTestsOutputs(testsOutputs) };
}
export function generateInputList() {
  return ['ben', 'supercalifragilisticexpialidocious', 'lists', 'crane', 'climb', 'liked', 'light'];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = [
    { lastLine: '3' },
    { lastLine: '34' },
    { green: 'list', lastLine: 'correct' },
    { gray: 'crane' },
    { orange: 'li', gray: 'cmb' },
    { green: 'li', gray: 'ked' },
    { green: 'li', orange: 't', gray: 'gh' },
  ];

  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      word: inputLines[0],
    };
    const outputLines = testsOutput.output.split('\n');

    const output = {
      lastLine: outputLines[outputLines.length - 2],
      gray: outputLines.find((line) => line.includes('gray') || line.includes('Gray')) || null,
      orange: outputLines.find((line) => line.includes('orange') || line.includes('Orange')) || null,
      green: outputLines.find((line) => line.includes('green') || line.includes('Green')) || null,
    };

    function checkColor(output, color, answer) {
      if (output[color] === null) {
        return false;
      }
      for (const letter of answer) {
        if (!output[color].replace(new RegExp(color, 'gi'), '').includes(letter)) {
          return false;
        }
      }
      return true;
    }
    const correct = (index) => {
      switch (index) {
        case 0:
        case 1:
        case 2:
          return output.lastLine.toLowerCase().includes(answers[index].lastLine);
        case 3:
          return checkColor(output, 'gray', answers[index].gray);
        case 4:
          return checkColor(output, 'orange', answers[index].orange) && checkColor(output, 'gray', answers[index].gray);
        case 5:
          return checkColor(output, 'green', answers[index].green) && checkColor(output, 'gray', answers[index].gray);
        case 6:
          return (
            checkColor(output, 'green', answers[index].green) &&
            checkColor(output, 'orange', answers[index].orange) &&
            checkColor(output, 'gray', answers[index].gray)
          );
      }
    };
    const name = names[index];
    return { name, input, output, correct: correct(index), ans: answers[index] };
  });
}

// TestsList.jsx
export function getTaskExplanation() {
  return { generateExplanation: (selectedValue) => generateExplanation(selectedValue) };
}
export function generateExplanation(selectedValue) {
  const isColorExist = (output) => output.green || output.orange || output.gray;
  function ShowAns({ output }) {
    return (
      <>
        {isColorExist(output) ? (
          <>
            <p>בהדפסות בקוד שכתבת:</p>
            {Object.entries(output).map(([key, value]) => {
              if (value !== null && key != 'lastLine') {
                return (
                  <p key={key} dir="ltr">
                    {key}: {value}
                  </p>
                );
              }
              return null;
            })}
          </>
        ) : (
          <p>בשורה האחרונה בהדפסה: {output.lastLine} </p>
        )}
      </>
    );
  }

  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            עבור הקלט - {selectedValue.input.word} ,
            <br />
            הפתרון הוא {!isColorExist(selectedValue.output) && selectedValue.ans.lastLine}
            <br />
            <WordleTable colorMap={selectedValue.ans} word={selectedValue.input.word} />
            <br />
            <ShowAns output={selectedValue.output} />
          </p>
          {selectedValue.correct ? <p>מוכל הפתרון. כל הכבוד!</p> : <p>לא מוכל הפתרון. נסו שוב :)</p>} <br />
        </div>
      )}
    </>
  );
}

const WordleTable = ({ colorMap, word }) => {
  const getColor = (letter) => {
    if (colorMap.green && colorMap.green.includes(letter)) {
      return '#6AAA64';
    } else if (colorMap.orange && colorMap.orange.includes(letter)) {
      return '#C9B458';
    } else if (colorMap.gray && colorMap.gray.includes(letter)) {
      return '#787C7E';
    }
    return 'white';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {(colorMap.green || colorMap.orange || colorMap.gray) && (
        <table style={{ borderCollapse: 'collapse', direction: 'ltr' }}>
          <tbody>
            <tr>
              {word.split('').map((letter, index) => (
                <td
                  key={index}
                  style={{
                    backgroundColor: getColor(letter),
                    color: 'white',
                    width: '50px',
                    height: '50px',
                    fontSize: '20px',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  {letter}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

const ans = `
gray_list = []
orange_list = []
green_list =[]
index = 0
SECRETE_WORD = 'lists'
word = input('Enter guess:')
if len(word)!=5:
    print(len(word))
else:
    if word == 'lists':
        print('Correct')
    else: 
        while index < len(SECRETE_WORD):
            if word[index] in SECRETE_WORD[index]:
                green_list.append(word[index])
            else:
                if word[index] in SECRETE_WORD:
                    orange_list.append(word[index])
                else:
                    gray_list.append(word[index])
            index +=1
        print("Green letters: " + str(green_list))
        print("Orange letters: " + str(orange_list))
        print("Gray letters: " + str(gray_list))`;
