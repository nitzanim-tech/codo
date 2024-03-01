import { useState, useEffect } from 'react';
import { Accordion, AccordionItem, CircularProgress } from '@nextui-org/react';

import { useFirebase } from '../../../util/FirebaseProvider';
import getAllLessons from '../../../requests/lessons/getAllLessons';
import AddElement from './AddElement';
import Rearrange from './Rearrange';
import { FileCard, DevTaskCard } from '../../general/Cards';
import AddLesson from './AddLesson';

const tasks = [
  { '7e9e4f50c46c': 'הכנה 0 - שלום עולם' },
  { c3194b8af385: 'הכנה 1 - מעלית' },
  { df3ef7216ca5: 'תנאים - אי שיוון המשולש' },
  { bed010d87c10: 'תרגול מונחה - השערת קולץ' },
  { c0e095edfd28: '!תרגול מונחה - יאללה, למחזורית' },
];
function ManageLessons() {
  const { app } = useFirebase();
  const [lessons, setLessons] = useState(null);
  const [tasksList, setTasksList] = useState(tasks);

  useEffect(() => {
    const fetchLessons = async () => {
      const allLessons = await getAllLessons({ app });
      setLessons(allLessons);
    };
    fetchLessons();
  }, []);

  return (
    <>
      {!lessons ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ width: '50%' }}>
          <Accordion dir="rtl" isCompact selectionMode={'multiple'}>
            {Object.entries(lessons).map(([lessonId, lessonData]) => {
              const lastElementId = lessonData.lastElementId || null;

              return (
                <AccordionItem
                  key={lessonId}
                  aria-label={`Accordion ${lessonData.lessonName}`}
                  title={lessonData.lessonName}
                  variant={'bordered'}
                >
                  {lessonData.elements &&
                    Object.entries(lessonData.elements).map(([elementId, file]) =>
                      file.type === 'task' ? (
                        <DevTaskCard key={elementId} index={file.index} text={file.name} />
                      ) : (
                        <FileCard key={elementId} file={file} />
                      ),
                    )}
                  <AddElement tasksList={tasksList} lesson={lessonId} lastElementId={lastElementId} />
                  <Rearrange elements={lessonData.elements} />
                </AccordionItem>
              );
            })}
          </Accordion>

          <AddLesson />
        </div>
      )}
    </>
  );
}

export default ManageLessons;
