import React, { useState, useEffect } from 'react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import postRequest from '../../requests/anew/postRequest';

export default function ChooseTask({ tasks, unit, clicked, setClicked, addItem }) {
  const [mainSubjects, setMainSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
console.log(addItem)
  useEffect(() => {
    if (tasks) {
      const mainSubjectsSet = new Set(
        Object.entries(tasks)
          .map(([key, value]) => value.mainSubject)
          .filter((subject) => subject),
      );
      setMainSubjects([...mainSubjectsSet]);
    }
  }, [tasks]);

  const onChooseClick = async (value) => {
    try {
      let postUrl;
      const newPractice = {
        index: clicked.index,
        name: value.name,
        unitId: unit,
        type: clicked.type,
        taskId: value.id,
      };

      if (clicked.action === 'update') {
        postUrl = 'updatePractice';
      } else {
        postUrl = 'postPractice';
      }

      newPractice['id'] = await postRequest({ auth: null, postUrl, object: newPractice });
      addItem(newPractice);
      setClicked(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ width: '100%', textAlign: 'right', direction: 'rtl' }}>
      <Select label="נושא" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
        {mainSubjects &&
          mainSubjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
      </Select>

      {tasks &&
        Object.entries(tasks)
          .filter(([key, value]) => !selectedSubject || value.mainSubject === selectedSubject)
          .map(([key, value]) => (
            <div
              key={key}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onChooseClick(value);
              }}
            >
              {value.name}
              <Divider />
            </div>
          ))}
    </div>
  );
}
