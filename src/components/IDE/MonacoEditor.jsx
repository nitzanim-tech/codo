import React, { useEffect, useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';

export default function MonacoEditor({ code, setCode, theme, highlightedLines }) {

  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      updateDecorations(editorRef.current, monacoRef.current);
    }
  }, [highlightedLines]);

  const updateDecorations = (editor, monaco) => {
    if (highlightedLines) {
      const decorations = highlightedLines.map((line) => ({
        range: new monaco.Range(line, 1, line, editor.getModel().getLineMaxColumn(line)),
        options: {
          isWholeLine: true,
          className: 'highlightedLine',
        },
      }));
      editor.deltaDecorations([], decorations);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    updateDecorations(editor, monaco);
  };

  return (
    <StyledEditor
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

const StyledEditor = styled(Editor)`
  .highlightedLine {
    background: dimgray;
  }
`;
