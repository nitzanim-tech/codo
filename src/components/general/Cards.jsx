import { Button, Card } from '@mui/material';

import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { InstTaskButtons, InstFileButtons } from './InstCardsButtons';

const FileCard = ({ file, isInst, setting, index }) => {
  return (
    <Card key={index} dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Button radius="full" variant="faded" onClick={() => window.open(file.link)}>
            {file.type === 'ppt' && <SlideshowIcon style={{ color: '#FAE233' }} />}
            {file.type === 'pdf' && <PictureAsPdfIcon style={{ color: '#BF1E2E' }} />}
            {file.type === 'zip' && <FolderZipRoundedIcon style={{ color: '#386641' }} />}
          </Button>
          {file.name}
        </div>
        {isInst && <InstFileButtons setting={setting} index={index} />}
      </div>
    </Card>
  );
};

const DevTaskCard = ({ index, text, isInst, setting }) => {

  const taskId = index.split('-')[1];
  return (
    <Card key={index} dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Button radius="full" variant="faded" onClick={() => window.open(`./submit/${taskId}`)}>
            <BorderColorRoundedIcon style={{ color: '#005395' }} />
          </Button>
          {text}
        </div>
        {isInst && <InstTaskButtons setting={setting} index={index} />}
      </div>
    </Card>
  );
};

export { FileCard, DevTaskCard };
