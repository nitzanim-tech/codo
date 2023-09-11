import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function MonacoEditor({ code, setCode, theme }) {
  const comments = useRef({});

  const handleEditorDidMount = (editor, monaco) => {
    editor.onMouseDown((e) => {
      if (e.target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS) {
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
        glyphMarginHoverMessage: { value: comment },
      },
    }));
    editor.deltaDecorations([], decorations);
  };

  return (
    <Editor
      height="315px"
      defaultLanguage="python"
      theme={theme}
      value={code}
      onChange={(newValue) => setCode(newValue)}
      options={{ minimap: { enabled: false } }}
      onMount={handleEditorDidMount}
    />
  );
}
