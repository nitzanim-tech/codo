import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Card } from '@nextui-org/react';
import { CircularProgress } from '@nextui-org/react';
import FlutterDashRoundedIcon from '@mui/icons-material/FlutterDashRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
const LINE_HEGITH = 20;

export default function ReadReview() {
  const theme = 'vs-light';
  const [version, setVersion] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const storedVersion = localStorage.getItem('checkedSubmit');
    if (storedVersion) {
      const parsedVersion = JSON.parse(storedVersion);
      console.log(parsedVersion);
      setVersion(parsedVersion);
      const convertedComments = convertCommentsToObject(JSON.parse(parsedVersion.review).comments, parsedVersion.code);
      setComments(convertedComments);
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
              <br />
              {JSON.parse(version.review).general}
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
  result.push({ start: end + 1, end: end + remainingLines, comment: '', code: remainingCode, height });
  console.log(result);

  return result;
}
