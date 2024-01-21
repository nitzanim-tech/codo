import React from 'react';

export function testsName() {
  return ['פסקה תקינה', 'מספר משפטים לא תקינים', 'משפט ארוך עם פסיקים', 'פסקה קצרה', 'פסקה ארוכה, משפט קצר'];
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
          <p>הפסקה:</p>
          <p style={{ fontFamily: 'yarden', fontSize: '100%' }}>{selectedValue.input.sentence}</p>
          <p>
            התייחסות לפסקה אמורה להכיל את המילה
            {' ' + selectedValue.ans.paragraph}
            {selectedValue.ans.sentences.join(', ') && (
              <>
                <br /> {` והמשפטים שאינם תקינים הם:`}
                {' ' + selectedValue.ans.sentences.join(', ')}
              </>
            )}
            <br /> <br />
            ההדפסה בקוד שכתבת:
            <br />{' '}
          </p>
          <div dir="ltr">{selectedValue.output}</div>
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
    'הפרחים המצויים על כוכבו של הנסיך הקטן היו פשוטים מאד, ולהם רק מחרזת אחת של עלי כותרת. פרחים אלה לא תפשו מקום רב ולא הפריעו לאיש. בבקר לא עבות היו מופיעים בינות לדשא והיו נובלים עם ערב. יום אחד צץ פרח חדש מזרע שנשא ברוח והגיע ממקום בלתי ידוע. הנסיך הקטן נתן עינו על ציץ זה, שלא היה דומה לפרחים האחרים המצויים על כוכבו. מי יודע – שמא זה זן חדש של עץ באובב?',
    `המתמטיקאי והמהפכן הצרפתי אווריסט גלואה, מיוצרי תורת החבורות ומייסדה של תורת גלואה, נהרג בדו-קרב ב-30 במאי 1832, בהיותו בן 21 בלבד. חרף כל הסערות שפקדו אותו, המשיך גלואה בעבודתו המתמטית עד יומו האחרון. בידיעה כי חייו מתקרבים לקיצם, ובניסיון לשמר את מחקריו גם לאחר מותו, העלה גלואה על הכתב בלילה שלפני הדו-קרב את עיקרי רעיונותיו החשובים, בצורה מאוד לא מסודרת. מקום קבורתו לא ידוע. עבודתו לא זכתה להכרה בחייו  ורק ב-1843  11 שנים לאחר מותו  השקיע ז'וזף ליוביל חודשים אחדים בבדיקת כתבי היד שהותיר גלואה והכיר בחשיבותם. `,
    'במשחק כדורגל, בו יש 11 שחקנים בכל קבוצה ושופט אחד, מרבית הסיכויים הם שלשניים מבין האנשים שעל כר הדשא יהיה יום הולדת באותו תאריך. למעשה, בקבוצה אקראית של 23 אנשים קיים סיכוי של יותר מ-50% לכך, למרות שיש 366 תאריכי לידה אפשריים בשנה. תופעה הסתברותית זו, המכונה פרדוקס יום ההולדת, אינה פרדוקס במובן המקובל של המילה, שכן אין בה סתירה לוגית, אך היא סותרת את האינטואיציה של מרבית האנשים, הסבורים כי ההסתברות תהיה קטנה בהרבה מחצי. בקבוצה אקראית של 57 אנשים, הסיכוי לכך ששניים נולדו באותו יום בשנה עולה על 99%.',
    `בסוף יהיה, יהיה טוב, הפרחים ישובו לפרוח, תראה שיהיה טוב, יהיה טוב, גם אם יש עוד דרך לעבור. בסוף יהיה, יהיה טוב, הפרחים ישובו לפרוח, תראה שיהיה טוב, יהיה טוב, גם מתוך החושך יידלק האור`,
    `לואי ארמסטרונג היה חצוצרן וזמר ג'אז מפורסם. היה עני מרוד בילדותו. ארמסטרונג נאלץ להיאבק על קיומו כילד קטן. בני משפחת קרנופסקי, משפחה יהודית שהיגרה מליטא, ריחמו על הנער – ונתנו לו עבודות שונות בעסק ההובלה שהיה ברשותם. אֵם המשפחה התעקשה בכל יום שארמסטרונג לא יחזור לביתו לפני שאכל אצלה ארוחה מלאה. הקורנית הראשונה של ארמסטרונג נרכשה עבורו על ידי משפחת קרנופסקי. כהוקרה על היחס החם והתמיכה, ענד ארמסטרונג על צווארו, עד יומו האחרון, שרשרת ועליה מגן דוד.`,
  ];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = [
    { paragraph: 'ok', sentences: [''] },
    { paragraph: 'ok', sentences: ['3', '4'] },
    { paragraph: 'ok', sentences: ['2'] },
    { paragraph: 'short', sentences: [''] },
    { paragraph: 'long', sentences: ['1'] },
  ];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      sentence: inputLines[0],
    };
    const outputLines = testsOutput.output.split('\n');
    const firstOutputLine = outputLines[1];
    const output = outputLines.slice(2).join('\n');
    const correct =
      firstOutputLine.includes(answers[index].paragraph) &&
      answers[index].sentences.every((sentence) => output.includes(sentence));
    const name = names[index];
    return { name, input, output: outputLines.slice(1).join('\n'), correct, ans: answers[index] };
  });
}
// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['split', 'מחרוזות', 'רשימות', 'for'];
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
        • אם יש טעויות, הדפיסו את אינדקסי המשפטים הקצרים מדי או הארוכים מדי, עם הודעת "שגיאה" מתאימה.
        <br />
        <u>:דגשים</u> <br />• בהתייחסות לאורך הפסקה, יש להשתמש במילים
        <br />
        <code>long / short / ok</code>
        <br />
        • בהתייחסות למשפטים שאינם באורך תקין יש להשתמש באינדקס המשפטים כאשר המשפט הראשון מתחיל ב0
        <br />
        • כל משפט תמיד יסתיים בנקודה (גם האחרון)
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
      <p style={{ textAlign: 'left' }}>
        <code>Enter the paragraph</code>
        <br />
        <span style={{ fontFamily: 'yarden', color: '#003061', textAlign: 'right', dir: 'rtl' }}>
          ב-1 באפריל 1981 הודיעו בחדשות הבוקר של קול ישראל כי נפסל תוארה של מכבי תל אביב בכדורסל כאלופת אירופה הטרייה,
          משום שקהל האוהדים שנכח באולם פרץ למגרש כשנייה אחת לפני תום המשחק ולכן לא נסתיים משחק זה במועדו הרשמי, ולפי
          חוקת הכדורסל יש לקיים משחק חוזר. במהלך הבוקר ההוא רעשה הארץ, עד אשר חזר בו קול ישראל מדבריו והבהיר כי מדובר
          בכזב לכבוד אחד באפריל, יום הכזבים הבינלאומי. לאחר ההבהרה רווח לקהל.
        </span>
        <br />
        <code>
          The size of paragraph is ok
          <br />
          The sentence in index 0 is too long
          <br />
          The sentence in index 2 is too short
        </code>
      </p>
      <br />
      <p style={{ textAlign: 'right', dir: 'rtl' }}>
        הפסקה באורך תקין מכוון שמכילה 3 משפטים <br />
        המשפט הראשון ארוך מידי מכוון שהוא מכיל פסיקים ומכיל יותר מ30 מילים
        <br />
        המשפט השלישי קצר מידי מכוון שמכיל פחות מ5 מילים
      </p>
    </>
  );
}

const ans = `
txt = input("Enter paragraph here: ")
sen = txt.split(".")
if len(sen)-1 > 5:
    print("The paragraph is too long")
elif len(sen)-1 < 3:
    print("The paragraph is too short")
else:
    print("The size of paragraph is ok")

for i in range(len(sen)-1):
    length = len(sen[i].split(" "))-1
    if length < 5:
        print("The sentence in index "+ str(i)+ " is too short.")
    if ',' in sen[i]:
        if length > 30:
            print("The sentence in index "+ str(i)+ " is too long.")
    else:
        if length > 15:
            print("The sentence in index "+ str(i)+ " is too long.")
`;
