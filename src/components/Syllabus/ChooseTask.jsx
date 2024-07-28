import React, { useState, useEffect } from 'react';
import { Input, Select, Divider, SelectItem } from '@nextui-org/react';

export default function ChooseTask({ tasks }) {
  const [mainSubjects, setMainSubjects] = useState([]);

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
      <Select label="סילבוס" value={choosenSyllabusId} onChange={(e) => setChoosenSyllabus(e.target.value)} dir="rtl">
        {syllabus &&
          Object.entries(syllabus).map(([id, syllabusData]) => (
            <SelectItem key={syllabusData.id} value={syllabusData.id} dir="rtl">
              {syllabusData.name}
            </SelectItem>
          ))}
      </Select>

      {mainSubjects.map((subject, index) => (
        <div key={index}>{subject}</div>
      ))}
    </div>
  );
}
