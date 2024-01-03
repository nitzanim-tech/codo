import React from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import tasks from '../../../Tasks/TasksList.json';

const DropdownWrapper = ({ children }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const dividers = [1, 2, 4, 5, 9, 12, 13];

export default function InstTasksList({ selectedTask, setSelectedTask }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Autocomplete dir="rtl" placeholder="בחר משימה" className="max-w-xs" defaultSelectedKey={tasks[0].key}>
        {tasks.map((task) => (
          <AutocompleteItem
            key={task.key}
            onClick={() => setSelectedTask(task.key)}
            showDivider={dividers.includes(task.key)}
          >
            {task.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      {/* <DropdownWrapper>
        <Dropdown>
          <DropdownTrigger>
            <button className="py-2 px-4 w-full text-left">{tasks[selectedTask]?.name || 'בחר משימה'}</button>
          </DropdownTrigger>
          <DropdownMenu>
            {tasks.map((task) => (
              <DropdownItem
                key={task.key}
                onClick={() => setSelectedTask(task.key)}
                showDivider={dividers.includes(task.key)}
              >
                {task.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </DropdownWrapper> */}
    </div>
  );
}
