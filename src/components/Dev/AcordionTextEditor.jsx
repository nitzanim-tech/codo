import { useState } from 'react';
import { AccordionItem, Accordion } from '@nextui-org/react';
import SunEditor, { buttonList } from 'suneditor-react';
import { Grid } from '@mui/material';

import 'suneditor/dist/css/suneditor.min.css';

const AcordionTextEditor = ({ title, setText }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const buttonList = [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['fontColor', 'hiliteColor'],

    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    // ['outdent', 'indent'],
    ['align', 'horizontalRule'],
    ['codeView'],
  ];

  function handleChange(content) {
    setHtmlContent(content);
    setText(content);
  }

  return (
    <div>
      <Grid container spacing={1} columns={2} rows={1}>
        <Grid item style={{ width: '45%' }}>
          <SunEditor
            setDefaultStyle="font-family: ariel; font-size: 20px;"
            onChange={handleChange}
            setOptions={{
              buttonList: buttonList,
            }}
          />
        </Grid>
        <Grid item style={{ width: '30%' }}>
          <Accordion dir="rtl" variant="splitted" selectionMode="multiple" selectedKeys={'1'} isCompact>
            <AccordionItem title={title} key="1">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </AccordionItem>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default AcordionTextEditor;

// const buttonList = [
//   ['undo', 'redo'],
//   ['font', 'fontSize', 'formatBlock'],
//   // ['paragraphStyle', 'blockquote'],
//   ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
//   ['fontColor', 'hiliteColor'],
//   // ['fontColor', 'hiliteColor', 'textStyle'],
//   // ['removeFormat'],
//   // '/', // Line break
//   ['outdent', 'indent'],
//   ['align', 'horizontalRule', 'list'],
//   // ['align', 'horizontalRule', 'list', 'lineHeight'],
//   // ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
//   /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
//   // ['fullScreen', 'showBlocks', 'codeView'],
//   // ['preview', 'print'],
//   // ['save', 'template'],
//   /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
// ];
