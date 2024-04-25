export function reformatLessons({ linkedList, groupData }) {
  const orderedFormat = {};
  let currentLessonId = linkedList['firstLesson'];

  while (currentLessonId) {
    const lessonData = linkedList[currentLessonId];
    const elements = {};

    let currentElementId = lessonData.firstElement;
    let lastElementId;

    while (currentElementId) {
      const elementData = lessonData.elements[currentElementId];
      elements[currentElementId] = {
        name: elementData.name,
        type: elementData.type,
        link: elementData.link,
      };
      if (groupData[currentElementId] || !groupData) {
        elements[currentElementId]['setting'] = groupData[currentElementId];
      }
      lastElementId = currentElementId;
      currentElementId = elementData.next;
    }
    orderedFormat[currentLessonId] = {
      lessonName: lessonData.lessonName,
      elements: elements,
      lastElementId: lastElementId,
    };

    currentLessonId = lessonData.nextLesson;
  }
  return orderedFormat;
}
