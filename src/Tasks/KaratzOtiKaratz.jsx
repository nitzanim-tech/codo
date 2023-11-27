import React from 'react';

export function testsName() {
  return [' אלעד, ערב טוב, מה נשמע?', 'הייתי מתחת העץ של הטין', 'אולי נחש אותי נחש', 'אולי קרץ אותי קרץ', 'הכל ביחד'];
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
            עבור המספר: {selectedValue.input.number + ','}
            <br />
            הסדרה הינה {selectedValue.fullAns + ', '}
            ולכן הסכום הוא {selectedValue.ans}
            <br />
            ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
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
  return ['3', '9', '60', '4', '1'];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = ['49', '339', '784', '7', '1'];
  const fullAns = [
    '3 10 5 16 8 4 2 1',
    '9 28 14 7 22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 1',
    '60 30 15 46 23 70 35 106 53 160 80 40 20 10 5 16 8 4 2 1',
    '4 2 1',
    '1',
  ];

  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      number: parseInt(inputLines[0]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = output.includes(answers[index]);
    const name = names[index];
    return { name, input, output, correct, ans: answers[index], fullAns: fullAns[index] };
  });
}
// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['דגל', 'מחרוזות', 'for'];
}
export function desription() {
  return (
    <>
      <p dir="rtl">
        פעם אמר אדם חכם:
        <br />
        <b>
          "אלעד, ערב טוב, מה נשמע? תשמע אני הייתי מתחת העץ של הטין. אולי נחש אותי נחש, אולי קרץ אותי קרץ ואני נפוח"
          <br />
        </b>
        <br />
        אלעד שלנו לא מצליח להבין את העלילה ואנחנו תמיד נשמח לעזור לאדם במצוקה
        <br />
        קלטו מהמשתמש משפט
        <br />
        ● החליפו את המילה "טין" במילה "תאנה <br />
        ● החליפו את הפעם הראשונה בה כתובה המילה "נחש במילה "הכיש"
        <br />● החליפו את הפעם
        {` `}
        <u>הראשונה</u> {` `}
        "בה כתובה המילה "קרץ" במילה "עקצה <br />
        ● "החליפו את הפעם השניה בה כתובה המילה "קרץ" במילה "קרציה <br />
        לאחר מכן הדפיסו את המשפט המתוקן
        <br />
      </p>
    </>
  );
}
export function examples() {
  return (
    <>
      <p style={{ textAlign: 'right', dir: 'rtl' }}>
        עבור הקלט:
        <span style={{ color: '#003061' }}>
          <b> אולי נחש אותי נחש</b>
        </span>
        <br />
        יודפס: אולי הכיש אותי נחש
        <br /> <br />
        עבור הקלט:
        <span style={{ color: '#003061' }}>
          <b>
            {' '}
            אלעד, ערב טוב, מה נשמע? תשמע אני הייתי מתחת העץ של הטין. אולי נחש אותי נחש, אולי קרץ אותי קרץ ואני נפוח
          </b>
        </span>
        <br />
        יודפס: אלעד, ערב טוב, מה נשמע? תשמע אני הייתי מתחת העץ של התאנה. אולי הכיש אותי נחש, אולי עקצה אותי קרציה ואני
        נפוח
        <br /> <br />
        עבור הקלט:
        <span style={{ color: '#003061' }}>
          <b> קרץ קרץ בלה בלה בלה</b>
        </span>
        <br />
        יודפס: עקצה קרציה בלה בלה בלה 
        
        <br /> <br />
        עבור הקלט:
        <span style={{ color: '#003061' }}>
          <b> טין טין טין</b>
        </span>
        <br />
        יודפס: תאנה תאנה תאנה{' '}
      </p>
    </>
  );
}

const ans = `
sentence = 'שלום אלעד, מה נשמע? תשמע אני הייתי מתחת העץ של הטין. אולי נחש אותי נחש, אולי קרץ אותי קרץ ואני נפוח'

word =''
is_first_nahash = True
is_first_karatz = True

correct_sentece =''
for letter in sentence:
    if word == 'הטין':
       word='התאנה'

    if word == 'נחש':
        if is_first_nahash:
            word='הכיש'
            is_first_nahash = False

    if word == 'קרץ':
        if is_first_karatz:
            word='עקצה'
            is_first_karatz = False
        else:
            word='קרציה'

    if letter == ' ':
        correct_sentece+=word+' '
        word = ''
    else:
        word+=letter
correct_sentece += word
print(correct_sentece)
`;
