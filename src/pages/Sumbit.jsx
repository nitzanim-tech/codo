import React, { useState } from "react";
import FirstTask from "./FirstTask"
import {Breadcrumbs, Typography} from '@mui/material';
import Link from '@mui/material/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PythonConsole from '../components/PythonConsole'

function Submit() {

  function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


  return (
    <>
        <Breadcrumbs aria-label="breadcrumb" dir='rtl'>
          <Typography color="text.primary">ניווט</Typography>
          <Link underline="hover" color="inherit" href="/"> <HomeRoundedIcon/>בית  </Link>
          <Link underline="hover" color="inherit" href="/sumbit" > משימה  </Link>
        </Breadcrumbs>

    <PythonConsole/>
      <FirstTask />
    </>
  );
}

export default Submit;
