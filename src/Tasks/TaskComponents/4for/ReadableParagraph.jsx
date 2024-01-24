
export function getTaskExplanation(selectedValue) {
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


// export function processTestsOutputs(testsOutputs) {
//   // const { taskTests, testsOutputs } = parameters;
//   const names = taskTests.map((test) => test.name);
//   const answers = [
//     { paragraph: 'ok', sentences: [''] },
//     { paragraph: 'ok', sentences: ['3', '4'] },
//     { paragraph: 'ok', sentences: ['2'] },
//     { paragraph: 'short', sentences: [''] },
//     { paragraph: 'long', sentences: ['1'] },
//   ];
//   return testsOutputs.map((testsOutput, index) => {
//     const inputLines = testsOutput.input.split('\n');
//     const input = {
//       sentence: inputLines[0],
//     };
//     const outputLines = testsOutput.output.split('\n');
//     const firstOutputLine = outputLines[1];// try-catch?
//     const output = outputLines.slice(2).join('\n');
//     const correct =
//       firstOutputLine.includes(answers[index].paragraph) &&
//       answers[index].sentences.every((sentence) => output.includes(sentence));
//     const name = names[index];
//     return { name, input, output: outputLines.slice(1).join('\n'), correct, ans: answers[index] };
//   });
// }

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
