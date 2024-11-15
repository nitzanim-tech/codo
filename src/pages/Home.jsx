import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';
import { Button, Grid, Card } from '@mui/material';
import { Accordion, AccordionItem, ScrollShadow, Select, SelectItem } from '@nextui-org/react';
import { CircularProgress, Divider, Slider } from '@nextui-org/react';
import TaskCard from '../components/Home/TaskCard';
import { useFirebase } from '../util/FirebaseProvider';

import spicyIcon from '../assets/svg/pepper.svg';
import getRequest from '../requests/anew/getRequest';
import { Loading, Unauthorized } from '../components/general/Messages';
import styled from 'styled-components';

import CustomScrollbar from '../components/general/CustomScrollbar';
import { ConstructionOutlined } from '@mui/icons-material';

const Levels = [
  { value: 0, name: 'בקטנה, תן להתחמם' },
  { value: 1, name: 'רגיל כזה' },
  { value: 2, name: 'יאללה מלחמה' },
];

function Home() {
  const { userData } = useFirebase();
  const [units, setUnits] = useState();
  const [groupName, setGroupName] = useState();

  useEffect(() => {
    const fetchUnits = async () => {
      const unitsFromDb = await getRequest({ getUrl: `getNewHomepage`, authMethod: 'jwt' });
      const groupNameFromDb = await getRequest({ getUrl: `getGroupName?groupId=${userData.group}` });
      setGroupName(groupNameFromDb?.name);
      setUnits(unitsFromDb);
    };

    userData && fetchUnits();
  }, [userData]);

  return (
    <>
      {userData ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '70%' }}>
            <Grid container spacing={1} columns={3} rows={1}>
              <Grid item style={{ width: '55%', margin: '2%' }}>
                <CustomScrollbar>
                  <div className="h-[85vh]">
                    {units ? (
                      <div dir="rtl" selectedKeys={units.map((unit) => unit.id)} isCompact>
                        {units && units.length > 0 ? (
                          units
                            .sort((unitA, unitB) => unitA.index - unitB.index)
                            .map((unit) => (
                              <div key={unit.id} aria-label={`div ${unit.name}`}>
                                <UnitBox
                                  isOpen={unit.isOpen && unit.firstTask}
                                  disabled={!unit.isOpen || !unit.firstTask}
                                  onClick={() => (window.location.href = `./submit/${unit.id}/${unit.firstTask}`)}
                                >
                                  {unit.name}
                                </UnitBox>
                              </div>
                            ))
                        ) : (
                          <p>איו יחידות פתוחות</p>
                        )}
                      </div>
                    ) : (
                      <Loading />
                    )}
                  </div>
                </CustomScrollbar>
              </Grid>
              <Grid item style={{ width: '35%' }}>
                <h1 style={{ margin: '40px' }}> שלום {userData.name}</h1>
                {groupName && <h2>קבוצת {groupName}</h2>}

                {/* <SelectLevel levels={Levels} /> */}
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <Unauthorized text="אנא התחברו" />
      )}
    </>
  );
}

export default Home;

const UnitBox = styled.button`
  background-color: ${(props) => (props.isOpen ? 'rgba(31, 24, 62, 0.8)' : 'rgba(128, 128, 128, 0.8)')};
  color: white;
  font-size: 18px;
  margin: 5px;
  width: 80%;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #616099;
  direction: rtl;
`;




const SelectLevel = ({ levels }) => {
  return (
    <>
      <div style={{ width: '100%' }}>
        <Slider
          // value={level}
          // onChange={(event, newValue) => setLevel(newValue)}
          step={50}
          min={1}
          max={3}
          showSteps={true}
          marks={levels}
          showTooltip={true}
          valueLabelDisplay="auto"
        />
      </div>

      <Select items={levels} label="כמה חריף לשים" placeholder="בחרו" labelPlacement="outside" className="max-w-xs">
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
    </>
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



