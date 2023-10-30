import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import logoImg from '../../assets/img/logo.png';
import FirebaseAuth from './FirebaseAuth';
import { Select, SelectItem, Button, Tooltip } from '@nextui-org/react';
import firebaseConfig from '../../util/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import getCurrentStudent from '../../requests/getCurrentStudent';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const courseBookUrl = 'https://drive.google.com/file/d/19ZABUSmex80nO07J074tY0Ma2Cietb0p/view';
const tasks = [
  { value: 0, label: 'משימה 0 - התנסות', finish: true },
  { value: 1, label: 'משימה 1 - מעלית', finish: false },
];

export default function NavigateBar({ setTask, isShowTask }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userData = await getCurrentStudent({ app, id: user.uid });
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
                  dir="rtl"
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
