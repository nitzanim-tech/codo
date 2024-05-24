import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import addSession from '../../requests/sessions/addSession';
import { useFirebase } from '../../util/FirebaseProvider';
import { useParams } from 'react-router-dom';

export default function MonacoEditor({ code, setCode, theme }) {
  const { app, userData } = useFirebase();
  const { index } = useParams();

  const editorRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    const handlePaste = (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('text');
      const time = new Date().toISOString();
      const session = { pastedData, time };
      addSession({ app, userId: userData.id, task: index, session });
    };
    const editorDomNode = editor.getDomNode();
    editorDomNode.addEventListener('paste', handlePaste);

    return () => {
      editorDomNode.removeEventListener('paste', handlePaste);
    };
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
