import * as Experience from './experience';
import * as BasicElevator from './BasicElevator';
import * as TriangleInequality from './TriangleInequality';
import * as CollatzConjecture from './CollatzConjecture';
import * as RecyclingChallenge from './RecyclingChallenge';
import * as WordleLists from './WordleLists';
import * as SevenBoom from './SevenBoom';
import * as KaratzOtiKaratz from './KaratzOtiKaratz';

const tasks = {
  0: Experience,
  1: BasicElevator,
  2: TriangleInequality,
  3: CollatzConjecture,
  4: RecyclingChallenge,
  5: WordleLists,
  6: SevenBoom,
  8: KaratzOtiKaratz,
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
