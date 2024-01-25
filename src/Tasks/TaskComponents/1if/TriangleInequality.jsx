export function getTaskExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            עבור הצלעות - {'a: ' + selectedValue.input.A + ', '}
            {'b: ' + selectedValue.input.B + ', '}
            {'c: ' + selectedValue.input.C + ' '}
            <br />
            {selectedValue.fullAns + ', '}
            ולכן
            {selectedValue.ans == 'cannot' && ' לא'} ניתן ליצור משולש.
            <br />
            כלומר, הפלט הנדרש אמור להכיל {selectedValue.ans}.
            <br />
            ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
            {selectedValue.correct ? <p>מתאימה לפלט הנדרש. כל הכבוד!</p> : <p>לא מתאימה לפלט. נסו שוב :)</p>}
            {/* <Triangle A={30} B={110} C={10} /> */}
          </p>
        </div>
      )}
    </>
  );
}

const Triangle = ({ A, B, C }) => {
  const triangleStyle = {
    width: 0,
    height: 0,
    borderLeft: `${A}px solid transparent`,
    borderRight: `${B}px solid transparent`,
    borderBottom: `${C}px solid #f00`, // Adjust the color as needed
  };

  return <div style={triangleStyle}></div>;
};
