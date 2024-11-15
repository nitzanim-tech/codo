import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Card, Textarea } from '@nextui-org/react';
import { CircularProgress } from '@nextui-org/react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TestsCheckbox from '../Review/TestsCheckbox';
import CustomScrollbar from '../general/CustomScrollbar';
const LINE_HEGITH = 20;

export default function ReadReview({ code, comments }) {
  const [convertedComments, setConvertedComments] = useState();
  useEffect(() => {
    setConvertedComments(convertCommentsToObject(comments, code));
  }, [code, comments]);

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme('Active4D', Active4D);
    monaco.editor.setTheme('Active4D');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' , overflow:'auto'}}>
      {/* <CustomScrollbar> */}
        <Card style={{ width: '100%', height: '72vh' }}>
          {convertedComments ? (
            <>
              <div style={{ marginTop: '30px' }}>
                {convertedComments.map((editor, index) => (
                  <React.Fragment key={index}>
                    <Editor
                      beforeMount={handleEditorWillMount}
                      height={editor.height}
                      theme="Active4D"
                      defaultLanguage="python"
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
        {/* {version && (
        <TestsCheckbox task={taskData} selectedTests={version.selectedTests} setSelectedTests={() => {}} viewOnly />
      )} */}
      {/* </CustomScrollbar> */}
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

const Active4D = {
  base: 'vs',
  inherit: true,
  rules: [
    {
      background: 'FFFFFF',
      token: '',
    },
    {
      background: 'e2e9ff5e',
      token: 'text.html source.active4d',
    },
    {
      foreground: '000000',
      token: 'text.xml',
    },
    {
      foreground: 'af82d4',
      token: 'comment.line',
    },
    {
      foreground: 'af82d4',
      token: 'comment.block',
    },
    {
      foreground: '666666',
      token: 'string',
    },
    {
      foreground: '66ccff',
      fontStyle: 'bold',
      token: 'string.interpolated variable',
    },
    {
      foreground: 'a8017e',
      token: 'constant.numeric',
    },
    {
      foreground: '66ccff',
      fontStyle: 'bold',
      token: 'constant.other.date',
    },
    {
      foreground: '66ccff',
      fontStyle: 'bold',
      token: 'constant.other.time',
    },
    {
      foreground: 'a535ae',
      token: 'constant.language',
    },
    {
      foreground: '6392ff',
      fontStyle: 'bold',
      token: 'variable.other.local',
    },
    {
      foreground: '0053ff',
      fontStyle: 'bold',
      token: 'variable',
    },
    {
      foreground: '6988ae',
      token: 'variable.other.table-field',
    },
    {
      foreground: '006699',
      fontStyle: 'bold',
      token: 'keyword',
    },
    {
      foreground: 'ff5600',
      token: 'storage',
    },
    {
      foreground: '21439c',
      token: 'entity.name.type',
    },
    {
      foreground: '21439c',
      token: 'entity.name.function',
    },
    {
      foreground: '7a7a7a',
      token: 'meta.tag',
    },
    {
      foreground: '016cff',
      token: 'entity.name.tag',
    },
    {
      foreground: '963dff',
      token: 'entity.other.attribute-name',
    },
    {
      foreground: '45ae34',
      fontStyle: 'bold',
      token: 'support.function',
    },
    {
      foreground: 'b7734c',
      token: 'support.constant',
    },
    {
      foreground: 'a535ae',
      token: 'support.type',
    },
    {
      foreground: 'a535ae',
      token: 'support.class',
    },
    {
      foreground: 'a535ae',
      token: 'support.variable',
    },
    {
      foreground: 'ffffff',
      background: '990000',
      token: 'invalid',
    },
    {
      foreground: 'ffffff',
      background: '656565',
      token: 'meta.diff',
    },
    {
      foreground: 'ffffff',
      background: '1b63ff',
      token: 'meta.diff.range',
    },
    {
      foreground: '000000',
      background: 'ff7880',
      token: 'markup.deleted.diff',
    },
    {
      foreground: '000000',
      background: '98ff9a',
      token: 'markup.inserted.diff',
    },
    {
      foreground: '5e5e5e',
      token: 'source.diff',
    },
  ],
  colors: {
    'editor.foreground': '#3B3B3B',
    'editor.background': '#FFFFFF',
    'editor.selectionBackground': '#BAD6FD',
    'editor.lineHighlightBackground': '#00000012',
    'editorCursor.foreground': '#000000',
    'editorWhitespace.foreground': '#BFBFBF',
  },
};