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
import { ReviewSvg } from './Icons';
import { Position } from 'monaco-editor';

export default function SubmitButtons({
  testsOutputs,
  taskObject,
  setHighlightedLines,
  submissions,
  setOpenReview,
  chosenTab,
  unitName,
}) {
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('instructions');

  useEffect(() => {
    testsOutputs[0]?.input && setSelectedTab('tests');
  }, [testsOutputs]);

  useEffect(() => {
    setOpenReview(null);
  }, [selectedTab]);

  const generateRevTestOutput = (submission) => {
    let revTestOutput = testsOutputs;
    revTestOutput.map((test, index) => {
      test.correct = submission.pass[index];
      test.output = 1;
    });
    return revTestOutput;
  };

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
                    onClick={() => setOpenReview(submission)}
                    title={
                      <>
                        <p style={{ color: 'white' }}>{new Date(submission.time).toLocaleString()}</p>
                        {(submission.comments || submission.general) && (
                          <div
                            style={{
                              position: 'absolute',
                              left: '50%',
                              marginTop: '-20px',
                            }}
                          >
                            <ReviewSvg />
                          </div>
                        )}
                      </>
                    }
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
                    style={{ backgroundColor: 'rgba(70, 58, 107, 1)', color: 'white' }}
                  >
                    <div style={{ marginBottom: '20px', padding: '2%' }}>
                      {submission.comments || submission.general ? (
                        <>
                          <textarea
                            dir="rtl"
                            readonly
                            style={{
                              backgroundColor: 'rgba(97, 96, 153, 0.9)',
                              width: '95%',
                              borderRadius: '10px',
                              padding: '15px',
                              resize: 'none',
                            }}
                          >
                            {submission.general}
                          </textarea>
                        </>
                      ) : (
                        <p>אין משוב להגשה זו</p>
                      )}
                    </div>
                    <div style={{marginTop:'-20px'}}></div>
                    <TestsList testsOutputs={generateRevTestOutput(submission)} taskObject={taskObject} inDev/>
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
      {chosenTab == 'תרגול' && taskObject && <Instructions taskObject={taskObject} unitName={unitName} />}{' '}
      {/* {taskObject?.setting?.showTest && <Instructions taskObject={taskObject} />}{' '} */}
    </>
  );
}
