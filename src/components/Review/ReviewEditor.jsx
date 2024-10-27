import Editor from '@monaco-editor/react';
import styled from 'styled-components';

const LINE_HEGITH = 20;
const theme = 'vs-light';

export default function ReviewEditor({ submittion, comments = {} }) {
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
      run: function (ed) {
        editor.focus();
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
    if (comments.current) {
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
    }
  };

  return (
    <StyledEditor
      height={`${submittion.code.split('\n').length * LINE_HEGITH}px`}
      defaultLanguage="python"
      theme={theme}
      value={submittion.code}
      options={{ minimap: { enabled: false }, readOnly: true, scrollBeyondLastLine: false }}
      onMount={handleEditorDidMount}
    />
  );
}

const StyledEditor = styled(Editor)`
  .myContentClass {
    background: lightyellow;
  }
  .myGlyphMarginClass::before {
    content: '!';
    color: red;
  }
`;

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
