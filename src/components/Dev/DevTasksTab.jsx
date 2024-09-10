import { useAsyncList } from '@react-stately/data';
import { Chip, Spinner, Button, Select, SelectItem, Tooltip } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import SearchIcon from '@mui/icons-material/Search';
import formatDate from '../../util/formatDate';
import getRequest from '../../requests/anew/getRequest';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DEVELOPERS from './Developers';
import { useState, useMemo } from 'react';

const DevTasksTab = () => {
  const [filterValue, setFilterValue] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const syllabusColors = {
    'שנה א | תשפד': '#FAE233',
    'שנה א | תשפה': '#BF1E2E',
    'מחנה קיץ | תשפד': '#386641',
    '': '#005395',
  };
  let list = useAsyncList({
    async load({ signal }) {
      const allTasks = await getRequest({ getUrl: 'getTasksList', authMethod: 'jwt', signal });
      const tasksArray = Object.entries(allTasks).map(([id, taskData]) => ({
        uid: taskData.id,
        ...taskData,
      }));
      console.log(tasksArray);
      return {
        items: tasksArray,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];

          if (sortDescriptor.column === 'lastUpdate') {
            first = first ? new Date(first) : new Date(0);
            second = second ? new Date(second) : new Date(0);
          }

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
    window.location.href = `./dev/editTask/${task.id}`;
  };

  const filteredItems = useMemo(() => {
    return list.items
      .filter((task) => task.name.toLowerCase().includes(filterValue.toLowerCase()))
      .filter((task) => !selectedSubject || task.mainSubject === selectedSubject);
  }, [list.items, filterValue, selectedSubject]);

  return (
    <>
      <div className="flex gap-4 mb-4 w-7/10 mx-auto" style={{ width: '70%' }}>
        <Input
          isClearable
          placeholder="Search by task name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => setFilterValue('')}
          onValueChange={(value) => setFilterValue(value)}
        />
        <Select
          placeholder="Select Main Subject"
          selectedKeys={selectedSubject}
          value={selectedSubject}
          onChange={(value) => setSelectedSubject(value.target.value)}
        >
          <SelectItem key="">All Subjects</SelectItem>
          {Array.from(new Set(list.items.map((task) => task.mainSubject))).map((subject) => (
            <SelectItem key={subject}>{subject}</SelectItem>
          ))}
        </Select>
        <Button onClick={() => (window.location.href = './dev/newTask')}>Add new</Button>
      </div>

      <Table
        aria-label="Tasks Table with Sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: 'min-h-[100px]',
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

        <TableBody items={filteredItems} isLoading={list.isLoading} loadingContent={<Spinner label="Loading..." />}>
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
                    <Tooltip key={syllab} content={syllab} arrow>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: syllabusColors[syllab] || 'gray',
                          marginRight: '5px',
                        }}
                      />
                    </Tooltip>
                  ))}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DevTasksTab;
