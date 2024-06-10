import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import SessionTracker from '../../components/general/SessionTracker';

export default function MonacoEditor({ code, setCode, theme }) {

  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  return (
    <>
      <Editor
        height="315px"
        defaultLanguage="python"
        theme={theme}
        value={code}
        onChange={(newValue) => setCode(newValue)}
        options={{ minimap: { enabled: false } }}
      />
      <SessionTracker type={'paste'} />
    </>
  );
}
