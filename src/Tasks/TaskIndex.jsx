import * as CollatzConjecture from './CollatzConjecture';
import * as RecyclingChallenge from './RecyclingChallenge';
import * as WordleLists from './WordleLists';
import * as ForIntro from './ForIntro';
import * as SevenBoom from './SevenBoom';
import * as ReadableParagraph from './ReadableParagraph';
import * as MultiplicationTable from './MultiplicationTable'
import * as WordleFor from './WordleFor';
import * as ShefaIssaschar from './ShefaIssaschar';
import * as FirstTest from './FirstTest'
import * as BeforeFirstTask from './BeforeFirstTest';

const tasks = {
  3: CollatzConjecture,
  4: RecyclingChallenge,
  5: WordleLists,
  6: ForIntro,
  8: SevenBoom,
  9: ReadableParagraph,
  10: MultiplicationTable,
  11: WordleFor,
  12: ShefaIssaschar,
  13: BeforeFirstTask,
  14: FirstTest,
  15: FirstTest,
};

export function testsName(task) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].testsName();
  } else {
    throw new Error(`In testsName: Invalid task number: ${task}`);
  }
}

// instruction.jsx
export function getInstructions(task) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getInstructions();
  } else {
    throw new Error(`In getInstructions: Invalid task number: ${task}`);
  }
}

// RunTestButton.jsx
export function getTaskTests(task) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getTaskTests();
  } else {
    throw new Error(`In getTaskTests: Invalid task number: ${task}`);
  }
}

// TestList.jsx
export function getTaskExplanation(task) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getTaskExplanation();
  } else {
    throw new Error(`In getTaskExplanation: Invalid task number: ${task}`);
  }
}
