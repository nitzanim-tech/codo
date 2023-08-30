import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@nextui-org/react';
import logoImg from '../../assets/img/logo.png';
import FirebaseAuth from './FirebaseAuth';
import { Select, SelectItem, Button, Tooltip } from '@nextui-org/react';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

export default function NavigateBar() {
  const tasks = [
    { name: 'משימה 0 - התנסות', finish: true },
    { name: 'משימה 1 - מעלית', finish: false },
  ];
  const taskFinished = [];
  const [choosenTask, setChoosenTask] = useState('');

  function handleClick() {
    console.log('hi');
  }
  return (
    <Navbar dir="rtl" position="static">
      <NavbarBrand style={{ flex: 1 }}>
        <img src={logoImg} style={{ width: '180px', marginRight: '-30%' }} />
      </NavbarBrand>

      <NavbarItem isActive style={{ width: '30%' }}>
        <Select
          aria-label="choose-task"
          onChange={(value) => setChoosenTask(value)}
          radius="full"
          labelPlacement={'outside-left'}
        >
          {tasks.map((task) => (
            <SelectItem
              key={task.name}
              value={task.name}
              dir="rtl"
              startContent={
                task.finish ? (
                  <TaskAltRoundedIcon sx={{ color: '#005395' }} />
                ) : (
                  <RadioButtonUncheckedRoundedIcon sx={{ color: 'grey' }} />
                )
              }
            >
              {task.name}
            </SelectItem>
          ))}
        </Select>
      </NavbarItem>

      <NavbarItem isActive>
        <Tooltip content={'לספר הקורס'} placement={'bottom'}>
          <Button
            radius="full"
            isIconOnly
            variant="faded"
            onClick={() => window.open('/src/assets/pdf/CourseBookA.pdf')}
          >
            <AutoStoriesOutlinedIcon />
          </Button>
        </Tooltip>
      </NavbarItem>

      <NavbarContent justify="end" style={{ flex: 1 }}>
        <FirebaseAuth />
      </NavbarContent>
    </Navbar>
  );
}
