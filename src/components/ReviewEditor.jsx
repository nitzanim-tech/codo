import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';

const StyledEditor = styled(Editor)`
  .myContentClass {
    background: lightyellow;
  }

  .myGlyphMarginClass::before {
    content: '!';
    color: red;
  }
`;

export default function MonacoEditor({ code, theme = 'vs-light' }) {
  const comments = useRef({});

  const handleEditorDidMount = (editor, monaco) => {
    editor.onMouseDown((e) => {
      if (e.target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS) {
        console.log('here');
        const lineNumber = e.target.position.lineNumber;
        const comment = window.prompt('Enter your comment');
        if (comment) {
          comments.current[lineNumber] = comment;
          updateDecorations(editor, monaco);
        }
      }
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
    console.log(JSON.stringify(comments.current));
  };

  return (
    <div style={{marginTop:'30px'}}>
      <StyledEditor
        height="380px"
        defaultLanguage="python"
        theme={theme}
        value={code}
        options={{ minimap: { enabled: false }, readOnly: true }}
        onMount={handleEditorDidMount}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
