export function getTaskExplanation(selectedValue) {
  return (
    <>
      <div dir="rtl">
        <p>
          הפלט הנדרש הוא {selectedValue.ans} <br />
          ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
        </p>
        {selectedValue.correct ? <p>מתאימה לפלט הנדרש. כל הכבוד!</p> : <p>לא מתאימה לפלט. נסו שוב :)</p>}{' '}
      </div>
    </>
  );
}
