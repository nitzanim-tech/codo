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
export default function SubmitButtons({ testsOutputs, taskObject, setHighlightedLines, submissions }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('instructions');

  useEffect(() => {
    console.log({ testsOutputs });
    testsOutputs[0]?.input && setSelectedTab('tests');
  }, [testsOutputs]);

  return (
    <>
      <Tabs
        aria-label="Options"
        variant="underlined"
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
        classNames={{
          tab: 'max-w-fit px-0 h-10',
          tabContent: 'group-data-[selected=true]:text-[#103C6F]',
        }}
      >
        {/* CODUCK: */}
        {/* <Tab
          key="coduck"
          // style={{ text: 'white' }}
          title={
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <span style={{ margin: '10px' }}>coduck</span>
              <img src={duckIcon} alt="DuckIcon" style={{ width: '30px', height: '30px', color: 'green' }} />
            </div>
          }
        >
          <Coduck
            task={taskObject}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            setHighlightedLines={setHighlightedLines}
          />
        </Tab> */}

        <Tab
          key="reviews"
          title={
            <>
              <span style={{ margin: '10px' }}>משוב</span>
              <GradingRoundedIcon />
            </>
          }
        >
          {taskObject && (
            <>
              {submissions && submissions.length > 0 ? (
                submissions
                  .sort((a, b) => new Date(b.time) - new Date(a.time)) 
                  .map((submission, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                      {/* <p>קוד: {submission.code}</p> */}
                      <p>ציון: {submission.pass ? 'עבר' : 'לא עבר'}</p>
                      <p>זמן הגשה: {new Date(submission.time).toLocaleString()}</p>
                      {submission.comments && (
                        <>
                          <p>משוב:</p>
                          {/* <p>{submission.comments}</p> */}
                        </>
                      )}
                      <hr />
                    </div>
                  ))
              ) : (
                <p>אין הגשות</p>
              )}
            </>
          )}
        </Tab>

        <Tab
          key="tests"
          title={
            <>
              <span style={{ margin: '10px' }}>טסטים</span>
              <ChecklistRtlRoundedIcon />
            </>
          }
        >
          {/* {taskObject?.setting?.showTest && <TestsList testsOutputs={testsOutputs} taskObject={taskObject} />} */}
          {taskObject && <TestsList testsOutputs={testsOutputs} taskObject={taskObject} />}
        </Tab>

        <Tab
          key="instructions"
          title={
            <>
              <span style={{ margin: '10px' }}>הוראות</span>
              <QuestionMarkRoundedIcon />
            </>
          }
        >
          {taskObject && <Instructions taskObject={taskObject} />}{' '}
          {/* {taskObject?.setting?.showTest && <Instructions taskObject={taskObject} />}{' '} */}
        </Tab>
      </Tabs>
    </>
  );
}
