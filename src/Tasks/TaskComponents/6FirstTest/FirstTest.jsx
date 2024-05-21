import React from 'react';

export function getTaskExplanation(selectedValue) {
  let miniTestsList = [{}, {}, {}, {}];
  const Salads = ['salad', 'humus', 'tehini', 'harif', 'amba', 'cabbage', 'pickles', 'chips', 'onion'];
  const SaladsWithoutHumus = Salads.filter((item) => item !== 'humus');
  const SaladsWithoutPickles = SaladsWithoutHumus.filter((item) => item !== 'pickles');
  const SaladsWithoutThini = SaladsWithoutPickles.filter((item) => item !== 'tehini');
  switch (selectedValue.index) {
    case 0: // printing the menu
      miniTestsList[0].include = ['half', '15'];
      miniTestsList[1].include = ['mana', '25'];
      miniTestsList[2].include = ['deal', '33'];
      break;
    case 1: //updating the list of salads
      miniTestsList[0] = { include: Salads };
      miniTestsList[1] = { include: SaladsWithoutHumus, notInclude: ['humus'] };
      miniTestsList[2] = { include: SaladsWithoutPickles, notInclude: ['humus', 'pickles'] };
      miniTestsList[3] = {
        include: SaladsWithoutThini,
        notInclude: ['humus', 'pickles', 'tehini'],
      };
      break;
    case 2: // printing the list of selected salads
      miniTestsList[0] = {
        include: ['humus', 'pickles', 'tehini', 'salad'],
        notInclude: ['harif', 'amba', 'cabbage', 'onion'],
      };
      break;
    case 3: // printing the correct price
      miniTestsList[0].include = ['pay', '25'];
      break;
    case 4: // cash in several currencies and excess
      miniTestsList[0].include = ['back', '8'];
      break;
    case 5: //Cash Exact Price
      miniTestsList[0].include = ['back', '0'];
      break;
    case 6: //credit
      miniTestsList[0].include = ['received'];
      break;
    case 7: //some customers
      miniTestsList[0].include = ['pay', '25'];
      miniTestsList[1].include = ['pay', '33'];
      break;
    case 8: // printing all the recives
      miniTestsList[0].include = ['(בשמונה ההדפסות האחרונות)', 'deal', '33'];
      miniTestsList[1].include = ['(בשמונה ההדפסות האחרונות)', 'mana', '25'];
      miniTestsList[2].include = ['(בשמונה ההדפסות האחרונות)', 'half', '15'];
      break;
    case 9: //correct profit amount
      miniTestsList[0].include = ['earned', '34'];
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 0.3, marginLeft: '50px' }}>
          <p>עבור הקלט: </p>
          <pre
            style={{
              color: '#0b7309',
              fontWeight: 'bold',
              fontFamily: 'Courier',
              direction: 'ltr',
            }}
          >
            {selectedValue.input}
          </pre>
        </div>
        <div style={{ flex: 1 }}>
          <p>חיפשנו:</p>
          {miniTestsList.map((miniTest, index) => (
            <React.Fragment key={index}>
              {miniTest.include && <p>● שורה המכילה את המילים {miniTest.include.join(', ')}</p>}
              {miniTest.notInclude && <p>ולא מכילה את המילים {miniTest.notInclude.join(', ')}</p>}
            </React.Fragment>
          ))}
          <br />
          {selectedValue.correct ? <p>ומצאנו. כל הכבוד!</p> : <p>ולא מצאנו. נסו שוב :)</p>}{' '}
        </div>
      </div>
    </>
  );
}
export function processTestsOutputs({ taskTests, testsOutputs }) {
    const names = taskTests.map((test) => test.name);
    const Salads = ['salad', 'humus', 'tehini', 'harif', 'amba', 'cabbage', 'pickles', 'chips', 'onion'];
    const SaladsWithoutHumus = Salads.filter((item) => item !== 'humus');
    const SaladsWithoutPickles = SaladsWithoutHumus.filter((item) => item !== 'pickles');
    const SaladsWithoutThini = SaladsWithoutPickles.filter((item) => item !== 'tehini');
    const isLineContains = (output, includeWords, excludeWords) => {
      for (let line of output) {
        let includeAll = includeWords.every((word) => line.toLowerCase().includes(word));
        let excludeAny = excludeWords.some((word) => line.toLowerCase().includes(word));
        if (includeAll && !excludeAny) {
          return true;
        }
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

        case 3: // printing the correct price
          return isLineContains(outputLines, ['pay', '25'], []);

        case 4: // cash in several currencies and excess
          return isLineContains(outputLines, ['back', '8'], []);

        case 5: //Cash Exact Price
          return isLineContains(outputLines, ['back', '0'], []);

        case 6: //credit
          return isLineContains(outputLines, ['received'], []);

        case 7: //some customers
          return isLineContains(outputLines, ['pay', '25'], []) && isLineContains(outputLines, ['pay', '33'], []);

        case 8: // printing all the recives
          const lastLines = outputLines.slice(-8);
          return (
            isLineContains(lastLines, ['deal', '33'], []) &&
            isLineContains(lastLines, ['mana', '25'], []) &&
            !isLineContains(lastLines, ['half', '15'], [])
          );

        case 9: //correct profit amount
          return isLineContains(outputLines, ['earned', '34'], []);
      }
    };
    return testsOutputs.map((testsOutput, index) => {
      const input = testsOutput.input;
      const outputLines = testsOutput.output ? testsOutput.output.split('\n') : '';
      const correct = index < 10 ? isCorrect({ index, outputLines }) : null;
      const name = names[index];
      return { name, input, output: testsOutput.output, correct, index };
    });

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
