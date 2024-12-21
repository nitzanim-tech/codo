import { useState, useEffect } from 'react';
import { ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent } from '@nextui-org/react';
import getRequest from '../../../requests/anew/getRequest';
import { useDisclosure } from '@nextui-org/react';
import { Loading } from '../../General/Messages';

const TaskLoaderModal = ({ taskId, setTaskData, loading, setLoading }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const localStorageKey = `newTask-${taskId}`;
  const [serverTask, setServerTask] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      const localTask = JSON.parse(localStorage.getItem(localStorageKey));
      const taskFromDb = await getRequest({ getUrl: `getTask?taskId=${taskId}&inDevPage=true`, authMethod: 'jwt' });
      if (!taskFromDb.error) setServerTask(taskFromDb);
      if (localTask && taskFromDb) onOpenChange(true);
      else if (localTask) setTaskData(localTask);
      else if (!taskFromDb.error) setTaskData(taskFromDb);
      else setTaskData(emptyTask({ id: taskId }));

      setLoading(false);
    };

    loadTasks();
  }, []);

  const handleLocalTaskLoad = () => {
    const localTask = JSON.parse(localStorage.getItem(localStorageKey));
    setTaskData(localTask);
    onOpenChange(false);
  };

  const handleServerTaskLoad = () => {
    setTaskData(serverTask);
    onOpenChange(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="m">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>
              <h3>Select Task to Load</h3>
            </ModalHeader>
            <ModalBody>
              <p>A task was found in both local storage and the server.</p>
              <p>Which one would you like to load?</p>
            </ModalBody>
            <ModalFooter>
              <Button auto flat variant="bordered" color="primary" onClick={handleLocalTaskLoad}>
                Load Local Task
              </Button>
              <Button auto flat variant="bordered" color="primary" onClick={handleServerTaskLoad}>
                Load Server Task
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TaskLoaderModal;

const emptyTask = ({ id }) => {
  return {
    id,
    subjects: [],
    code: '# hello word!!',
    headers: {},
    tests: [],
    description: '',
    example: '',
    isDefault: true,
  };
};
