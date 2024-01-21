import React from 'react';
import BombIcon from '../../../assets/svg/tasks/bomb.svg';

export function getTaskExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            מספר ראשון: {selectedValue.input.fisrt + ', '}
            מספר שני: {selectedValue.input.second + '.'}
            <br />
            מהלך המשחק:
            <br />
          </p>
          <BoomTable gameString={selectedValue.ans} />
          <p>
            <br />
            ההדפסה האחרונה בקוד שכתבת:
            <br />
            {selectedValue.output}
          </p>
          {selectedValue.correct ? <p>מתאימה לפלט הנדרש. כל הכבוד!</p> : <p>לא מתאימה לפלט. נסו שוב :)</p>}{' '}
        </div>
      )}
    </>
  );
} 

const BoomTable = ({ gameString }) => {
  const items = gameString.split('\n');

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', direction: 'ltr' }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            {items.map((item, index) => (
              <td
                key={`t-${index}`}
                style={{
                  border: '1px solid black',
                  padding: '2px',
                  textAlign: 'center',
                  width: '45px',
                }}
              >
                {item.toLowerCase() === 'b' ? (
                  <img key={`bomb-${index}`} src={BombIcon} alt="Bomb" style={{ width: '45px', fill: 'blue' }} />
                ) : (
                  item
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ans = `
first = int(input('First number:'))
second = int(input('Second number:'))
if first > second:
    print('Error')
else:
    for i in range (first,second+1):
        if i//10==7 or i%10==7 or i%7==0:
            print('Boom')
        else:
            print(i)
`;