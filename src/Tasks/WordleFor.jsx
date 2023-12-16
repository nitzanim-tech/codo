import React from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['לולאות מקוננות', 'רשימות', 'for', 'while'];
}

export function desription() {
  return (
    <>
      <p>
        Wordle, התגעתגעתם?
        <br />
        אותם כללים, עם כמה דגשים חדשים <br />
        <u>דגשים:</u>
        <br />
        ● לפני המשחק, יש לקלוט מהמשתמש את המילה הסודית
        <br />
        ● במשחק יהיו מספר תורות. המשחק יסתיים כאשר השחקן ינחש 3 פעמים, או כאשר ינחש את המילה הראשונה
        <br />
        ● לפני כל סבב יש להדפיס את האינדקס שלו (הסבב הראשון הוא 1) <br />
        ● בכל סבב, יש להדפיס את כל האותיות האפורות, הירוקות והכתומות של אותו הסבב <br />
        ● בין אם השחק ניצח או הפסיד, יש להדפיס הודעה מתאימה הכוללת 'won' או 'lose' <br />● השתדלו להשתמש גם בלולאת for
        וגם בלולאת while
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
          Enter secrete word:
          <span style={{ color: '#003061' }}>
            <b> world</b>
          </span>
          <br />
          Round 1: weird <br />
          Green letters: ['w', 'd'] <br />
          Orange letters: ['r'] <br />
          Gray letters: ['e', 'i'] <br />
          Round 2: world <br />
          Green letters: ['w', 'o', 'r', 'l', 'd'] <br />
          Orange letters: [] <br />
          Gray letters: [] <br />
          Correct. You won! <br />
        </code>
        <p style={{ textAlign: 'right', dir: 'rtl' }}>
          <br />
          דוגמה 2:
          <br />{' '}
        </p>
        <code>
          Enter secrete word:
          <span style={{ color: '#003061' }}>
            <b> python</b>
          </span>
          Round 1: driven <br />
          Green letters: ['n']
          <br />
          Orange letters: []
          <br /> Gray letters: ['d', 'r', 'i', 'v', 'e']
          <br /> Round 2: client
          <br /> Green letters: []
          <br /> Orange letters: ['n', 't']
          <br /> Gray letters: ['c', 'l', 'i', 'e']
          <br /> Round 3: pycnic
          <br /> Green letters: ['p', 'y']
          <br /> Orange letters: ['n']
          <br /> Gray letters: ['c', 'i', 'c']
          <br /> Out of trials. You loose
          <br />
        </code>
      </p>
    </>
  );
}

// RunTestButton.jsx
export function testsName() {
  return ['נצחון בתור השני', 'הפסד', 'נצחון בתור הראשון', 'נצחון בתור השלישי'];
}
export function getTaskTests() {
  return { generateInputList, processTestsOutputs: (testsOutputs) => processTestsOutputs(testsOutputs) };
}
export function generateInputList() {
  return ['world\nweird\nworld\n', 'python\ndriven\nclient\npycnic\n', 'nitzanim\nnitzanim\n'];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = [
    {
      feedback: [
        { green: 'wd', orange: 'r', gray: 'ei' },
        { green: 'world', orange: '', gray: '' },
      ],
      lastLine: 'won',
    },
    {
      feedback: [
        { green: 'n', orange: '', gray: 'drive' },
        { green: '', orange: 'nt', gray: 'clie' },
        { green: 'py', orange: 'n', gray: 'clie' },
      ],
      lastLine: 'loose',
    },
    {
      feedback: [{ green: 'nitzanim', orange: '', gray: '' }],
      lastLine: 'won',
    },
  ];

  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      word: inputLines[0],
      trials: [inputLines[1], inputLines[2] || null, inputLines[3] || null],
    };
    const output = textToBlocks(testsOutput.output);

    function checkColor(output, color, answer) {
      try {
        if (output[color] === null) {
          return false;
        }
        for (const letter of answer) {
          if (!output[color].replace(new RegExp(color, 'gi'), '').includes(letter)) {
            return false;
          }
        }
        return true;
      } catch {
        return false;
      }
    }

    const checkSingleTrial = (output, answer) => {
      return output && answer
        ? checkColor(output, 'green', answer.green || '') &&
            checkColor(output, 'orange', answer.orange || '') &&
            checkColor(output, 'gray', answer.gray || '')
        : null;
    };

    const makeFullCorrect = (index) => {
      const feedback = output?.trialsFeedback || {};
      const answer = answers[index].feedback;
      console.log(output, index);
      return {
        0: checkSingleTrial(feedback[0], answer[0]),
        1: checkSingleTrial(feedback[1], answer[1]),
        2: checkSingleTrial(feedback[2], answer[2]),
        lastLine: output.lastLine.toLowerCase().includes(answers[index].lastLine),
      };
    };
    const checkCorrect = (fullCorrect) =>
      Object.values(fullCorrect)
        .filter((value) => value !== null)
        .every((value) => value);

    const fullCorrect = makeFullCorrect(index);
    const correct = checkCorrect(fullCorrect);
    const name = names[index];

    return { name, input, output, correct, fullCorrect, ans: answers[index] };
  });
}

