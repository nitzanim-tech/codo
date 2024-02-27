import { useState, useEffect } from 'react';
import { Accordion, AccordionItem, CircularProgress } from '@nextui-org/react';

import { useFirebase } from '../../../util/FirebaseProvider';
import getAllLessons from '../../../requests/lessons/getAllLessons';
import { FileCard, DevTaskCard } from '../../general/Cards';

function ManageLessonsInst() {
  const { app } = useFirebase();
  const [lessons, setLessons] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      const allLessons = await getAllLessons(app);
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
            {Object.entries(lessons).map(([lesson, lessonData]) => (
              <AccordionItem
                key={`${lesson}`}
                aria-label={`Accordion ${lessonData.lessonName}`}
                title={lessonData.lessonName}
                variant={'bordered'}
              >
                {lessonData.elements &&
                  Object.entries(lessonData.elements).map(([element, file]) =>
                    file.type === 'task' ? (
                      <DevTaskCard index={file.index} text={file.name} isInst />
                    ) : (
                      <FileCard file={file} isInst />
                    ),
                  )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </>
  );
}

export default ManageLessonsInst;
