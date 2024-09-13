import React, { useState, useEffect } from 'react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';
import postRequest from '../../requests/anew/postRequest';

export default function ChooseTask({ tasks, unit, clicked, setClicked, addItem ,syllabusId}) {
  const [mainSubjects, setMainSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

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

  const addPratice = async (value) => {
    try {
      let postUrl;
      const newPractice = {
        index: clicked.index,
        name: value.name,
        unitId: unit,
        type: clicked.type,
        taskId: value.id,
        syllabusId,
      };

      if (clicked.action === 'update') {
        newPractice['id'] = clicked.id;
        postUrl = 'updatePractice';
      } else {
        postUrl = 'postPractice';
      }
      const { id } = await postRequest({ auth: null, postUrl, object: newPractice });
      newPractice['id'] = id;

      if (newPractice.id) addItem(newPractice);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addResource = async (value) => {
    try {
      const newResource = {
        index: clicked.index,
        name: value.name,
        unitId: unit,
        type: 'task',
        link: value.id,
        syllabusId
      };

      const { id } = await postRequest({  postUrl: 'postUnitResource', object: newResource });
      newResource['id'] = id;
      if (newResource.id) addItem(newResource);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onChooseClick = (value) => {
    if (clicked.table == 'practice') addPratice(value);
    else addResource(value);

    setClicked(false);
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