// TestsList.jsx
export function getTaskExplanation() {
  return { generateExplanation: (selectedValue) => generateExplanation(selectedValue) };
}
export function generateExplanation(selectedValue) {
  // const isColorExist = (output) => output.green || output.orange || output.gray;
  // function ShowAns({ output }) {
  //   return (
  //     <>
  //       {isColorExist(output) ? (
  //         <>
  //           <p>בהדפסות בקוד שכתבת:</p>
  //           {Object.entries(output).map(([key, value]) => {
  //             if (value !== null && key != 'lastLine') {
  //               return (
  //                 <p key={key} dir="ltr">
  //                   {key}: {value}
  //                 </p>
  //               );
  //             }
  //             return null;
  //           })}
  //         </>
  //       ) : (
  //         <p>בשורה האחרונה בהדפסה: {output.lastLine} </p>
  //       )}
  //     </>
  //   );
  // }

  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            עבור המילה הסודית - {selectedValue.input.word} , ועבור הניחושים:
            <br />
            <br />
            {selectedValue.ans.feedback.map((trialFeedback, i) => (
              <div key={i}>
                <WordleTable colorMap={trialFeedback} word={selectedValue.input.trials[i]} />
                <p direction="ltr">
                  {selectedValue.fullCorrect[i] ? (
                    <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
                  ) : (
                    <CancelRoundedIcon sx={{ color: '#BF1E2E' }} />
                  )}
                  הפלט שלך: <br />
                  <div style={{ textAlign: 'left', dir: 'ltr' }}>
                    {Object.values(selectedValue.output.trialsFeedback[i] || {}).map((value) => (
                      <span>{value.replace(/['"\[\]]/g, '') + ' | '}</span>
                    ))}
                  </div>
                </p>
                <br />
              </div>
            ))}
            {selectedValue.fullCorrect['lastLine'] ? (
              <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
            ) : (
              <CancelRoundedIcon sx={{ color: '#BF1E2E' }} />
            )}
            השחקן {selectedValue.ans.lastLine == 'won' ? 'ניצח ' : 'הפסיד '}
            ובשורה האחרונה בהדפסה: {output.lastLine}
          </p>
          {selectedValue.correct ? <p> כל הכבוד!</p> : <p>נסו שוב :)</p>} <br />
        </div>
      )}
    </>
  );
}

function textToBlocks(input) {
  const lines = input.split('\n');
  const blocks = [];
  let currentBlock = '';
  let currentRound = '';
  const rounds = {};
  const trialsFeedback = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^Round \d+:/.test(line)) {
      if (currentBlock) {
        blocks.push(currentBlock.trim());
        rounds[currentRound] = currentBlock.trim();
      }
      currentBlock = line;
      currentRound = line;
      trialsFeedback.push({});
    } else if (/^\d+$/.test(line)) {
      currentBlock += '\n' + line;
    } else {
      currentBlock += '\n' + line;
      const feedback = trialsFeedback[trialsFeedback.length - 1];
      if (/^green/.test(line) || /^Green/.test(line)) {
        feedback.green = line;
      } else if (/^Orange/.test(line) || /^orange/.test(line)) {
        feedback.orange = line;
      } else if (/^Gray/.test(line) || /^gray/.test(line) || /^Grey/.test(line) || /^grey/.test(line)) {
        feedback.gray = line;
      }
    }
  }
  if (currentBlock) {
    blocks.push(currentBlock.trim());
    rounds[currentRound] = currentBlock.trim();
  }
  return {
    trialsFeedback,
    lastLine: lines[lines.length - 2],
  };
}

const WordleTable = ({ key, colorMap, word }) => {
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
    <div style={{ display: 'flex', justifyContent: 'center' }} key={key}>
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
secrete_word = input('Enter secrete word: ') 
won = False
trials = 1
while not won and trials <= 3:
    word = input('Round ' + str(trials) + ': ')
    gray_list = []
    orange_list = []
    green_list =[]
    for i in range(len(secrete_word)):
        if word[i] in secrete_word[i]:
            green_list.append(word[i])
        else:
            if word[i] in secrete_word:
                orange_list.append(word[i])
            else:
                gray_list.append(word[i])
    print("Green letters: " + str(green_list))
    print("Orange letters: " + str(orange_list))
    print("Gray letters: " + str(gray_list))
    if word == secrete_word:
        won = True
        print('Correct. You won!')

    trials += 1

if not won:
    print('Out of trials. You loose')
`;
