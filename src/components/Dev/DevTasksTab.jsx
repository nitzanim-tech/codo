import { useAsyncList } from '@react-stately/data';
import { Chip, Spinner, Button } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

import formatDate from '../../util/formatDate';
import getRequest from '../../requests/anew/getRequest';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DEVELOPERS from './Developers';

const DevTasksTab = () => {
  let list = useAsyncList({
    async load({ signal }) {
      const allTasks = await getRequest({ getUrl: 'getTasksList', authMethod: 'jwt', signal });
      const tasksArray = Object.entries(allTasks).map(([id, taskData]) => ({
        uid: taskData.id,
        ...taskData,
      }));
      return {
        items: tasksArray,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const onTaskClick = (task) => {
    localStorage.setItem('taskId', task.id);
    localStorage.setItem('name', task.name);
    localStorage.setItem('subjects', JSON.stringify(task.subjects));
    localStorage.setItem('description', task.description);
    localStorage.setItem('example', task.example);
    localStorage.setItem('newTaskCode', task.code);
    localStorage.setItem('tests', JSON.stringify(task.tests));
    localStorage.setItem('level', task.level || 1);
    localStorage.setItem('taskType', task.taskType || 'default');

    window.location.href = `./dev/editTask/${task.id}`;
  };

  return (
    <Table
      aria-label="Tasks Table with Sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      classNames={{
        table: 'min-h-[400px]',
      }}
    >
      <TableHeader>
        <TableColumn key="edit">Edit</TableColumn>
        <TableColumn key="uid" allowsSorting>
          ID
        </TableColumn>
        <TableColumn key="name" allowsSorting>
          Name
        </TableColumn>
        <TableColumn key="lastUpdate" allowsSorting>
          Last Update
        </TableColumn>
        <TableColumn key="level" allowsSorting>
          Level
        </TableColumn>
        <TableColumn key="mainSubject" allowsSorting>
          Main Subject
        </TableColumn>
        <TableColumn key="writer" allowsSorting>
          Writer
        </TableColumn>
        <TableColumn key="syllabus">Syllabus</TableColumn>
      </TableHeader>

      <TableBody items={list.items} isLoading={list.isLoading} loadingContent={<Spinner label="Loading..." />}>
        {(task) => (
          <TableRow key={task.uid}>
            <TableCell>
              <Button variant="light" radius="full" isIconOnly size="sm" onClick={() => onTaskClick(task)}>
                <EditRoundedIcon style={{ color: '#005395' }} />
              </Button>
            </TableCell>
            <TableCell>{task.uid}</TableCell>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.lastUpdate ? formatDate(task.lastUpdate) : '?'}</TableCell>
            <TableCell>{task.level || '?'}</TableCell>
            <TableCell>{task.mainSubject}</TableCell>

            <TableCell>{DEVELOPERS[task.writer]}</TableCell>
            <TableCell>
              {task.syllabus &&
                task.syllabus.map((syllab) => (
                  <Chip key={syllab} color="success" variant="bordered" size="sm">
                    {syllab}
                  </Chip>
                ))}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DevTasksTab;
