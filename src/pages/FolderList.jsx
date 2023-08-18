import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';


import SimpleDialogDemo from "../components/SimpleDialogDemo"

export default function FolderList() {
  const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClick = () => {
    setOpen(!open);
  };
{/*onClick={handleClick()}*/}
  return (
  <>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          בדיקות
        </ListSubheader>
      }
    >
      <ListItemButton dir='rtl'  divider={true} >

        <ListItemIcon> <CheckCircleRoundedIcon /> </ListItemIcon>
        <ListItemText primary='קרוב למעלית A' />
      </ListItemButton>

      <ListItemButton dir='rtl'>
        <ListItemIcon> <CancelRoundedIcon /> </ListItemIcon>
        <ListItemText primary='קרוב למעלית B' />
      </ListItemButton>

      <ListItemButton dir='rtl' disabled={true}>
        <ListItemIcon> <RadioButtonUncheckedRoundedIcon /> </ListItemIcon>
        <ListItemText primary='בדיוק באמצע' />
      </ListItemButton>

    </List>
    <SimpleDialogDemo/>
</>

  );
}