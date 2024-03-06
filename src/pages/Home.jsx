import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavigateBar';

import './Home.css';
import { Button, Grid, Card } from '@mui/material';
import { Accordion, AccordionItem, Tooltip, Badge, ScrollShadow } from '@nextui-org/react';
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
      const allLessons = await getAllLessons({ app, groupId: userData.group.id });
      const clearedLessons = clearUnvisable(allLessons);
      setLessons(clearedLessons);
    };

    userData && fetchLessons();
  }, [userData]);

  const allKeys = Object.keys(lessons).map((lesson) => lesson.toString());

  return (
    <>
      <NavBar />
      {isUserLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
          <CircularProgress />
        </div>
      ) : userData ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '70%' }}>
            <Grid container spacing={1} columns={3} rows={1}>
              <Grid item style={{ width: '55%', margin: '2%' }}>
                <ScrollShadow className="h-[550px]" size={5}>
                  <Accordion dir="rtl" selectedKeys={allKeys} isCompact>
                    {Object.entries(lessons).map(([lessonId, lessonData]) => (
                      <AccordionItem
                        key={`${lessonId}`}
                        aria-label={`Accordion ${lessonData.lessonName}`}
                        title={lessonData.lessonName}
                      >
                        {Object.entries(lessonData.elements).map(([elementId, element]) =>
                          element.type === 'task' ? (
                            <TaskCard
                              taskId={elementId}
                              text={element.name}
                              studentData={userData.submissions ? userData.submissions[elementId] : null}
                              isChallenge={element.setting?.isChallenge || null}
                              showReview={element.setting?.showReview || null}
                            />
                          ) : (
                            <FileCard file={element} />
                          ),
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>{' '}
                </ScrollShadow>
              </Grid>
              <Grid item style={{ width: '35%' }}>
                <h1 style={{ margin: '40px' }}> שלום {userData.name}</h1>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <h1>אנא התחברו</h1>
      )}
    </>
  );
}

export default Home;

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

const clearUnvisable = (lessons) => {
  const lessonsArray = Object.values(lessons);

  const filteredLessons = lessonsArray.filter((lesson) => {
    const visibleElements = Object.values(lesson.elements).filter((element) => element.setting?.isVisible);
    return visibleElements.length > 0;
  });

  return filteredLessons.map((lesson) => {
    const visibleElements = Object.entries(lesson.elements).reduce((acc, [elementId, element]) => {
      if (element.setting?.isVisible) {
        acc[elementId] = element;
      }
      return acc;
    }, {});

    return {
      ...lesson,
      elements: visibleElements,
    };
  });
};
