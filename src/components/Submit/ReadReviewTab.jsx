import React, { useEffect, useState } from 'react';
import TestsList from '../TestsList/TestsList';
import { Accordion, AccordionItem, Textarea } from '@nextui-org/react';
import DonutChart from '../Inst/Chart';
import { ReviewSvg } from './Icons';

export default function ReadReviewTab({ testsOutputs, taskObject, submissions, setOpenReview }) {

const generateRevTestOutput = (submission) => {
  const revTestOutput = testsOutputs.map((test) => ({ ...test }));
  revTestOutput.forEach((test, index) => {
    test.correct = submission.pass[index];
    test.output = 1;
  });

  return revTestOutput;
};

  return (
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
                <div style={{ marginTop: '-20px' }}></div>
                <TestsList testsOutputs={generateRevTestOutput(submission)} taskObject={taskObject} inDev />
              </AccordionItem>
            ))}
        </Accordion>
      ) : (
        <p>אין הגשות</p>
      )}
    </>
  );
}
