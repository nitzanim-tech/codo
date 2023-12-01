import React from 'react';

export function testsName() {
  return [
    'אלעד, ערב טוב, מה נשמע?',
    'הייתי מתחת העץ של הטין',
    'אולי נחש אותי נחש',
    'אולי קרץ אותי קרץ',
    'הכל ביחד',
    'משפט שונה',
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
            הקלט:
            <p style={{ fontFamily: 'yarden', fontSize: '130%' }}>{selectedValue.input.sentence}</p>
            לאחר התיקונים, הפלט הנדרש:
            <br />
            <p style={{ fontFamily: 'yarden', fontSize: '130%' }}>{selectedValue.ans}</p>
            <br />
            ההדפסה האחרונה בקוד שכתבת:
            <br />
            <p style={{ fontFamily: 'yarden', fontSize: '130%' }}>{selectedValue.output}</p>
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
  return [
    'אלעד, ערב טוב, מה נשמע?',
    'הייתי מתחת העץ של הטין',
    'אולי נחש אותי נחש',
    'אולי קרץ אותי קרץ',
    'אלעד, ערב טוב, מה נשמע? תשמע אני הייתי מתחת העץ של הטין. אולי נחש אותי נחש, אולי קרץ אותי קרץ ואני נפוח',
    'נחש קרץ ל נחש',
  ];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = [
    'אלעד, ערב טוב, מה נשמע?',
    'הייתי מתחת העץ של התאנה',
    'אולי הכיש אותי נחש',
    'אולי עקצה אותי קרציה',
    `אלעד, ערב טוב, מה נשמע? תשמע אני הייתי מתחת העץ של התאנה. אולי הכיש אותי נחש, אולי עקצה אותי קרציה ואני נפוח`,
    'הכיש עקצה ל נחש',
  ];

  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      sentence: inputLines[0],
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = output.replace(/\s/g, '') === answers[index].replace(/\s/g, '');
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
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
        <p style={{ fontFamily: 'yarden', fontSize: '125%' }}>
          "אלעד, ערב טוב, מה נשמע? תשמע אני הייתי מתחת העץ של הטין. אולי נחש אותי נחש, אולי קרץ אותי קרץ ואני נפוח"
          <br />
        </p>
        אלעד שלנו לא מצליח להבין את העלילה ואנחנו תמיד נשמח לעזור לאדם במצוקה
        <br /> <br />
        קלטו מהמשתמש משפט
        <br />
        ● החליפו את המילה "הטין" במילה "התאנה <br />● החליפו את הפעם {` `}
        <u>הראשונה</u> {` `}
        בה כתובה המילה "נחש במילה "הכיש"
        <br />● החליפו את הפעם
        {` `}
        <u>הראשונה</u> {` `}
        "בה כתובה המילה "קרץ" במילה "עקצה <br />● "החליפו את הפעם {` `}
        <u>השניה</u> {` `}
        בה כתובה המילה "קרץ" במילה "קרציה <br />
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
          <b> הטין הטין הטין</b>
        </span>
        <br />
        יודפס: התאנה התאנה התאנה{' '}
      </p>
    </>
  );
}

const ans = `
# sentence = 'שלום אלעד, מה נשמע? תשמע אני הייתי מתחת העץ של הטין. אולי נחש אותי נחש, אולי קרץ אותי קרץ ואני נפוח'
sentence = input('הכנס')

word =''
is_first_nahash = True
is_first_karatz = True
sentence += ' '
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
