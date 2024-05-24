import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function MonacoEditor({ code, setCode, theme }) {
  const { app, userData } = useFirebase();
  const editorRef = useRef(null);
  const { index } = useParams();

  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    const handlePaste = (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('text');
      console.log('Pasted content:', pastedData);
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
