import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import duckIcon from '../../assets/svg/rubber-duck.svg';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import Instructions from './Instructions';
import TestsList from '../TestsList/TestsList';
import { Tabs, Tab } from '@nextui-org/react';
import Coduck from '../Coduck/Coduck';
import GradingRoundedIcon from '@mui/icons-material/GradingRounded';
import { Accordion, AccordionItem, Textarea } from '@nextui-org/react';
import DonutChart from '../Inst/Chart';

export default function SubmitButtons({
  testsOutputs,
  taskObject,
  setHighlightedLines,
  submissions,
  setOpenReview,
  chosenTab,
}) {
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('instructions');

  useEffect(() => {
    console.log({ testsOutputs });
    testsOutputs[0]?.input && setSelectedTab('tests');
  }, [testsOutputs]);

  useEffect(() => {
    setOpenReview(null);
  }, [selectedTab]);

  return (
    <>
      {/* CODUCK: */}
      {/* 
          <Coduck
            task={taskObject}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            setHighlightedLines={setHighlightedLines}
          /> */}
      {chosenTab == 'משוב' && taskObject && (
        <>
          {submissions && submissions.length > 0 ? (
            <Accordion dir="rtl" isCompact>
              {submissions
                .sort((a, b) => new Date(a.time) - new Date(b.time))
                .map((submission, index) => (
                  <AccordionItem
                    key={index}
                    variant="bordered"
                    aria-label={`Submission ${index + 1}`}
                    onClick={() => {
                      console.log('here');
                      setOpenReview(submission);
                    }}
                    title={`${new Date(submission.time).toLocaleString()} ${
                      submission.comments || submission.general ? ' - משוב' : ''
                    }`}
                    startContent={
                      <>
                        <div style={{ fontSize: '10px' }}>
                          <DonutChart
                            ratio={`${submission.pass.filter(Boolean).length}/${submission.pass.length}`}
                            percentage={(submission.pass.filter(Boolean).length / submission.pass.length) * 100}
                            size={40}
                            showPrecent={false}
                          />
                        </div>
                      </>
                    }
                  >
                    <div style={{ marginBottom: '20px' }}>
                      {submission.comments || submission.general ? (
                        <>
                          <Textarea
                            dir="rtl"
                            isReadOnly
                            disableAnimation
                            variant="bordered"
                            defaultValue={submission.general}
                          />
                        </>
                      ) : (
                        <p>אין משוב להגשה זו</p>
                      )}
                    </div>
                  </AccordionItem>
                ))}
            </Accordion>
          ) : (
            <p>אין הגשות</p>
          )}
        </>
      )}
      {/* {taskObject?.setting?.showTest && <TestsList testsOutputs={testsOutputs} taskObject={taskObject} />} */}
      {chosenTab == 'טסטים' && taskObject && <TestsList testsOutputs={testsOutputs} taskObject={taskObject} />}
      {chosenTab == 'תרגול' && taskObject && <Instructions taskObject={taskObject} />}{' '}
      {/* {taskObject?.setting?.showTest && <Instructions taskObject={taskObject} />}{' '} */}
    </>
  );
}
