import 'suneditor/dist/css/suneditor.min.css';

import ReactDiffViewer from 'react-diff-viewer-continued';
import { highlight, languages } from 'prismjs';
import { compareTwoStrings } from 'string-similarity';
import DonutChart from '../Inst/Chart';
const EMPTY_HUNKS = [];

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
  const highlightSyntax = (str = '') => (
    <pre
      style={{ display: 'inline' }}
      dangerouslySetInnerHTML={{
        __html: highlight(str, languages.txt),
      }}
    />
  );

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', direction: 'rtl' }}>
        <DonutChart percentage={compareTwoStrings(oldText, newText) * 100} size={50} />
        <h3 style={{ marginRight: '10px' }}>
          <b>דימיון</b>
        </h3>
      </div>

      <div style={{ direction: 'ltr' }}>
        <ReactDiffViewer
          leftTitle={'הפלט שלך'}
          rightTitle={'פלט הפתרון'}
          oldValue={oldText}
          newValue={newText}
          splitView={true}
          compareMethod={DiffMethod.CHARS}
          hideLineNumbers={false}
          renderContent={highlightSyntax}
          hideGutters={true}
          expandAllChunks={true}
        />
      </div>
    </>
  );
}

const DefaultExplanation = (selectedValue) => {
  return (
    <>
      <TextCompare oldText={selectedValue.output} newText={selectedValue.ans} />
    </>
  );
};

export { DefaultExplanation };
