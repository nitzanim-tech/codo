import React, { useEffect, useState } from 'react';
import Instructions from './Instructions';
import TestsList from '../TestsList/TestsList';
import Coduck from '../Coduck/Coduck';

import ReadReviewTab from './ReadReviewTab';
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

  return (
    <>
      {chosenTab == 'קודאק' && taskObject && (
        <Coduck
          task={taskObject}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          setHighlightedLines={setHighlightedLines}
        />
      )}
      {chosenTab == 'משוב' && taskObject && (
        <ReadReviewTab
          testsOutputs={testsOutputs}
          taskObject={taskObject}
          submissions={submissions}
          setOpenReview={setOpenReview}
        />
      )}
      {chosenTab == 'טסטים' && taskObject && <TestsList testsOutputs={testsOutputs} taskObject={taskObject} />}
      {chosenTab == 'תרגול' && taskObject && <Instructions taskObject={taskObject} unitName={unitName} />}
    </>
  );
}
