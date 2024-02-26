import { useState, useEffect } from 'react';

import { Button, Grid, Card } from '@mui/material';
import { Accordion, AccordionItem, Tooltip, Badge } from '@nextui-org/react';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { CircularProgress } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';

import { useFirebase } from '../../../util/FirebaseProvider';
import getAllLessons from '../../../requests/lessons/getAllLessons';
import AddElement from './AddElement';
const tasks = [
  { '7e9e4f50c46c': 'הכנה 0 - שלום עולם' },
  { c3194b8af385: 'הכנה 1 - מעלית' },
  { df3ef7216ca5: 'תנאים - אי שיוון המשולש' },
  { bed010d87c10: 'תרגול מונחה - השערת קולץ' },
  { c0e095edfd28: '!תרגול מונחה - יאללה, למחזורית' },
];
function ManageLessons() {
  const { app } = useFirebase();
  const [lessons, setLessons] = useState(null);
  const [tasksList, setTasksList] = useState(tasks);

  useEffect(() => {
    const fetchLessons = async () => {
      const allLessons = await getAllLessons(app);
      setLessons(allLessons);
    };
    fetchLessons();
  }, []);

  return (
    <>
      {!lessons ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ width: '50%' }}>
          <Accordion dir="rtl" isCompact selectionMode={'multiple'}>
            {Object.entries(lessons).map(([lesson, lessonData]) => (
              <AccordionItem
                key={`${lesson}`}
                aria-label={`Accordion ${lessonData.lessonName}`}
                title={lessonData.lessonName}
              >
                {Object.entries(lessonData.elements).map(([element, file]) =>
                  file.type === 'task' ? <DevTaskCard index={file.index} text={file.name} /> : <FileCard file={file} />,
                )}
                <AddElement tasksList={tasksList} lesson={lesson} />
                <Button><LowPriorityIcon /></Button>

              </AccordionItem>
            ))}
          </Accordion>

          <Button radius="full" variant="faded" onClick={() => console.log('h')}>
            <span style={{ color: '#386641' }}>
              <b>הוסף מפגש</b>
            </span>
            <AddIcon style={{ color: '#386641' }} />
          </Button>
        </div>
      )}
    </>
  );
}

export default ManageLessons;

const FileCard = ({ file }) => {
  return (
    <Card key={file.name} dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
      <Button radius="full" variant="faded" onClick={() => window.open(file.link)}>
        {file.type === 'ppt' && <SlideshowIcon style={{ color: '#FAE233' }} />}
        {file.type === 'pdf' && <PictureAsPdfIcon style={{ color: '#BF1E2E' }} />}
        {file.type === 'zip' && <FolderZipRoundedIcon style={{ color: '#386641' }} />}
      </Button>
      {file.name}
    </Card>
  );
};

const DevTaskCard = ({ index, text }) => {
  return (
    <Card key={index} dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
      <Button radius="full" variant="faded" onClick={() => window.open(`./submit/${index}`)}>
        <BorderColorRoundedIcon style={{ color: '#005395' }} />
      </Button>
      {text}
    </Card>
  );
};

