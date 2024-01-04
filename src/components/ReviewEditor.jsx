import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';
import { Button, Tooltip, Textarea } from '@nextui-org/react';
import addReview from '../requests/review/addReview';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
const StyledEditor = styled(Editor)`
  .myContentClass {
    background: lightyellow;
  }
  .myGlyphMarginClass::before {
    content: '!';
    color: red;
  }
`;
const LINE_HEGITH = 20;
export default function ReviewEditor({ version, app, theme = 'vs-light' }) {
  const [saved, setSaved] = useState(false);
  const [generalReview, setGeneralReview] = useState(version.review ? JSON.parse(version.review).general : '');
  const comments = useRef(version.review ? JSON.parse(version.review).comments : {});

  const handleEditorDidMount = (editor, monaco) => {
    updateDecorations(editor, monaco);

    editor.addAction({
      id: 'my-unique-id',
      label: 'add a comment',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyM),
      ],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: 'navigation',
      run: function (ed) {
        editor.focus();
        console.log(ed.getPosition());
        const lineNumber = ed.getPosition().lineNumber - 1;
        const comment = window.prompt('Enter your comment');
        if (comment) {
          comments.current[lineNumber] = comment;
          updateDecorations(editor, monaco);
        }
      },
    });
  };
  const updateDecorations = (editor, monaco) => {
    const decorations = Object.entries(comments.current).map(([line, comment]) => ({
      range: new monaco.Range(parseInt(line), 1, parseInt(line), 1),
      options: {
        isWholeLine: true,
        className: 'myContentClass',
        glyphMarginClassName: 'myGlyphMarginClass',
        hoverMessage: { value: comment },
      },
    }));
    editor.deltaDecorations([], decorations);
  };
  const handleSave = () => {
    const reviewData = JSON.stringify({
      comments: comments.current,
      general: generalReview,
      date: new Date(),
      hasOpened: false,
    });
    const hadSaved = addReview({
      app,
      userId: version.student.uid,
      task: version.task,
      trialIndex: version.id,
      reviewData,
    });
    setSaved(hadSaved);
  };
  return (
    <div style={{ marginTop: '25px ' }}>
      <StyledEditor
        height={`${version.code.split('\n').length * LINE_HEGITH}px`}
        defaultLanguage="python"
        theme={theme}
        value={version.code}
        options={{ minimap: { enabled: false }, readOnly: true, scrollBeyondLastLine: false }}
        onMount={handleEditorDidMount}
      />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%', paddingBlock: '20px', textAlign: 'right', direction: 'rtl' }}>
          <Textarea
            label="משוב כללי"
            labelPlacement="outside"
            placeholder="כתבו כאן"
            defaultValue={generalReview}
            onChange={(e) => setGeneralReview(e.target.value)}
          />
        </div>
      </div>

      <div style={{ paddingBottom: '10px ' }}>
        {saved ? (
          <p style={{ fontWeight: 'bold', color: '#005395' }}>
            הועבר לחניך בהצלחה <CheckCircleRoundedIcon />
          </p>
        ) : (
          <Tooltip content="העבר לחניך">
            <Button radius="full" isIconOnly variant="faded" onClick={handleSave} style={{ margin: '10px ' }}>
              <ReplyRoundedIcon />
            </Button>
          </Tooltip>
        )}
        <Tooltip content="תצוגה מקדימה">
          <Button
            // isDisabled={comments.current != {}}
            style={{ margin: '10px ' }}
            radius="full"
            isIconOnly
            variant="faded"
            onClick={() => {
              const checkedSubmit = {
                code: version.code,
                review: JSON.stringify({ comments: comments.current, general: generalReview }),
              };
              localStorage.setItem('checkedSubmit', JSON.stringify(checkedSubmit));
              window.open('/readReview', '_blank');
            }}
          >
            <PageviewRoundedIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
// const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// const [inputPlace, setInputPlace] = useState({ x: 0, y: 0 });
// const handleMouseMove = (e) => {
//   setMousePosition({ x: e.clientX, y: e.clientY });
// };
// useEffect(() => {
//   window.addEventListener('click', handleMouseMove);
//   return () => {
//     window.removeEventListener('click', handleMouseMove);
//   };
// }, []);
/* <input
        type="text"
        color="blue"
        style={{
          position: 'absolute',
          left: `${mousePosition.x}px`,
          top: `${inputPlace.y - 110}px`,
          backgroundColor: '#3CBC8D',
          color: 'white',
        }}
/> */