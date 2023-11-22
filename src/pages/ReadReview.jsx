import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Card } from '@nextui-org/react';
import { CircularProgress } from '@nextui-org/react';

const LINE_HEGITH = 20;

export default function ReadReview() {
  const theme = 'vs-light';
  const [version, setVersion] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const storedVersion = localStorage.getItem('checkedSubmit');
    if (storedVersion) {
      console.log(storedVersion);

      const parsedVersion = JSON.parse(storedVersion);
      console.log(parsedVersion);
      setVersion(parsedVersion);
      const convertedComments = convertCommentsToObject(JSON.parse(parsedVersion.review), parsedVersion.code);
      setComments(convertedComments);
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '60%' }}>
        {comments ? (
          <>
            <p style={{ textAlign: 'right', marginRight: '30px', marginTop: '30px', direction: 'rtl' }}>
              <b>כללי:</b>
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
                  <p style={{ textAlign: 'right', marginRight: '30px' }}>{editor.comment}</p>
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
  const keys = Object.keys(comments);
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
      .trimEnd(); // Remove the last newline character if present
    const height = `${LINE_HEGITH * (end - start + 1)}px`;
    result.push({ start, end, comment, code: codeLines, height });
    prevEnd = end;
  }

  const lastEnd = parseInt(keys[keys.length - 1]);
  const remainingCode = code.split('\n').slice(lastEnd).join('\n');
  const remainingLines = remainingCode.split('\n').length;
  const height = `${LINE_HEGITH * (lastEnd + remainingLines - lastEnd + 2)}px`;
  result.push({ start: lastEnd + 1, end: lastEnd + remainingLines, comment: '', code: remainingCode, height });

  return result;
}
