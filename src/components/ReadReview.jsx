import React, { useEffect, useRef, useState } from 'react';
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

export default function ReadReview({ version, theme = 'vs-light' }) {
  const comments = useRef(version.review ? JSON.parse(version.review) : {});
  const handleEditorDidMount = (editor, monaco) => {
    updateDecorations(editor, monaco);
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

      <div style={{ paddingBottom: '10px ' }}></div>
    </div>
  );
}
