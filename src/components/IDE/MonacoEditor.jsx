import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';

export default function MonacoEditor({ code, setCode, theme, highlightedLines }) {
  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  const updateDecorations = (editor, monaco) => {
    if (highlightedLines) {
      const decorations = highlightedLines.map((line) => ({
        range: new monaco.Range(line, 1, line, editor.getModel().getLineMaxColumn(line)),
        options: {
          isWholeLine: true,
          className: `highlightedLine ${theme === 'vs-dark' ? 'darkTheme' : 'lightTheme'}`,
        },
      }));
      editor.deltaDecorations([], decorations);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
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

  .lightTheme .highlightedLine {
    background: lightgray;
  }

  .darkTheme .highlightedLine {
    background: darkgray;
  }
`;
