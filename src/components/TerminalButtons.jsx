import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { examplecode } from "../util/exampleCode";
import { Button } from "@nextui-org/react";

import FolderList from "./TestsList";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import RuleRoundedIcon from "@mui/icons-material/RuleRounded";
import BasicAccordion from "./Instructions";
import { Grid } from "@mui/material";
import PyodideConsole from "./PythonIDE";
import { Switch } from "@nextui-org/react";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { Tooltip } from "@nextui-org/react";

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


        <Grid item style={{ width: "25%" }}>
          <FolderList />
        </Grid>

        <Grid item style={{ width: "45%" }}>
          <Switch
            defaultSelected
            size="lg"
            color="success"
            startContent={<WbSunnyRoundedIcon />}
            endContent={<DarkModeRoundedIcon />}
          ></Switch>
          <Tooltip content="הגש" placement={"bottom"}>
            <Button isIconOnly variant="faded">
              <ReplyRoundedIcon />
            </Button>
          </Tooltip>

          <Tooltip content="בדוק" placement={"bottom"}>
            <Button isIconOnly variant="faded">
              <RuleRoundedIcon />
            </Button>
          </Tooltip>

          <Tooltip content="הרץ" placement={"bottom"}>
            <Button isIconOnly variant="faded">
              <PlayCircleRoundedIcon />
            </Button>
          </Tooltip>


          <PyodideConsole pythonCode={myPythonCodeString} />
        </Grid>

        <Grid item style={{ width: "30%" }}>
          <BasicAccordion />
        </Grid>
      </Grid>
    </>
  );
}

export default FirstTask;
