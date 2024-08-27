import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavigateBar';

import './Home.css';
import { Button, Grid, Card } from '@mui/material';
import { Accordion, AccordionItem, ScrollShadow, Select, SelectItem } from '@nextui-org/react';
import { CircularProgress, Divider, Slider } from '@nextui-org/react';
import TaskCard from '../components/Home/TaskCard';
import { useFirebase } from '../util/FirebaseProvider';

import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import spicyIcon from '../assets/svg/pepper.svg';
import getRequest from '../requests/anew/getRequest';

const Levels = [
  { value: 0, name: 'בקטנה, תן להתחמם' },
  { value: 1, name: 'רגיל כזה' },
  { value: 2, name: 'יאללה מלחמה' },
];

const FileCard = ({ file }) => {
  return (
    <Card dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
      <Button radius="full" variant="faded" onClick={() => window.open(file.link)}>
        {file.type === 'ppt' && <SlideshowIcon style={{ color: '#FAE233' }} />}
        {file.type === 'pdf' && <PictureAsPdfIcon style={{ color: '#BF1E2E' }} />}
        {file.type === 'zip' && <FolderZipRoundedIcon style={{ color: '#386641' }} />}
        {file.type === 'webLink' && <PublicRoundedIcon style={{ color: '#BF1E2E' }} />}
      </Button>
      {file.name}
    </Card>
  );
};

function Home() {
  const { app, auth, userData, isUserLoading } = useFirebase();
  const [units, setUnits] = useState();

  useEffect(() => {
    const fetchUnits = async () => {
      const unitsFromDb = await getRequest({ getUrl: `getHomepage?userId=${auth.currentUser.uid}` });
      console.log({ unitsFromDb });
      setUnits(unitsFromDb);
      console.log(unitsFromDb);
    };

    userData && fetchUnits();
  }, [userData]);

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
                <ScrollShadow className="h-[100vh]" size={5}>
                  {units && (
                    <Accordion dir="rtl" selectedKeys={units.map((unit) => unit.id)} isCompact>
                      {units && units.length > 0 ? (
                        units
                          .sort((unitA, unitB) => unitA.index - unitB.index)
                          .map((unit) => (
                            <AccordionItem key={unit.id} aria-label={`Accordion ${unit.name}`} title={unit.name}>
                              {unit.resources && unit.resources.length > 0 ? (
                                unit.resources
                                  .sort((A, B) => A.index - B.index)
                                  .map((resource) =>
                                    resource.type === 'practice' ? (
                                      <>
                                        <Divider />
                                        <p style={{ textAlign: 'right' }}>תור אישי:</p>
                                        {/* {unit.practices} */}
                                        {unit.practices.length > 0 &&
                                          unit.practices
                                            .sort((A, B) => A.index - B.index)
                                            .map((practice) => (
                                              <TaskCard
                                                key={practice.id}
                                                taskId={practice.taskId}
                                                text={practice.name}
                                                // studentData={userData?.submissions?.[practice.id] || null}
                                                // isChallenge={practice.setting?.isChallenge || null}
                                                // showReview={practice.setting?.showReview || null}
                                              />
                                            ))}
                                      </>
                                    ) : resource.type === 'task' ? (
                                      <TaskCard
                                        key={resource.id}
                                        taskId={resource.id}
                                        text={resource.name}
                                        studentData={userData?.submissions?.[resource.id] || null}
                                        isChallenge={resource.setting?.isChallenge || null}
                                        showReview={resource.setting?.showReview || null}
                                      />
                                    ) : (
                                      <FileCard key={resource.id} file={resource} />
                                    ),
                                  )
                              ) : (
                                <p>No resources available</p>
                              )}
                            </AccordionItem>
                          ))
                      ) : (
                        <p>No units available</p>
                      )}
                    </Accordion>
                  )}
                </ScrollShadow>
              </Grid>
              <Grid item style={{ width: '35%' }}>
                <h1 style={{ margin: '40px' }}> שלום {userData.name}</h1>
                <div style={{ width: '100%' }}>
                  <Slider
                    // value={level}
                    // onChange={(event, newValue) => setLevel(newValue)}
                    step={50}
                    min={1}
                    max={3}
                    showSteps={true}
                    marks={Levels}
                    showTooltip={true}
                    valueLabelDisplay="auto"
                  />
                </div>

                <Select
                  items={Levels}
                  label="כמה חריף לשים"
                  placeholder="בחרו"
                  labelPlacement="outside"
                  className="max-w-xs"
                >
                  {(level) => (
                    <SelectItem key={level.value} textValue={level.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="flex flex-col">
                          <span className="text-small">{level.name}</span>{' '}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'left' }}>
                          {Array.from({ length: level.value + 1 }).map((index) => (
                            <img
                              key={`${level.name}-${index}`}
                              src={spicyIcon}
                              alt="spicyIcon"
                              style={{ width: '20px', height: '20px' }}
                            />
                          ))}
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
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
