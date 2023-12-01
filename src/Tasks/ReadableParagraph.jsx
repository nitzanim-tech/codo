import React from 'react';

export function testsName() {
  return ['משפט שונה'];
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
    'המתמטיקאי והמהפכן הצרפתי אווריסט גלואה, מיוצרי תורת החבורות ומייסדה של תורת גלואה, שני תחומים מרכזיים באלגברה מופשטת, נהרג בדו-קרב ב-30 במאי 1832, בהיותו בן 21 בלבד. בידיעה כי חייו מתקרבים לקיצם, ובניסיון לשמר את מחקריו גם לאחר מותו, העלה גלואה על הכתב בלילה שלפני הדו-קרב את עיקרי רעיונותיו החשובים, בצורה מאוד לא מסודרת.',
  ];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = ['jk'];

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
        בקורס להכשרת עיתונאים צעירים מלמדים כיצד לכתוב כתיבה אפקטיבית. התלמידים למדו מספר כללים שיעזרו להם לכתוב טקסט
        ברור ונוח לקריאה. <br />
        אחד מהכללים הוא שכל משפט צריך להכיל 5-15 מילים, ואם יש חלוקה עם פסיקים, לא יותר מ30 מילים. <br />
        הסיבה לכך היא שהזכרון לטווח קצר שלנו מסוגל להחזיק מספר פריטים מוגבל ברגע נתון. לכן אם המשפט ארוך מדי, יהיה לנו
        קשה לזכור בסוף המשפט את מה שנאמר בתחילתו. באופן דומה, גם פסקה אפקטיבית תכיל לרוב בין 3 ל 5 משפטים.
        <br />
        בתרגיל הבא העיתונאים הצעירים ישמחו לעזרתכם כדי לוודא שהכתבה שלהם עומדת בכללים.
        <br /> <br />
        • קלטו פסקה מהמשתמש
        <br />
        • בדקו שהפסקה מכילה בין 3 ל5 משפטים, והדפיסו אם הפסקה קצרה מדי, ארוכה מדי או באורך תקין.
        <br />
        • בדקו עבור כל משפט האם הוא תקין (5-15 מילים במשפט רגיל, ועד 30 במשפט המכיל פסיק)
        <br />
        • אם יש טעויות, הדפיסו את המשפטים הקצרים מדי או הארוכים מדי, עם הודעת "שגיאה" מתאימה.
        <br /> <br />
        <span style={{ color: 'gray' }}>
          <i>
            תרגיל זה נכתב בהשראת קורס עיתונאים אמיתי שהעביר העיתונאי זאב גלילי. בנו של זאב, המתכנת רז גלילי ז"ל כתב
            תוכנה שבדקה את הכתבות שכתבו העיתונאים על פי העקרונות שנלמדו בקורס. תרגיל זה נכתב לזכרו של רז, שהיה מתכנת
            יצירתי ואוהב סיפורים מושבע.
          </i>
        </span>
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
          <b>
            המתמטיקאי והמהפכן הצרפתי אווריסט גלואה, מיוצרי תורת החבורות ומייסדה של תורת גלואה, שני תחומים מרכזיים
            באלגברה מופשטת, נהרג בדו-קרב ב-30 במאי 1832, בהיותו בן 21 בלבד. בידיעה כי חייו מתקרבים לקיצם, ובניסיון לשמר
            את מחקריו גם לאחר מותו, העלה גלואה על הכתב בלילה שלפני הדו-קרב את עיקרי רעיונותיו החשובים, בצורה מאוד לא
            מסודרת.
          </b>
        </span>
      </p>
    </>
  );
}

const ans = `
txt = input("enter paragraph here: ")
sen = txt.split(".")
if len(sen) > 5:
    print("the paragraph is too long")
elif len(sen) < 3:
    print("the paragraph is too short")
else:
    print("good size of paragraph")
for s in sen:
    length = len(s.split(" "))
    if length < 5:
        print("the sentence: ", s, "is too short.")
`;
