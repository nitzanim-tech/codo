import { useState, useEffect } from 'react';

import { Button, Grid, Card } from '@mui/material';
import { Accordion, AccordionItem, Tooltip, Badge } from '@nextui-org/react';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CircularProgress } from '@nextui-org/react';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import AddIcon from '@mui/icons-material/Add';

import { useFirebase } from '../../../util/FirebaseProvider';
import getAllLessons from '../../../requests/lessons/getAllLessons';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import AddElement from './AddElement'

function ManageLessons() {
  const { app, userData, isUserLoading } = useFirebase();
  const [lessons, setLessons] = useState(null);

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
          <Accordion dir="rtl" selectedKeys={Object.keys(lessons).map((lesson) => lesson.toString())} isCompact>
            {Object.entries(lessons).map(([lesson, lessonData]) => (
              <AccordionItem
                key={`${lesson}`}
                aria-label={`Accordion ${lessonData.lessonName}`}
                title={lessonData.lessonName}
              >
                <LowPriorityIcon />
                {Object.entries(lessonData.elements).map(([element, file]) =>
                  file.type === 'task' ? <DevTaskCard index={file.index} text={file.name} /> : <FileCard file={file} />,
                )}
                <AddElement />
              </AccordionItem>
            ))}
          </Accordion>

          <Button radius="full" variant="faded" onClick={() => console.log('h')}>
            <span style={{ color: '#386641' }}>
              <b>הוסף שיעור</b>
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '40%' }}>
          <Button radius="full" variant="faded" onClick={() => window.open(`./submit/${index}`)}>
            <BorderColorRoundedIcon style={{ color: '#005395' }} />
          </Button>
          {text}
        </div>
      </div>
    </Card>
  );
};

