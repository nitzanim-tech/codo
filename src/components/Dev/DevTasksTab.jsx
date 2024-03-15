import { useState, useEffect } from 'react';
import { useFirebase } from '../../util/FirebaseProvider';
import getAllTasks from '../../requests/tasks/getAllTasks';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react';

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

  return (
    <>
      <Table aria-label="Tasks">
        <TableHeader>
          <TableColumn>id</TableColumn>
          <TableColumn>name</TableColumn>
          <TableColumn>type</TableColumn>
          <TableColumn>tests</TableColumn>
          <TableColumn>subjects</TableColumn>
          <TableColumn>writer</TableColumn>
        </TableHeader>

        <TableBody>
          {tasks &&
            tasks.map((task) => (
              <TableRow key={task.uid}>
                <TableCell>{task.uid}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.code ? 'default' : 'custom'}</TableCell>

                <TableCell>{task.tests?.length}</TableCell>
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
