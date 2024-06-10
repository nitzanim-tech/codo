import React, { useState } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/listbox';

function DraggableList({ items, setItems, onAction }) {
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('dragIndex', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index !== dragOverIndex) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('dragIndex');

    if (draggedIndex === index.toString()) return;
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
    setDragOverIndex(null);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  return (
    <Listbox aria-label="Draggable List" onAction={onAction}>
      {items.map((item, index) => (
        <ListboxItem
          key={item.id}
          showDivider={dragOverIndex !== null && index === dragOverIndex - 1}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragLeave={handleDragLeave}
          css={{ marginBottom: 8, padding: '8px', backgroundColor: '#fff', border: '1px solid #ddd', cursor: 'move' }}
        >
          {item.name}
        </ListboxItem>
      ))}
    </Listbox>
  );
}

export default DraggableList;
