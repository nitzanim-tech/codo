export function getTaskExplanation(selectedValue) {
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
