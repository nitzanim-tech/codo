import * as Experience from './experience';
import * as BasicElevator from './BasicElevator';

const tasks = {
  0: Experience,
  1: BasicElevator,
};

export function testsName(task) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].testsName();
  } else {
    throw new Error(`In testsName: Invalid task number: ${task}`);
  }
}

export function getInstructions(task) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getInstructions();
  } else {
    throw new Error(`In getInstructions: Invalid task number: ${task}`);
  }
}

export function getTaskTests(task) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getTaskTests();
  } else {
    throw new Error(`In getTaskTests: Invalid task number: ${task}`);
  }
}

export function getTaskExplanation(task) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getTaskExplanation();
  } else {
    throw new Error(`In getTaskExplanation: Invalid task number: ${task}`);
  }
}