
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import ReviewComponent from '../components/Review/ReviewComponent';
import { Card, Spinner, Accordion, AccordionItem } from '@nextui-org/react';
import { DashboardCard } from '../components/Inst/DashboardCard';
import formatDate from '../util/formatDate';
import TestsCheckbox from '../components/Review/TestsCheckbox';
import { useFirebase } from '../util/FirebaseProvider';
import { Unauthorized } from '../components/general/Messages';
import getRequest from '../requests/anew/getRequest';
import Instructions from '../components/Submit/Instructions';

function Review() {
  // TODO:
  // 1. WHEN IT HAS BEEN CALLED FROM THE INST PAGE - PASS THE TASK_ID TOO
  // SO THE REQUESTS FROM THE SERVER WILL HAPPEN SIMULTANEOUSLY
  // 2. ADD NUMERIC GARDE
  const { userData } = useFirebase();
  const [submission, setSubmmition] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [taskData, setTaskData] = useState(null);
  const [testsOutputs, setTestsOutputs] = useState();

  let { submissionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const submissionData = await getRequest({ getUrl: `getSubmissionData?submission=${submissionId}` });
      const taskFromDb = await getRequest({ getUrl: `getTask?taskId=${submissionData.task}`, authMethod: 'jwt' });
      setTaskData(taskFromDb);
      setSubmmition(submissionData);
      const passTestsIndexes = submissionData.tests.reduce(
        (acc, val, index) => (val === true ? [...acc, index] : acc),
        [],
      );
      setSelectedTests(passTestsIndexes);
    };
    fetchData();
  }, []);

  const calculateGrade = (taskData, selectedTests) => {
    return selectedTests.reduce((sum, testIndex) => sum + taskData.tests[testIndex].score, 0);
  };
  const maxGrade = (taskData) => {
    return Math.min(
      taskData.tests.reduce((sum, test) => sum + test.score, 0),
      100,
    );
  };

  return (
    <>
      {!userData ? (
        <Spinner />
      ) : !userData.permission ? (
        <Unauthorized />
      ) : taskData ? (
        <>
          <Grid container spacing={1} columns={3} rows={1} style={{ marginTop: '20px', padding: '20px' }}>
            <Grid item style={{ width: '69%' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={{ width: '95%' }}>
                  <ReviewComponent
                    submittion={submission}
                    selectedTests={selectedTests}
                    testsAmount={taskData.tests.length}
                    setTestsOutputs={setTestsOutputs}
                    taskData={taskData}
                  />
                </Card>
              </div>
            </Grid>

            <Grid item style={{ width: '30%', backgroundColor: 'rgba(255,255,255,0.6)' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <DashboardCard
                      ratio={calculateGrade(taskData, selectedTests) + '/' + maxGrade(taskData)}
                      text={'סה"כ'}
                      size={70}
                      max={100}
                    />
                  </div>
                  <div>
                    <h2>{taskData.name}</h2>
                    <h2 style={{ fontSize: '1.7vw' }}>
                      <b>{submission.student.name}</b>
                    </h2>
                    <h2 style={{ fontSize: '1.2vw' }}>{formatDate(submission.date)}</h2>
                  </div>
                </div>
              </div>

              <TestsCheckbox
                task={taskData}
                selectedTests={selectedTests}
                setSelectedTests={setSelectedTests}
                testsOutputs={testsOutputs}
              />

              <Accordion dir="rtl" variant="splitted" selectionMode="multiple" isCompact>
                <AccordionItem
                  title={<span style={{ color: 'white' }}>הוראות</span>}
                  style={{
                    borderRadius: '10px',
                    background: '#463A6B',
                    boxShadow: '0px 0px 3px 0px rgba(255, 255, 255, 0.25)',
                  }}
                >
                  <div style={{ direction: 'rtl', textAlign: 'left' }}>
                    <div dangerouslySetInnerHTML={{ __html: taskData.description }} />
                  </div>
                </AccordionItem>
                <AccordionItem
                  title={<span style={{ color: 'white' }}>דוגמה</span>}
                  style={{
                    borderRadius: '10px',
                    background: '#463A6B',
                    boxShadow: '0px 0px 3px 0px rgba(255, 255, 255, 0.25)',
                  }}
                >
                  <div style={{ direction: 'rtl', textAlign: 'left' }}>
                    <div dangerouslySetInnerHTML={{ __html: taskData.example }} />
                  </div>
                </AccordionItem>
                {taskData.code && (
                  <AccordionItem
                    title={<span style={{ color: 'white' }}>פתרון</span>}
                    style={{
                      borderRadius: '10px',
                      background: '#463A6B',
                      boxShadow: '0px 0px 3px 0px rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    <div style={{ direction: 'rtl', textAlign: 'left' }}>
                      <pre style={{ direction: 'ltr', padding: '10px', borderRadius: '5px', overflow: 'clip' }}>
                        {taskData.code}
                      </pre>
                    </div>
                  </AccordionItem>
                )}
              </Accordion>

            </Grid>
          </Grid>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Review;


// const styledAcordionItem=style