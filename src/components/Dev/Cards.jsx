
import { Button, Card } from '@mui/material';

import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

const FileCard = ({ file }) => {
  return (
    <Card key={file.name} dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
      <Button radius="full" variant="faded" onClick={() => window.open(file.link)}>
        {file.type === 'ppt' && <SlideshowIcon style={{ color: '#FAE233' }} />}
        {file.type === 'pdf' && <PictureAsPdfIcon style={{ color: '#BF1E2E' }} />}
        {file.type === 'zip' && <FolderZipRoundedIcon style={{ color: '#386641' }} />}
      </Button>
      {file.name}
    </Card>
  );
};

const DevTaskCard = ({ index, text }) => {
  return (
    <Card key={index} dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
      <Button radius="full" variant="faded" onClick={() => window.open(`./submit/${index}`)}>
        <BorderColorRoundedIcon style={{ color: '#005395' }} />
      </Button>
      {text}
    </Card>
  );
};

export { FileCard, DevTaskCard };