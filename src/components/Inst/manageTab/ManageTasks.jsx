import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';

export default function App() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['2','3']));

  return (
    <Table
      aria-label="Controlled table example with dynamic content"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) =>
              columnKey === 'role' ? (
                <TableCell>
                  <Chip color="success">{getKeyValue(item, columnKey)}</Chip>
                </TableCell>
              ) : (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const rows = [
  {
    key: '1',
    name: 'שלום עולם',
    role: 'פתיחה',
    status: 'Active',
  },
  {
    key: '2',
    name: 'אליס והמעלית',
    role: 'פתיחה',
    status: 'Paused',
  },
  {
    key: '3',
    name: 'בוב והיפנים המעופפים',
    role: 'for',
    status: 'Active',
  },
  {
    key: '4',
    name: 'גדעון והמקקים',
    role: 'for',
    status: 'Vacation',
  },
];

const columns = [
  {
    key: 'name',
    label: 'שם',
  },
  {
    key: 'role',
    label: 'מפגש',
  },
  {
    key: 'status',
    label: 'STATUS',
  },
];
