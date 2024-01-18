import * as HelloWord from './0Preparation/HelloWord';

import * as AliceElevator from './0Preparation/AliceElevator';
import * as PerfectNumber from './3for/PerfectNumber';

const tasks = {
  '7e9e4f50c46c': HelloWord,
  'c3194b8af385': AliceElevator,
  'lri4kgr3s5k5p3943h': PerfectNumber,
};

// TestList.jsx
export function getTaskExplanation({ task, selectedValue }) {
  if (tasks.hasOwnProperty(task)) {
    return tasks[task].getTaskExplanation(selectedValue);
  } else {
    throw new Error(`In getTaskExplanation: Invalid task number: ${task}`);
  }
}
