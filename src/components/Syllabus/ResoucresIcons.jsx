import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';

export const ResourcesIcons = ({ type }) => {
  switch (type) {
    case 'ppt':
      return <SlideshowIcon style={{ color: '#FAE233' }} />;
    case 'pdf':
      return <PictureAsPdfIcon style={{ color: '#BF1E2E' }} />;
    case 'zip':
      return <FolderZipRoundedIcon style={{ color: '#386641' }} />;
    case 'webLink':
      return <PublicRoundedIcon style={{ color: '#8C7AA9' }} />;
    default:
      return null;
  }
};
