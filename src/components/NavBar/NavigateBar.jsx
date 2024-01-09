import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import logoImg from '../../assets/img/logo.png';
import FirebaseAuth from './FirebaseAuth';
import { Select, SelectItem, Button, Tooltip } from '@nextui-org/react';
import { onAuthStateChanged } from 'firebase/auth';
import getCurrentUser from '../../requests/getCurrentUser';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { useFirebase } from '../../util/FirebaseProvider';

const courseBookUrl = 'https://drive.google.com/file/d/19ZABUSmex80nO07J074tY0Ma2Cietb0p/view';
const releasedTasks = [
  { value: 0, label: 'הכנה 0 - התנסות' },
  { value: 1, label: 'הכנה 1 - מעלית' },
  { value: 2, label: 'תנאים - אי שיוון המשולש' },
  { value: 3, label: 'תרגול מונחה - השערת קולץ' },
  { value: 4, label: 'תרגול מונחה - יאללה, למחזורית!' },
  { value: 5, label: 'רשימות - wordle' },
  { value: 6, label: 'for -  חימום' },
  { value: 7, label: 'for -  מספר משוכלל' },
  { value: 8, label: 'for -  שבע בום' },
  { value: 9, label: 'אתגר - עיתונאי נולד' },
  { value: 10, label: 'לולאה מקוננת - לוח הכפל' },
  { value: 11, label: 'לולאה מקוננת - wordle' },
  { value: 12, label: 'תרגול מונחה - שפע יששכר' },
  { value: 13, label: 'תרגול מונחה - הכנה לבוחן' },
  { value: 14, label: 'בוחן 1 - תנאים ולולאות' },
];

const betaTasks = releasedTasks.concat([
  { value: 15, label: 'בוחן 1 - למדריכים בלבד' },
  { value: 16, label: 'טסט' },
]);

const selectItemDivide = [1, 2, 4, 5, 9, 12, 13];

export default function NavigateBar({ task, setTask, isShowTask }) {
  const { app, auth } = useFirebase();
  const [currentUser, setCurrentUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [tasks, setTasks] = useState(releasedTasks);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        if (user.email.includes('@nitzanim.tech')) setTasks(betaTasks);
        const userData = await getCurrentUser({ app, id: user.uid });
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
              defaultValue={tasks[task].value}
              placeholder={tasks[task].label}
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
