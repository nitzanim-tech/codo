export function getTaskExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            המספר {selectedValue.input.number + ' '}
            הוא {selectedValue.ans == 'not' && ' לא '} משוכלל מפני ש{selectedValue.fullAns + ', '}
            לכן הפלט צריך להכיל את המילה {selectedValue.ans} {selectedValue.ans == 'is' && 'ולא להכיל את המילה not'}
            <br />
            <br />
            ההדפסה האחרונה בקוד שכתבת:
            <br />
            {selectedValue.output}
          </p>
          {selectedValue.correct ? <p>מכילה את הפלט הנדרש. כל הכבוד!</p> : <p>לא עונה לדרישות. נסו שוב :)</p>}{' '}
        </div>
      )}
    </>
  );
}
