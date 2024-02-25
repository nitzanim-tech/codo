import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavigateBar';

import './Home.css';
import { Button, Grid, Card } from '@mui/material';
import { Accordion, AccordionItem, Tooltip, Badge } from '@nextui-org/react';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TaskCard from '../components/Home/TaskCard';
import { useFirebase } from '../util/FirebaseProvider';
import { CircularProgress } from '@nextui-org/react';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import getAllLessons from '../requests/lessons/getAllLessons';

function Home() {
  const { app, userData, isUserLoading } = useFirebase();
  const [lessons, setLessons] = useState({});

  useEffect(() => {
    const fetchLessons = async () => {
      const allLessons = await getAllLessons(app);
      setLessons(allLessons);
    };

    fetchLessons();
  }, []);

  const allKeys = Object.keys(lessons).map((lesson) => lesson.toString());

  return (
    <>
      <NavBar />
      {isUserLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
          <CircularProgress />
        </div>
      ) : userData ? (
        <Grid container spacing={1} columns={3} rows={1}>
          <Grid item style={{ width: '70%', margin: '30px' }}>
            <Accordion dir="rtl" selectedKeys={allKeys} isCompact>
              {Object.entries(lessons).map(([lesson, lessonData]) => (
                <AccordionItem
                  key={`${lesson}`}
                  aria-label={`Accordion ${lessonData.lessonName}`}
                  title={lessonData.lessonName}
                >
                  {Object.entries(lessonData.elements).map(([element, file]) =>
                    file.type === 'task' ? (
                      <TaskCard
                        key={file.name}
                        taskId={file.index}
                        text={file.name}
                        studentData={userData.submissions ? userData.submissions[file.index] : null}
                      />
                    ) : (
                      <Card key={file.name} dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
                        <Button radius="full" variant="faded" onClick={() => window.open(file.link)}>
                          {file.type === 'ppt' && <SlideshowIcon style={{ color: '#FAE233' }} />}
                          {file.type === 'pdf' && <PictureAsPdfIcon style={{ color: '#BF1E2E' }} />}
                          {file.type === 'zip' && <FolderZipRoundedIcon style={{ color: '#386641' }} />}
                        </Button>
                        {file.name}
                      </Card>
                    ),
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </Grid>

          <Grid item style={{ width: '24%' }}>
            <h1 style={{ margin: '40px' }}> שלום {userData.name}</h1>
          </Grid>
        </Grid>
      ) : (
        <h1>אנא התחברו</h1>
      )}
    </>
  );
}

export default Home;
