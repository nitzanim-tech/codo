import { createContext, useState, useContext } from 'react';
import { useFirebase } from '../../../util/FirebaseProvider';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const { app, userData } = useFirebase();
  const dist = '20';

  const [currentEdit, setCurretEdit] = useState('subjects');

  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [description, setDescription] = useState('');
  const [example, setExample] = useState('');
  const [htmlEditing, setHtmlEditing] = useState('');

  const [code, setCode] = useState('# write here');
  const [tests, setTests] = useState([]);

  const onSendDefaultClick = () => {
    const newTask = { name, code, subjects, description, example, tests, writer: userData.id };
    addTask({ app, newTask });
  };

  const onSendCustomClick = () => {
    const newTask = { name, subjects, description, example, tests, writer: userData.id };
    addTask({ app, newTask });
  };

  return (
    <TaskContext.Provider
      value={{
        currentEdit,
        setCurretEdit,
        name,
        setName,
        subjects,
        setSubjects,
        description,
        setDescription,
        example,
        setExample,
        htmlEditing,
        setHtmlEditing,
        code,
        setCode,
        tests,
        setTests,
        onSendDefaultClick,
        onSendCustomClick,
        dist,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };

