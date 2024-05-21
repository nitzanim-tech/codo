import BottleIcon from '../../../assets/svg/tasks/bottle.svg';

export function getTaskExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            <br />
            עבור הקלט - {selectedValue.input.number} בקבוקים,
            <br />
            הפתרון הוא {selectedValue.ans} <br />
            ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
          </p>
          {selectedValue.correct ? <p>מכילה את הפתרון. כל הכבוד!</p> : <p>איננה מכילה את הפתרון. נסו שוב :)</p>} <br />
          <p>
            תוכלו להיעזר באלגוריתם הבא: אם ניתן, נשתמש במספר בקבוקים המתחלק ב3, ונוסיף לבקבוקים החדשים שייצרנו מהם את
            הבקבוקים שלא השתמשנו בהם עדיין (השארית)
          </p>
          <RecycleTable initial={selectedValue.input.number} />
          <p>
            <br />
            כלומר, סה"כ (שומשו עד כה + הבקבוקים שטרם שומשו) {selectedValue.ans} <br />
          </p>
        </div>
      )}
    </>
  );
}

function RecycleTable({ initial }) {
  const Bottle = ({ index }) => {
    return <img key={`full-${index}`} src={BottleIcon} alt="BottleIcon" style={{ height: '20px' }} />;
  };
  function TableHeader({ title }) {
    return <th style={{ border: '1px solid black', padding: '3px', width: '150px' }}>{title}</th>;
  }

  const rows = [];
  let freshBottles = initial;
  let total = 0;
  let rest = 0;
  while (freshBottles > 0) {
    rest = freshBottles >= 3 ? freshBottles % 3 : 0;
    total += freshBottles - rest;
    rows.push(
      <tr key={`row-${freshBottles}`}>
        <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            x {freshBottles}
            <Bottle index={rows.length} />
          </div>
        </td>
        <td style={{ textAlign: 'center' }}>{freshBottles - rest}</td>
        <td style={{ textAlign: 'center' }}>{rest}</td>
        <td style={{ textAlign: 'center' }}>{Math.floor(freshBottles / 3)}</td>
        <td style={{ textAlign: 'center' }}>{total}</td>
      </tr>,
    );
    freshBottles = Math.floor(freshBottles / 3) + rest;
  }

  return (
    <table>
      <thead>
        <tr>
          <TableHeader title={'בקבוקים'} />
          <TableHeader title={'נשתמש ב'} />
          <TableHeader title={'נשארו'} />
          <TableHeader title={'בקבוקים חדשים שיוצרו'} />
          <TableHeader title={'סה"כ שומשו'} />
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
  const answers = ['4', '17', '149', '3071', '1'];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      number: parseInt(inputLines[0]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = output.includes(answers[index]);
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
  });
}
