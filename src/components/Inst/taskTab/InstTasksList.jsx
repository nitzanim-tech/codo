import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';

const ListboxWrapper = ({ children }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
const tasks = [
  { key: 0, name: 'שלום עולם' },
  { key: 1, name: 'אליס והמעלית' },
  // { key: 2, name: 'בוב והחייזרים היפנים' },
];

export default function InstTasksList({ setSelectedTask }) {
  return (
    <ListboxWrapper>
      <Listbox aria-label="Example with disabled actions" onAction={(key) => setSelectedTask(key)}>
        {tasks.map((task) => (
          <ListboxItem key={task.key}>{task.name}</ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
}
