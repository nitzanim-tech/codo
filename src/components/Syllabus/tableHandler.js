const practiceTemplate = [
  { id: 'asda', index: 0, name: 'האם', type: 'main' },
  { id: 'sdda', index: 1, name: 'שלום ', type: 'main' },
  { id: 'dfgh', index: 2, name: 'שישי', type: 'drill' },
  { id: 'daas', index: 3, name: 'עולם', type: 'pre' },
  { id: null, index: 4, name: '', type: 'main' },
  { id: 'qwer', index: 5, name: 'אני רוצה', type: 'main' },
  { id: 'tyui', index: 6, name: 'תכלס', type: 'drill' },
  { id: 'ghjk', index: 7, name: 'מתי אתם חוזרים', type: 'drill' },
  { id: null, index: 8, name: '', type: 'main' },
  { id: 'yuio', index: 9, name: 'לעבוד', type: 'main' },
];
const defaultPractice = [
  { id: null, index: 0, name: '', type: 'main' },
  { id: null, index: 1, name: '', type: 'main' },
  { id: null, index: 2, name: '', type: 'pre' },
  { id: null, index: 3, name: '', type: 'main' },
  { id: null, index: 4, name: '', type: 'main' },
  { id: null, index: 5, name: '', type: 'main' },
  { id: null, index: 6, name: '', type: 'main' },
];

const addRowIndices = (template) => {
  const updatedTemplate = [];
  let columnIndex = 0;
  let preRowIndex = 0;
  let drillRowIndex = 0;

  template.forEach((item) => {
    if (item.type === 'pre') {
      updatedTemplate.push({ ...item, row: preRowIndex });
      preRowIndex++;
    } else if (item.type === 'main') {
      updatedTemplate.push({ ...item, row: null });
      columnIndex++;
    } else if (item.type === 'drill') {
      updatedTemplate.push({ ...item, row: drillRowIndex });
      drillRowIndex++;
    }
  });

  return updatedTemplate;
};

const organizeDataByIndex = (template) => {
  const organizedData = {};
  let columnIndex = 0;

  template.forEach((item) => {
    if (!organizedData[columnIndex]) {
      organizedData[columnIndex] = { pre: [], main: null, drill: [] };
    }

    if (item.type === 'pre') {
      organizedData[columnIndex].pre.push(item);
    } else if (item.type === 'main') {
      organizedData[columnIndex].main = item;
      columnIndex++;
    } else if (item.type === 'drill') {
      if (!organizedData[columnIndex - 1]) {
        organizedData[columnIndex - 1] = { pre: [], main: null, drill: [] };
      }
      organizedData[columnIndex - 1].drill.push(item);
    }
  });

  return organizedData;
};


const movePracticeListIndexes = (practice, startIndex, change) => {
  for (let i = startIndex; i < practice.length; i++) {
    practice[i].index += change;
  }
};

const deleteItem = (practice, content) => {
  let index = practice.findIndex((item) => item.id === content.id);

  if (index !== -1) {
    const updatedPractice = practice
      .map((item, i) => {
        if (i === index) {
          if (item.type === 'main') {
            return { ...item, name: '', id: null };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);

    movePracticeListIndexes(updatedPractice, index, -1);
    return updatedPractice;
  }

  return practice;
};

const addItem = (practice, clickedCell, chosenTask) => {
  console.log({ practice, clickedCell });
  let index = 0;
  let mainObjectFound = 0;
  while (mainObjectFound < clickedCell.column) {
    index++;
    if (practice[index].type == 'main') mainObjectFound++;
  }
  if (clickedCell.type == 'drill') {
    index += clickedCell.row + 1;
  }
  if (index >= practice.length) {
    const newItem = { id: chosenTask.id, name: chosenTask.name, index, ...clickedCell };
    practice.push(newItem);
  } else {
    if (practice[index].type == clickedCell.type && index < practice.length) {
      practice[index].id = chosenTask.id;
      practice[index].name = chosenTask.name;
    } else {
      const newItem = { id: chosenTask.id, name: chosenTask.name, index, ...clickedCell };
      movePracticeListIndexes(practice, index, 1);
      practice.splice(index, 0, newItem);
    }
  }
  return practice;
};

export { defaultPractice, addRowIndices, organizeDataByIndex, deleteItem, addItem };
