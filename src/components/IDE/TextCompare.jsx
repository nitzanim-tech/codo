import 'suneditor/dist/css/suneditor.min.css';

import ReactDiffViewer from 'react-diff-viewer-continued';
import {highlight, languages} from 'prismjs';
import { compareTwoStrings } from 'string-similarity';

const EMPTY_HUNKS = [];
const oldText = ` onAuthStateChanged(auth, async (user) => {
    try {
      if (!currentUser) {
        const [groupsFromDB, current] = await Promise.all([getCurrentUser({ app, id: user.uid })]);
        setGroups(groupsFromDB);
        setCurrentUser(current);
      }
      user.email.includes('@nitzanim.tech') ? setUnauthorized(false) : setUnauthorized(true);
    } catch    {
      setCurrentUser({ email: '' });
    }
  });
`;
const newText = `onAuthStateChanged(auth, async (user) => {
    try {
      if (!currentUser) {
        const [groupsFromDB, current] = await Promise.all([getCurrentUser({ app, id: user.uid })]);
        setGroups(groupsFromDB);
        setCurrentUser(current);
      }

      user.email.includes('@nitzanim.tech') ? setUnauthorized(false) : setUnauthorized(true);
    } catch {
      setCurrentUser({ email: 'hjhhj@hjk.hkmn' });
    }
  });
`;


const DiffMethod = {
  CHARS: 'diffChars',
  WORDS: 'diffWords',
  WORDS_WITH_SPACE: 'diffWordsWithSpace',
  LINES: 'diffLines',
  TRIMMED_LINES: 'diffTrimmedLines',
  SENTENCES: 'diffSentences',
  CSS: 'diffCss',
};

function TextCompare({ oldText, newText }) {
  const highlightSyntax = (str='') => (
    <pre
      style={{ display: 'inline' }}
      dangerouslySetInnerHTML={{
        __html: highlight(str, languages.txt),
      }}
    />
  );

  return (
    <ReactDiffViewer
      oldValue={oldText}
      newValue={newText}
      splitView={true}
      compareMethod={DiffMethod.LINES}
      hideLineNumbers={false}
      renderContent={highlightSyntax}
    />
  );
}

const Example = () => {
  return (
    <>
      <TextCompare oldText={oldText} newText={newText} />
    </>
  );
};

export { TextCompare, Example };
