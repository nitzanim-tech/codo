import * as HelloWord from './0Preparation/HelloWord';
import * as AliceElevator from './0Preparation/AliceElevator';
import * as TriangleInequality from './1if/TriangleInequality';
import * as CollatzConjecture from './2while/CollatzConjecture';
import * as RecyclingChallenge from './2while/RecyclingChallenge';
import * as WordleLists from './3lists/WordleLists';
import * as ForIntro from './4for/ForIntro';
import * as PerfectNumber from './4for/PerfectNumber';
import * as SevenBoom from './4for/SevenBoom';
import * as ReadableParagraph from './4for/ReadableParagraph';
import * as WordleFor from './5nestedLoop/WordleFor';
import * as MultiplicationTable from './5nestedLoop/MultiplicationTable';
import * as ShefaIssaschar from './5nestedLoop/ShefaIssaschar';
import * as BeforeFirstTest from './6FirstTest/BeforeFirstTest';
import * as FirstTest from './6FirstTest/FirstTest';

const tasks = {
  '7e9e4f50c46c': HelloWord, //0
  c3194b8af385: AliceElevator, //1
  df3ef7216ca5: TriangleInequality, //2
  bed010d87c10: CollatzConjecture, //3
  c0e095edfd28: RecyclingChallenge, //4
  '0e4bf0beeacd': WordleLists, //5
  '29b6d7990c43': ForIntro, //6
  kgr3s5k5p394: PerfectNumber, //7
  '9e9b9d609909': SevenBoom, //8
  '40458c1a53ee': ReadableParagraph, //9
  '79c9fb0d3074': MultiplicationTable, //10
  b6565fbea41a: WordleFor, //11
  '7cfa6c3a94ba': ShefaIssaschar, //12
  '991be3a0d2c7': BeforeFirstTest, //13
  ca8e2ed044c0: FirstTest, //14
};

export function getTaskExplanation({ task, selectedValue }) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getTaskExplanation(selectedValue);
  } else {
    throw new Error(`In getTaskExplanation: Invalid task number: ${task}`);
  }
}
