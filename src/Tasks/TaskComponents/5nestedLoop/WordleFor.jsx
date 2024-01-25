import React from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export function getTaskExplanation(selectedValue) {
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
            השחקן {selectedValue.ans.lastLine == 'won' ? 'ניצח. ' : 'הפסיד. '}
            השורה האחרונה בהדפסה: <br />
            {selectedValue.output.lastLine}
          </p>
          <br />
          {selectedValue.correct ? <p> כל הכבוד!</p> : <p>נסו שוב :)</p>}
        </div>
      )}
    </>
  );
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
    print('Out of trials. You lost')
`;
