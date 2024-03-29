import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Card, Textarea } from '@nextui-org/react';
import { CircularProgress } from '@nextui-org/react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TestsCheckbox from '../components/Review/TestsCheckbox';
import getTaskById from '../requests/tasks/getTaskById';
import { useFirebase } from '../util/FirebaseProvider';
const LINE_HEGITH = 20;

export default function ReadReview() {
  const theme = 'vs-light';
  const { app } = useFirebase();

  const [version, setVersion] = useState(null);
  const [comments, setComments] = useState(null);
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const storedVersion = localStorage.getItem('checkedSubmit');
    if (storedVersion) {
      const parsedVersion = JSON.parse(storedVersion);
      const fetchData = async () => {
        const taskFromDb = await getTaskById({ app, taskId: parsedVersion.task });
        setVersion(parsedVersion);
        setTaskData(taskFromDb);
        const convertedComments = convertCommentsToObject(parsedVersion.review.comments, parsedVersion.code);
        setComments(convertedComments);
      };
      fetchData();
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
      <Card style={{ width: '60%' }}>
        {comments ? (
          <>
            <p
              style={{
                textAlign: 'right',
                direction: 'rtl',
                color: '#005395',
                padding: '40px 70px 0 40px',
              }}
            >
              <b>כללי:</b>
              <Textarea isReadOnly disableAnimation variant="bordered" defaultValue={version.review.general} />
            </p>
            <div style={{ marginTop: '30px' }}>
              {comments.map((editor, index) => (
                <React.Fragment key={index}>
                  <Editor
                    height={editor.height}
                    defaultLanguage="python"
                    theme={theme}
                    value={editor.code}
                    options={{
                      lineNumbers: (num) => editor.start + num - 1,
                      glyphMargin: false,
                      scrollBeyondLastLine: false,
                      readOnly: true,
                      overviewRulerLanes: 0,
                      hideCursorInOverviewRuler: true,
                      overviewRulerBorder: false,
                      renderLineHighlight: 'none',
                      minimap: { enabled: false },
                      scrollbar: {
                        vertical: 'hidden',
                        horizontal: 'hidden',
                        handleMouseWheel: false,
                        verticalScrollbarSize: 0,
                      },
                    }}
                  />
                  {editor.comment && (
                    <p style={{ textAlign: 'right', marginRight: '50px', color: '#005395', direction: 'rtl' }}>
                      <PersonRoundedIcon />: {editor.comment}
                    </p>
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </Card>
      {version && (
        <TestsCheckbox task={taskData} selectedTests={version.selectedTests} setSelectedTests={() => {}} viewOnly />
      )}
    </div>
  );
}

function convertCommentsToObject(comments, code) {
  const keys = comments ? Object.keys(comments) : [];
  const result = [];

  let prevEnd = 0;
  for (let i = 0; i < keys.length; i++) {
    const start = prevEnd + 1;
    const end = parseInt(keys[i]);
    const comment = comments[keys[i]];
    const codeLines = code
      .split('\n')
      .slice(start - 1, end)
      .join('\n')
      .trimEnd();
    const height = `${LINE_HEGITH * (end - start + 1)}px`;
    result.push({ start, end, comment, code: codeLines, height });
    prevEnd = end;
  }

  const end = keys.length != 0 ? parseInt(keys[keys.length - 1]) : code.split('\n').length;
  const remainingCode = keys.length != 0 ? code.split('\n').slice(end).join('\n') : code;
  const remainingLines = remainingCode.split('\n').length;
  const height = `${LINE_HEGITH * (end + remainingLines - end + 2)}px`;
  const start = keys.length != 0 ? end + 1 : 1;

  result.push({ start, end: end + remainingLines, comment: '', code: remainingCode, height });

  return result;
}
