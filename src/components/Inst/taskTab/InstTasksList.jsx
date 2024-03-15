import React from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import tasks from '../../../Tasks/TasksList.json';


const dividers = [1, 2, 4, 5, 9, 12, 13, 14, 17, 19, 22, 24, 25];

export default function InstTasksList({ selectedTask, setSelectedTask }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Autocomplete
        dir="rtl"
        placeholder="בחר משימה"
        className="max-w-xs"
        defaultSelectedKey={selectedTask}
        variant="bordered"
      >
        {tasks.map((task, index) => (
          <AutocompleteItem
            key={task.key}
            onClick={() => {
              localStorage.setItem('lastSelectedTask', task.key);
              setSelectedTask(task.key);
            }}
            showDivider={dividers.includes(index)}
          >
            {task.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
