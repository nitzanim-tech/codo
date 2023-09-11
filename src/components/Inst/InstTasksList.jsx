import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';

const ListboxWrapper = ({ children }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function InstTasksList() {
  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Example with disabled actions"
        disabledKeys={['edit', 'delete']}
        onAction={(key) => alert(key)}
      >
        <ListboxItem key="new"> התנסות (0)</ListboxItem>
        <ListboxItem key="copy">1 - מעלית</ListboxItem>
        <ListboxItem key="edit">2 - מיון מהיר</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}
