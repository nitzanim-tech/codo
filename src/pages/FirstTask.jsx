import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-chrome";
import { examplecode } from "../util/exampleCode";
import { ButtonGroup, Button } from "@mui/material";
import "./Submit.css";
import FolderList from "./FolderList"
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import BasicAccordion from "../components/Instructions"
import { WidthFull } from "@mui/icons-material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import PyodideConsole from "../components/instractorsPage/newPython"

function FirstTask() {
  const [code, setCode] = useState(localStorage.getItem("code") || examplecode);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectError, setSelectError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!selectedTask) {
      setSelectError(true);
      return;
    }
    setSelectError(false);
    localStorage.setItem("code", code);
    localStorage.setItem("task", selectedTask);
    navigate("/check");
  };


let myPythonCodeString = `
print(hi)
`;


  return (
    <>  
      <Grid container spacing={1} columns={3} rows={1}>
        <Grid item style={{ width: '25%' }}>
            <FolderList/>
        </Grid>

      <PyodideConsole pythonCode={myPythonCodeString} />

      <Grid item style={{ width: '45%' }}>
          <ButtonGroup variant="text" aria-label="outlined button group">
            <Button endIcon={<ReplyRoundedIcon />}>הגש</Button>
            <Button endIcon={<RuleRoundedIcon />} >בדוק</Button>
            <Button endIcon={<PlayCircleRoundedIcon />}>הרץ </Button>
          </ButtonGroup>

            <AceEditor
              mode="python"
              theme="chrome"
              name="code-editor"
              fontSize={14}
              value={code}
              editorProps={{ $blockScrolling: true }}
              onChange={(newValue) => setCode(newValue)}
              style={{ width: '100%' }}
            />
        </Grid>

      <Grid item style={{ width: '30%' }}>
          <BasicAccordion/>
        </Grid>

      </Grid>
    </>
  );
}

export default FirstTask;
