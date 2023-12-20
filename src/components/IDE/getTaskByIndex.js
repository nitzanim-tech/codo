import filesLinks from '../../util/filesLinks.json';

export function getTaskByIndex({ jsonObj = filesLinks, index }) {
  for (let lesson in jsonObj) {
    for (let task in jsonObj[lesson]) {
      if (jsonObj[lesson][task].type === 'task' && jsonObj[lesson][task].index == index) {
        return jsonObj[lesson][task];
      }
    }
  }
  return null;
}
