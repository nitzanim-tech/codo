import React, { useState, useEffect } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent } from '@mui/lab';
import { TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Paper, Typography } from '@mui/material';
import taskList from '../../../Tasks/TasksList.json';
import formatDate from '../../../util/formatDate';
import getSession from '../../../requests/sessions/getSession';
import { useFirebase } from '../../../util/FirebaseProvider';

const SessionTimeline = ({ events }) => (
  <Timeline>
    {events.map((event, index) => {
      const task = taskList.find((task) => task.key === event.taskId)?.name || 'Unknown Task';
      let passCount = 0;
      let passRatio = 0;
      if (event.pass && event.pass.length > 0) {
        passCount = event.pass.filter((value) => value === true).length;
        passRatio = `${passCount}/${event.pass.length}`;
      }

      return (
        <TimelineItem key={index}>
          <TimelineOppositeContent>
            <Typography color="textSecondary">{formatDate(event.time.toISOString(), true)}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            {index < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} style={{ padding: '6px 16px' }}>
              <Typography>
                {event.type === 'task-start' && (
                  <>
                    Start <b>{task}</b>
                  </>
                )}
                {event.type === 'task-end' && `End`}
                {event.type === 'tests' && (
                  <>
                    Run tests
                    <br />
                    Pass: {passRatio}
                  </>
                )}
                {event.type === 'paste' && (
                  <>
                    Paste
                    <br />
                    Code: some code..
                  </>
                )}
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    })}
  </Timeline>
);

const TimelineComponent = ({ data }) => {
  if (!data) return <p>loading...</p>;

  const sessions = [];

  Object.keys(data).forEach((taskId) => {
    const events = [];
    const sessionData = data[taskId];

    Object.keys(sessionData).forEach((sessionId) => {
      const session = sessionData[sessionId];

      if (session.start && session.end) {
        events.push({ type: 'task-start', taskId, time: new Date(session.start) });
        events.push({ type: 'task-end', taskId, time: new Date(session.end) });
      }

      if (session.pass && session.time) {
        events.push({ type: 'tests', taskId, time: new Date(session.time), pass: session.pass });
      }
      if (session.pastedData && session.time) {
        events.push({ type: 'paste', taskId, time: new Date(session.time), code: session.pastedData });
      }
    });

    events.sort((a, b) => a.time - b.time);
    console.log(events);
    sessions.push(events);
  });

  return (
    <div>
      {sessions.map((events, index) => (
        <SessionTimeline key={index} events={events} />
      ))}
    </div>
  );
};

const App = () => {
  const [sessions, setSessions] = useState();
  const [userId, setUserId] = useState('kTqDi3pSI5NkUW21FbJF6sxDm3D3');
  const { app } = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionFromDb = await getSession({ app, userId });
        setSessions(sessionFromDb);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchData();
  }, [app, userId]);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  return (
    <div style={{ padding: 20 }}>
      <p>User</p>
      <input type="text" value={userId} onChange={handleInputChange} placeholder="Enter User ID" />
      <TimelineComponent data={sessions} />
    </div>
  );
};

export default App;
 