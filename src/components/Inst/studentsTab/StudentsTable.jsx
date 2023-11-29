import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { getKeyValue, Spinner } from '@nextui-org/react';
import EditStudentButton from './EditStudentButton';
import getGroups from '../../../requests/getGroups';

export default function StudentsTable({ app, isLoading, studentsRawData }) {
  const [sortDescriptor, setSortDescriptor] = useState({ column: 'name', direction: 'ascending' });
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const getGroupFromDb = async () => {
      try {
        const groupFromDB = await getGroups(app);
        setGroups(groupFromDB);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    getGroupFromDb();
  }, []);

  useEffect(() => {
    if (groups) {
      console.log('Groups data available:', groups);
    }
  }, [groups]);
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
    <>
      {groups ? <EditStudentButton studentData={{ hh: 'nj' }} groups={groups} /> : <Spinner />}

      <Table
        aria-label="Example table with client side sorting"
        sortDescriptor={sortDescriptor}
        onSortChange={handleSortChange}
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
          <TableColumn key="edit">ערוך</TableColumn>
        </TableHeader>
        <TableBody items={sortedData || []} isLoading={isLoading} loadingContent={<Spinner label="Loading..." />}>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              {Object.keys(item).map((columnKey) => (
                <TableCell key={columnKey}>
                  {columnKey !== 'edit' ? (
                    getKeyValue(item, columnKey)
                  ) : groups ? (
                    <EditStudentButton studentData={item} groups={groups} />
                  ) : (
                    <Spinner />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
