import { useState, useEffect } from 'react';
import { useFirebase } from '../../util/FirebaseProvider';
import getAllTasks from '../../requests/tasks/getAllTasks';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react';
import formatDate from '../../util/formatDate';
const DevTasksTab = () => {
  const { app } = useFirebase();
  const [tasks, setTasks] = useState([]);
  const DEVELOPERS = { kTqDi3pSI5NkUW21FbJF6sxDm3D3: 'dev A', ChckIIGujWbg2FFZeRzDHbcIMrk2: 'בינקי ביל' };

  useEffect(() => {
    const fetchData = async () => {
      const allTasks = await getAllTasks({ app });
      const tasksArray = Object.entries(allTasks).map(([id, taskData]) => ({
        uid: id,
        ...taskData,
      }));
      setTasks(tasksArray);
    };
    fetchData();
  }, []);

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
    <>
      <Table aria-label="Tasks">
        <TableHeader>
          <TableColumn>id</TableColumn>
          <TableColumn>name</TableColumn>
          <TableColumn>lastUpdate</TableColumn>
          <TableColumn>level</TableColumn>
          <TableColumn>subjects</TableColumn>
          <TableColumn>writer</TableColumn>
        </TableHeader>

        <TableBody>
          {tasks &&
            tasks.map((task) => (
              <TableRow key={task.uid} onClick={() => onTaskClick(task)}>
                <TableCell>{task.uid}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.lastUpdate ? formatDate(task.lastUpdate) : '?'}</TableCell>
                <TableCell>{task.level || '?'}</TableCell>
                <TableCell>
                  {task.subjects &&
                    task.subjects.map((subject) => (
                      <Chip key={subject} variant="faded">
                        {subject}
                      </Chip>
                    ))}
                </TableCell>
                <TableCell>{DEVELOPERS[task.writer]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};
export default DevTasksTab;
