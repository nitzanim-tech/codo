import React from 'react';

export function testsName() {
  return [
    'הרצה 1- הודפס התפריט',
    'הרצה 2- עדכון רשימת תוספות',
    'הרצה 3- הדפסת רשימת התוספות שנבחרו',
    'הרצה 4- הדפסת ציפס וסודה',
    'הרצה 5- הדפסת מחיר נכון',
    'הרצה 6- מזומן בכמה מטבעות ועודף',
    'הרצה 7- מזומן מחיר מדויק',
    'הרצה 8- אשראי',
    'הרצה 9- מספר לקוחות',
    'הרצה 10- סכום רווח נכון',

    'חלק 1 - לוגיקה',
    'חלק 1 - סינטקס',
    'חלק 1 - עיצוב וקריאות',
    'חלק 1 - מקרי קצה (בונוס)',

    'חלק 2 - לוגיקה',
    'חלק 2 - סינטקס',
    'חלק 2 - עיצוב וקריאות',
    'חלק 2 - מקרי קצה (בונוס)',

    'חלק 3 - לוגיקה',
    'חלק 3 - סינטקס',
    'חלק 3 - עיצוב וקריאות',
    'חלק 3 - מקרי קצה (בונוס)',

    'חלק 4 - לוגיקה',
    'חלק 4 - סינטקס',
    'חלק 4 - עיצוב וקריאות',
    'חלק 4 - מקרי קצה (בונוס)',

    'חלק 5 - לוגיקה',
    'חלק 5 - סינטקס',
    'חלק 5 - עיצוב וקריאות',
    'חלק 5 - מקרי קצה (בונוס)',

    'קלט פלט ומשתנים',
    'תנאים',
    'לולאות WHILE',
    'לולאות FOR',
    'רשימות',
  ];
}

// TestsList.jsx
export function getTaskExplanation() {
  return { generateExplanation: (selectedValue) => generateExplanation(selectedValue) };
}
export function generateExplanation(selectedValue) {
  return <></>;
}

// RunTestButton.jsx
export function getTaskTests() {
  return { generateInputList, processTestsOutputs: (testsOutputs) => processTestsOutputs(testsOutputs) };
}
export function generateInputList() {
  return [
    '1\nsalad\nstop\n1\n10\n20\nno',
    '1\nhumus\npickles\ntehini\nsalad\n1\n10\n20\nno',
    '1\nhumus\npickles\ntehini\nsalad\n1\n10\n20\nno',
    '3\nsalad\nstop\n1\n10\n20\nno',
    '2\nsalad\nstop\n1\n10\n20\nno',
    '1\nsalad\nstop\n1\n5\n8\n10\nno',
    '3\nsalad\nstop\n33\nno',
  ];
}
const isLineContains = (output, includeWords, excludeWords) => {
  for (let line of output) {
    let includeAll = includeWords.every((word) => line.toLowerCase().includes(word));
    let excludeAny = excludeWords.some((word) => line.toLowerCase().includes(word));
    if (includeAll && !excludeAny) {
      return true;
    } else console.log({ line, includeAll, excludeAny });
  }
  return false;
};

const isCorrect = ({ index, outputLines }) => {
  switch (index) {
    case 0: // printing the menu
      return (
        isLineContains(outputLines, ['half', '15'], []) &&
        isLineContains(outputLines, ['mana', '25'], []) &&
        isLineContains(outputLines, ['deal', '33'], [])
      );
    case 1: //updating the list of salads
      const Salads = ['salad', 'humus', 'tehini', 'harif', 'amba', 'cabbage', 'pickles', 'chips', 'onion'];
      const SaladsWithoutHumus = Salads.filter((item) => item !== 'humus');
      const SaladsWithoutPickles = SaladsWithoutHumus.filter((item) => item !== 'pickles');
      const SaladsWithoutThini = SaladsWithoutPickles.filter((item) => item !== 'tehini');
      return (
        isLineContains(outputLines, Salads, []) &&
        isLineContains(outputLines, SaladsWithoutHumus, ['humus']) &&
        isLineContains(outputLines, SaladsWithoutPickles, ['humus', 'pickles']) &&
        isLineContains(outputLines, SaladsWithoutThini, ['humus', 'pickles', 'tehini'])
      );
    case 2: // printing the list of selected salads
      return isLineContains(
        outputLines,
        ['humus', 'pickles', 'tehini', 'salad'],
        ['harif', 'amba', 'cabbage', 'onion'],
      );
    case 3: // printing Chips and Soda for a deal
      return isLineContains(outputLines, ['chips', 'soda'], []);
    case 4: // printing the correct price
      return isLineContains(outputLines, ['pay', '25'], []);
    case 5: // cash in several currencies and excess
      return isLineContains(outputLines, ['back', '8'], []);
    case 6: //Cash Exact Price
      return isLineContains(outputLines, ['back', '0'], []);
    case 7: //credit
      return false;
    case 8: //some customers
      return false;
    case 9: //correct profit amount
      return false;
  }
};

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  return testsOutputs.map((testsOutput, index) => {
    const input = null;
    const outputLines = testsOutput.output ? testsOutput.output.split('\n') : '';

    const correct = index < 10 ? isCorrect({ index, outputLines }) : null;
    const name = names[index];
    console.log({ name, input, output: testsOutput.output, correct });
    return { name, input, output: testsOutput.output, correct };
  });
}

// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['הדפסה'];
}
export function desription() {
  return <></>;
}
export function examples() {
  return <></>;
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