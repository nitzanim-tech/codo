import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import addReview from '../requests/review/addReview'

const StyledEditor = styled(Editor)`
  .myContentClass {
    background: lightyellow;
  }

  .myGlyphMarginClass::before {
    content: '!';
    color: red;
  }
`;

export default function ReviewEditor({ version, app, theme = 'vs-light' }) {
  const comments = useRef(version.review || {});
console.log(version);
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
      contextMenuOrder: 1.5,
      run: function (ed) {
        const lineNumber = ed.getPosition().lineNumber;
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
    const reviewData = JSON.stringify(comments.current);
    console.log(reviewData);
    addReview({ app, userId: version.student.uid, task: version.task, trialIndex: version.id, reviewData });
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <StyledEditor
        height="380px"
        defaultLanguage="python"
        theme={theme}
        value={version.code}
        options={{ minimap: { enabled: false }, readOnly: true }}
        onMount={handleEditorDidMount}
      />

      <div style={{ paddingBottom: '10px ' }}>
        {/* <Button isDisabled onClick={handleSave}> */}
        <Button onClick={handleSave}>שמור</Button>
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
