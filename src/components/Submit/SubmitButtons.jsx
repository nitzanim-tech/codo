import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import Instructions from './Instructions';
import TestsList from '../TestsList/TestsList';
import { Tabs, Tab } from '@nextui-org/react';
import Coduck from '../Coduck/Coduck';
import GradingRoundedIcon from '@mui/icons-material/GradingRounded';
import { Accordion, AccordionItem, Textarea } from '@nextui-org/react';
import DonutChart from '../Inst/Chart';
import { ReviewSvg } from './Icons';

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
