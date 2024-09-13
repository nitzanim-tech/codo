import React, { useState, useEffect, useMemo } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useFirebase } from '../../../util/FirebaseProvider';


export default function InstTasksList({ tasks, selectedTask, setSelectedTask }) {
  const { app } = useFirebase();
  const [lessons, setLessons] = useState();

  useEffect(() => {
    const fetchLessons = async () => {
      // const allLessons = await getAllLessons({ app });
       const allLessons = null;

      setLessons(allLessons);
    };
    fetchLessons();
  }, [app]);

  const memoizedLessons = useMemo(() => lessons, [lessons]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Autocomplete
        dir="rtl"
        placeholder="בחר משימה"
        className="max-w-xs"
        defaultSelectedKey={selectedTask}
        variant="bordered"
      >
        {Object.keys(memoizedLessons || {}).map((lessonKey) =>
          Object.keys(memoizedLessons[lessonKey].elements || {}).map((elementKey, index, array) => {
            const element = memoizedLessons[lessonKey].elements[elementKey];
            if (element.type === 'task') {
              return (
                <AutocompleteItem
                  key={elementKey}
                  onClick={() => {
                    localStorage.setItem('lastSelectedTask', elementKey);
                    setSelectedTask(elementKey);
                  }}
                  showDivider={index === array.length - 1}
                >
                  {element.name}
                </AutocompleteItem>
              );
            }
            return null;
          }),
        )}
      </Autocomplete>
    </div>
  );
}
