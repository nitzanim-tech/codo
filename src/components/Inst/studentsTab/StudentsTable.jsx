import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { getKeyValue, Spinner } from '@nextui-org/react';
import EditStudentButton from './EditStudentButton';
// import getGroups from '../../../requests/groups/getGroups';

export default function StudentsTable({ app, auth, isLoading, students }) {
  const [sortDescriptor, setSortDescriptor] = useState({ column: 'name', direction: 'ascending' });
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const getGroupFromDb = async () => {
      try {
        // const groupFromDB = await getGroups(app, auth);
        const groupFromDB = [];

        setGroups(groupFromDB);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    getGroupFromDb();
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
    students &&
    students.sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];
      let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

      if (sortDescriptor.direction === 'descending') {
        cmp *= -1;
      }

      return cmp;
    });

  return (
    <div style={{ padding: '10px', width: '70%' }}>
      <Table aria-label="Student table" sortDescriptor={sortDescriptor} onSortChange={handleSortChange}>
        <TableHeader>
          <TableColumn key="subLength">משימות שהוגשו</TableColumn>
          <TableColumn key="group">קבוצה</TableColumn> {/*to do: add allowSorting*/}
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="lastName">משפחה</TableColumn>
          <TableColumn key="name">שם</TableColumn>
          <TableColumn key="edit">ערוך</TableColumn>
        </TableHeader>
        <TableBody items={sortedData || []} isLoading={isLoading} loadingContent={<Spinner label="Loading..." />}>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell key={'subLength'}>{getKeyValue(item, 'subLength')}</TableCell>
              <TableCell key={'group'}>{getKeyValue(item, 'group')}</TableCell>
              <TableCell key={'email'}>{getKeyValue(item, 'email')}</TableCell>
              <TableCell key={'lastName'}>{getKeyValue(item, 'lastName')}</TableCell>
              <TableCell key={'name'}>{getKeyValue(item, 'name')}</TableCell>
              <TableCell key={'edit'}>
                {groups ? <EditStudentButton studentData={item} groups={groups} app={app} /> : <Spinner />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
