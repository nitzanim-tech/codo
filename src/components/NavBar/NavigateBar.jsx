import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import logoImg from '../../assets/img/logo.png';
import FirebaseAuth from './FirebaseAuth';
import { Select, SelectItem, Button, Tooltip } from '@nextui-org/react';
import firebaseConfig from '../../util/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import getCurrentUser from '../../requests/getCurrentUser';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const courseBookUrl = 'https://drive.google.com/file/d/19ZABUSmex80nO07J074tY0Ma2Cietb0p/view';
const releasedTasks = [
  { value: 0, label: 'הכנה 0 - התנסות', finish: false },
  { value: 1, label: 'הכנה 1 - מעלית', finish: false },
];
const betaTasks = releasedTasks.concat([
  { value: 2, label: 'תנאים - אי שיוון המשולש', finish: false },
  { value: 3, label: 'תרגול מונחה - השערת קולץ', finish: false },
  { value: 4, label: 'תרגול מונחה - יאללה, למחזורית!', finish: false },
]);

const selectItemDivide = [1, 2];

export default function NavigateBar({ setTask, isShowTask }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [tasks, setTasks] = useState(releasedTasks);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        if (user.email.includes('@nitzanim.tech')) setTasks(betaTasks);
        const userData = await getCurrentUser({ app, id: user.uid });
        console.log(userData);
        setStudentData(userData);
      } else {
        setStudentData(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Navbar dir="rtl" position="static">
      <NavbarBrand style={{ flex: 1 }}>
        <img src={logoImg} style={{ width: '180px', marginRight: '-30%' }} />
      </NavbarBrand>
      {isShowTask && (
        <>
          <NavbarItem isActive style={{ width: '30%' }}>
            <Select
              aria-label="choose-task"
              onChange={(key) => {
                setTask(key.target.value);
              }}
              radius="full"
              labelPlacement={'outside-left'}
              defaultValue={tasks[0].value}
              placeholder={tasks[0].label}
            >
              {tasks.map((task) => (
                <SelectItem
                  key={task.value}
                  value={task.value}
                  showDivider={selectItemDivide.includes(task.value)}
                  dir="rtl"
                  style={{ textAlign: 'right', direction: 'rtl' }}
                  startContent={
                    studentData ? (
                      studentData?.submissions?.[task.value] ? (
                        <TaskAltRoundedIcon sx={{ color: '#005395' }} />
                      ) : (
                        <RadioButtonUncheckedRoundedIcon sx={{ color: 'grey' }} />
                      )
                    ) : null
                  }
                >
                  {task.label}
                </SelectItem>
              ))}
            </Select>
          </NavbarItem>

          <NavbarItem isActive>
            <Tooltip content={'לספר הקורס'} placement={'bottom'}>
              <Button radius="full" isIconOnly variant="faded" onClick={() => window.open(courseBookUrl)}>
                <AutoStoriesOutlinedIcon />
              </Button>
            </Tooltip>
          </NavbarItem>
        </>
      )}
      <NavbarContent justify="end" style={{ flex: 1 }}>
        <FirebaseAuth auth={auth} app={app} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </NavbarContent>
    </Navbar>
  );
}
