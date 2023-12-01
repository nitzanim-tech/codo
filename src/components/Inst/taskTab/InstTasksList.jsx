import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Directions } from '@mui/icons-material';

const DropdownWrapper = ({ children }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const tasks = [
  { key: 0, name: 'הכנה 0 - התנסות' },
  { key: 1, name: 'הכנה 1 - מעלית' },
  { key: 2, name: 'תנאים - אי שיוון המשולש' },
  { key: 3, name: 'תרגול מונחה - השערת קולץ' },
  { key: 4, name: '!תרגול מונחה - יאללה, למחזורית' },
  { key: 5, name: 'wordle - רשימות' },
  { key: 6, name: 'for -  מספר משוכלל' },
  { key: 7, name: 'for -  שבע בום' },
  { key: 8, name: 'for -  קרץ אותי קרץ' },
];

const dividers = [1, 2, 4, 5];

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
