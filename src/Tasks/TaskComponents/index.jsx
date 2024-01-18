import * as PerfectNumber from './PerfectNumber';
import * as AliceElevator from './Preparation/AliceElevator';

const tasks = {
  c3194b8af385: AliceElevator,
  lri4kgr3s5k5p3943h: PerfectNumber,
};

// TestList.jsx
export function getTaskExplanation({ task, selectedValue }) {
  console.log(task);
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getTaskExplanation(selectedValue);
  } else {
    throw new Error(`In getTaskExplanation: Invalid task number: ${task}`);
  }
}
