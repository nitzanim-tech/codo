import { useState, useEffect, useContext } from 'react';
import { Accordion, AccordionItem, CircularProgress, Button } from '@nextui-org/react';

import { FileCard, DevTaskCard } from '../../general/Cards';
import getRequest from '../../../requests/anew/getRequest';
   
const groupId = '435c59ddf19a';
// const groupId = '70ad502eb5db';

function ManageLessonsInst({ group }) {
  const [units, setUnits] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      const unitsFromDb = await getRequest({ getUrl: `getAllResourcesByGroup?group=${groupId}` });
      console.log({ unitsFromDb });
      setUnits(unitsFromDb);
    };
    fetchLessons();
  }, [group]);

  return (
    <>
      {!units ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ width: '50%' }}>
          <Accordion dir="rtl" selectedKeys={units.map((unit) => unit.id)} isCompact>
            {units && units.length > 0
              ? units
                  .sort((unitA, unitB) => unitA.index - unitB.index)
                  .map((unit) => (
                    <AccordionItem key={unit.id} aria-label={`Accordion ${unit.name}`} title={unit.name}>
                      {unit.resources && unit.resources.length > 0
                        ? unit.resources.map((resource) =>
                            resource.type === 'task' ? (
                              <DevTaskCard
                                key={resource.id}
                                index={`${unit.id}-${resource.id}`}
                                text={resource.name}
                                groupId={groupId}
                                isInst
                                setting={resource?.setting || {}}
                              />
                            ) : (
                              <FileCard
                                file={resource}
                                index={`${unit.id}-${resource.id}`}
                                setting={resource.setting}
                                groupId={groupId}
                                isInst
                              />
                            ),
                          )
                        : null}
                    </AccordionItem>
                  ))
              : null}
          </Accordion>
        </div>
      )}
    </>
  );
}

export default ManageLessonsInst;
