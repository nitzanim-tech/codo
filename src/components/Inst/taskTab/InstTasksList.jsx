import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';

const ListboxWrapper = ({ children }) => (
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
];
const dividers = [1, 2];

export default function InstTasksList({ setSelectedTask }) {
  return (
    <ListboxWrapper>
      <Listbox aria-label="Example with disabled actions" onAction={(key) => setSelectedTask(key)}>
        {tasks.map((task) => (
          <ListboxItem key={task.key} showDivider={dividers.includes(task.key)}>
            {task.name}
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
}
