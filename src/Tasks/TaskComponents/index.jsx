import * as PerfectNumber from './PerfectNumber';

const tasks = {
  lri4kgr3s5k5p3943h: PerfectNumber,
};

// TestList.jsx
export function getTaskExplanation({ task, selectedValue }) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getTaskExplanation(selectedValue);
  } else {
    throw new Error(`In getTaskExplanation: Invalid task number: ${task}`);
  }
}
