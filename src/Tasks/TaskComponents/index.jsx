import * as HelloWord from './0Preparation/HelloWord';
import * as AliceElevator from './0Preparation/AliceElevator';
import * as TriangleInequality from './1if/TriangleInequality';
import * as CollatzConjecture from './2while/CollatzConjecture';
import * as RecyclingChallenge from './2while/RecyclingChallenge';
import * as WordleLists from './3lists/WordleLists';
import * as ForIntro from './4for/ForIntro';
import * as PerfectNumber from './4for/PerfectNumber';

const tasks = {
  '7e9e4f50c46c': HelloWord,
  c3194b8af385: AliceElevator,
  df3ef7216ca5: TriangleInequality,
  bed010d87c10: CollatzConjecture,
  c0e095edfd28: RecyclingChallenge,
  '0e4bf0beeacd': WordleLists,
  '29b6d7990c43': ForIntro,
  lri4kgr3s5k5p3943h: PerfectNumber,
};

export function getTaskExplanation({ task, selectedValue }) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getTaskExplanation(selectedValue);
  } else {
    throw new Error(`In getTaskExplanation: Invalid task number: ${task}`);
  }
}
