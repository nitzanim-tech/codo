import { useState, useEffect, useContext } from 'react';
import { Accordion, AccordionItem, CircularProgress, Button } from '@nextui-org/react';

import { useFirebase } from '../../../util/FirebaseProvider';
import getAllLessons from '../../../requests/lessons/getAllLessons';
import { FileCard, DevTaskCard } from '../../general/Cards';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { SettingContext } from './ChangeSettingProvider';
import updateElementSetting from '../../../requests/groups/updateElementSetting';
import { ErrorMessage, SuccessMessage } from '../../general/Messages';

function ManageLessonsInst({ group }) {
  const { app } = useFirebase();
  const [lessons, setLessons] = useState(null);
  const { settingChange, setSettingChange } = useContext(SettingContext);
  const [showError, setShowError] = useState(false);
  const [showSent, setShowSent] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      setLessons(null);
      const allLessons = await getAllLessons({ app, groupId: group.id });
      setLessons(allLessons);
      setShowError(false);
      setShowSent(false);
      setSettingChange({});
    };
    fetchLessons();
  }, [group]);

  return (
    <>
      {!lessons ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ width: '50%' }}>
          <Button
            radius="full"
            variant="bordered"
            style={{ margin: '20px' }}
            isDisabled={Object.keys(settingChange).length === 0}
            onClick={async () => {
              const succed = await updateElementSetting({
                app,
                groupId: group.id,
                changes: settingChange,
                originalSetting: lessons,
              });
              succed ? setShowSent(true) : setShowError(true);
            }}
          >
            <SaveRoundedIcon style={{ color: '#005395' }} />
            <span style={{ color: '#005395' }}>
              <b>שמור שינויים </b>
            </span>
          </Button>
          {showError && <ErrorMessage />}
          {showSent && <SuccessMessage text={'עודכן בהצלחה'} />}

          <Accordion dir="rtl" isCompact selectionMode={'multiple'} key={JSON.stringify(lessons)}>
            {Object.entries(lessons).map(([lessonId, lessonData]) => (
              <AccordionItem
                key={`${lessonId}`}
                aria-label={`Accordion ${lessonData.lessonName}`}
                title={lessonData.lessonName}
                variant={'bordered'}
              >
                {lessonData.elements &&
                  Object.entries(lessonData.elements).map(([elementId, element]) =>
                    element.type === 'task' ? (
                      <DevTaskCard
                        index={`${lessonId}-${elementId}`}
                        text={element.name}
                        isInst
                        setting={element?.setting}
                      />
                    ) : (
                      <FileCard file={element} index={`${lessonId}-${elementId}`} setting={element?.setting} isInst />
                    ),
                  )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </>
  );
}

export default ManageLessonsInst;
