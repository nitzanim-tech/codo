import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { getKeyValue, Spinner } from '@nextui-org/react';

import getStudentData from '../requests/getStudents';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../util/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App1() {
  const [isLoading, setIsLoading] = useState(true);
  const [studentsRawData, setStudentsRawData] = useState(null);
  const [sortDescriptor, setSortDescriptor] = useState({ column: 'name', direction: 'ascending' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudentData(app);
      const cleanedData = data.map((item, index) => {
        const { submissions, ...rest } = item;
        return { ...rest, id: index };
      });
      setStudentsRawData(cleanedData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSortChange = (column) => {
    if (sortDescriptor.column === column) {
      setSortDescriptor({
        column,
        direction: sortDescriptor.direction === 'ascending' ? 'descending' : 'ascending',
      });
    } else {
      setSortDescriptor({ column, direction: 'ascending' });
    }
  };

  const sortedData =
    studentsRawData &&
    studentsRawData.sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];
      let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

      if (sortDescriptor.direction === 'descending') {
        cmp *= -1;
      }

      return cmp;
    });

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={sortDescriptor}
      onSortChange={handleSortChange}
      dir="rtl"
      classNames={{
        table: 'min-h-[400px]',
      }}
    >
      <TableHeader>
        <TableColumn key="name" allowsSorting>
          שם
        </TableColumn>
        <TableColumn key="lastName" allowsSorting>
          משפחה
        </TableColumn>
        <TableColumn key="email" allowsSorting>
          Email
        </TableColumn>
        <TableColumn key="group" allowsSorting>
          קבוצה
        </TableColumn>
      </TableHeader>
      <TableBody items={sortedData || []} isLoading={isLoading} loadingContent={<Spinner label="Loading..." />}>
        {(item, index) => (
          <TableRow key={index}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
