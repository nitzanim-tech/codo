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

    moveListIndexes(updatedPractice, index, -1);
    return updatedPractice;
  }

  return practice;
};


const moveListIndexes = (list, startIndex, change) => {
  for (let i = startIndex; i < list.length; i++) {
    list[i].index += change;
  }
};


function insertOrUpdateAtIndex(list, newObj, action) {
  if (action === 'update') {
    list.splice(newObj.index, 1);
  } else if (action === 'add') {
    moveListIndexes(list, newObj.index, 1);
  }

  return [...list.slice(0, newObj.index), newObj, ...list.slice(newObj.index)];
}



export { addRowIndices, organizeDataByIndex, deleteItem, insertOrUpdateAtIndex };
