export function reformatDb(linkedList) {
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
