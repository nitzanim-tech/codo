import React from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

const dividers = [1, 2, 4, 5, 9, 12, 13, 14, 17, 19, 22, 24, 25];

export default function InstTasksList({ tasks, selectedTask, setSelectedTask }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>

      <Autocomplete
        dir="rtl"
        placeholder="בחר משימה"
        className="max-w-xs"
        defaultSelectedKey={selectedTask}
        variant="bordered"
      >
        {Object.keys(tasks).map((taskKey) => (
          <AutocompleteItem
            key={taskKey}
            onClick={() => {
              localStorage.setItem('lastSelectedTask', taskKey);
              setSelectedTask(taskKey);
            }}
            showDivider={dividers.includes(taskKey)}
          >
            {tasks[taskKey].name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
