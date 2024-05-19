import React, { useEffect } from 'react';
// import { findEmptyCells } from '../../util/findEmptyCells';
// import { checkCellValidity } from '../../util/isValid';
import './sudoku.css'
const RED = '#ff9999';
const GREEN = '#b3ff99';

const CheckedSudokuTable = ({ studentAns, sudoku, onValidityChange }) => {
  if (studentAns === null) {
    useEffect(() => {
      if (onValidityChange) {
        onValidityChange(false);
      }
    }, [onValidityChange]);
    return <h2>פלט שגוי</h2>;
  }

  //   const emptyCells = findEmptyCells(sudoku);
  //   const validCells = checkCellValidity(studentAns, emptyCells);

  const emptyCells = [];
  const validCells = [];
  const allCellsValid = validCells.every((isValid) => isValid);
  useEffect(() => {
    if (onValidityChange) {
      onValidityChange(allCellsValid);
    }
  }, [allCellsValid, onValidityChange]);

  return (
    <table className="sudoku-table">
      <tbody>
        {studentAns.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              const cellIndex = emptyCells.findIndex(([rowIndex, colIndex]) => rowIndex === i && colIndex === j);
              const isValid = cellIndex !== -1 ? validCells[cellIndex] && cell !== null : true;
              return (
                <td
                  key={j}
                  style={{
                    backgroundColor: cellIndex !== -1 ? (isValid ? GREEN : RED) : undefined,
                  }}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SudokuTable = ({
  board = [
    [2, 4, null, 3],
    [1, 3, 2, null],
    [null, 1, null, 2],
    [null, 2, 4, 1],
  ],
}) => {
  return (
    <table className="sudoku-table">
      <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export function getTaskExplanation(selectedValue) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 0.3, marginLeft: '50px' }}>
          <SudokuTable />
        </div>
      </div>
    </>
  );
}

const ans = `
# preparing store
DISHES = ["half", "mana", "deal"]
PRICES = [15,25,33]
TOP_NUM = [4,7,7]
TOPPINGS = ["salad", "humus", "tehini", "harif", "amba", "cabbage", "pickles", "chips", "onion"]
costumer = "yes"
orders = []
# 4 more costumers
while costumer != "no":
    #1 choose from menu
    print("this is our FLEPPA. please choose what do you want to order:")
    for i in range(len(PRICES)):
        print(i+1, DISHES[i], PRICES[i], "(with ",TOP_NUM[i], " salads)")
    dish_num = int(input("enter order num:"))
    orders.append(dish_num)
    # making dish
    price = PRICES[dish_num-1]
    top_num = TOP_NUM[dish_num-1]
    #2 adding toppings from topping list
    cur_top = ""
    cur_toppings = TOPPINGS.copy()
    pita = []
    while top_num > 0 and cur_top != "stop":
        print("you have ", top_num, "toppings left to chose.")
        print("you can choose between:\n"+ str(cur_toppings) + "\nor enter stop if you're done.")
        cur_top = input("what do you want in your pita?")
        if cur_top in cur_toppings:
            cur_toppings.remove(cur_top)
            pita.append(cur_top)
        top_num -= 1
    if dish_num == 3:
        print("you got", pita, "chips and soda. you need to pay: " + str(price))
    else:
        print("you got", pita, ". you need to pay: " + str(price))
    #3 accepting payment
    payment = int(input("how would you like to pay? 1. cash 2. credit card "))
    pay = 0
    if payment == 1:
        while pay < price:
            pay += int(input("please enter cash: "))
        print("thank you! you get back", pay - price, ". have a nice FLEPPA!")
    else:
        password = ""
        while not (len(password) == 4 and password.isdigit()):
            password = input("please enter you 4 digit code: ")
        print("your payment is received. have a nice FLEPPA!")
    costumer = input("another costumer? yes/no ")
#5 print profits
print("good day today! you sold:")
profit = 0
for item in orders:
    print(DISHES[item-1],PRICES[item-1])
    if item in [1,2]:
        profit += PRICES[item-1] * 0.7
    else:
        profit += PRICES[item - 1] * 0.5
print("you earned: " + str(profit))
`;
