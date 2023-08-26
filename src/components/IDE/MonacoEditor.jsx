import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";


export default function PyodideConsole({ code, setCode }) {
  return (
    <Editor
      height="300px"
      defaultLanguage="python"
      theme="vs-dark"
      value={code}
      onChange={(newValue) => setCode(newValue)}
      options={{ minimap: { enabled: false } }}
    />
  );
}
