import { useState, useEffect } from 'react';
import { Accordion, AccordionItem, CircularProgress } from '@nextui-org/react';

import { FileCard, DevTaskCard } from '../../general/Cards';
import getRequest from '../../../requests/anew/getRequest';
import CustomScrollbar from '../../general/CustomScrollbar';

function ManageLessonsInst({ group }) {
  const [units, setUnits] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setUnits(null);
      const unitsFromDb = await getRequest({ getUrl: `getAllResourcesByGroup?group=${group}` });
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
        <div
          style={{
            width: '50%',
            maxHeight: '90vh',
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '30px',
            borderRadius: '10px',
          }}
        >
          <CustomScrollbar>
            <div style={{ width: '100%', maxHeight: '70vh' }}>
              <Accordion dir="rtl" selectedKeys={units.map((unit) => unit.id)} isCompact>
                {units && units.length > 0
                  ? units
                      .sort((unitA, unitB) => unitA.index - unitB.index)
                      .map((unit) => (
                        <AccordionItem key={unit.id} aria-label={`Accordion ${unit.name}`} title={unit.name}>
                          {unit.resources && unit.resources.length > 0
                            ? unit.resources
                                .sort((A, B) => A.index - B.index)
                                .map((resource) =>
                                  resource.type === 'task' || resource.type === 'practice' ? (
                                    <DevTaskCard
                                      key={resource.id}
                                      index={`${unit.id}-${resource.id}`}
                                      text={resource.name}
                                      groupId={group}
                                      isInst
                                      setting={resource?.setting || {}}
                                    />
                                  ) : (
                                    <FileCard
                                      file={resource}
                                      key={resource.id}
                                      index={`${unit.id}-${resource.id}`}
                                      setting={resource.setting}
                                      groupId={group}
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
          </CustomScrollbar>
        </div>
      )}
    </>
  );
}

export default ManageLessonsInst;
