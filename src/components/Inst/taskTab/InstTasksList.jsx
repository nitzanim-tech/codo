import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Directions } from '@mui/icons-material';
import tasks from '../../../Tasks/TasksList.json';

const DropdownWrapper = ({ children }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const dividers = [1, 2, 4, 5,9];

export default function InstTasksList({ selectedTask, setSelectedTask }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <DropdownWrapper>
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
      </DropdownWrapper>
    </div>
  );
}
