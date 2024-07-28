import React, { useState, useEffect } from 'react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';

export default function ChooseTask({ tasks }) {

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
            .map(([key, value]) => <div key={key}>{value.name}</div>)}
      </div>
    );
}
