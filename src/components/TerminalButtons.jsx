import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { examplecode } from "../util/exampleCode";
import { Button } from "@nextui-org/react";

import FolderList from "./TestsList";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import RuleRoundedIcon from "@mui/icons-material/RuleRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

import BasicAccordion from "./Instructions";
import { Grid } from "@mui/material";
import PyodideConsole from "./PythonIDE";
import { Switch } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { handleEvaluate } from "./PythonIDE";
import { Skeleton } from "@nextui-org/react";

function FirstTask() {
  const [code, setCode] = useState(localStorage.getItem("code") || examplecode);
  const [output, setOutput] = useState("");
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectError, setSelectError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
      (async () => {
        const pyodide = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
        });
        pyodide.registerJsModule("customInput", {
          input: (prompt) => {
            setOutput((output) => output + prompt);
            return new Promise((resolve) => {
              setInputCallback(() => (value) => {
                setOutput((output) => output + value + "\n");
                resolve(value);
              });
            });
          },
        });
        pyodide.runPython(`
        import customInput
        def input(prompt=""):
          return customInput.input(prompt)
      `);
        setPyodide(pyodide);
        setLoading(false);
      })();
  }, []);


  if (loading) {
    return (
      <div>
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    );
  }

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
            <Button
              isIconOnly
              variant="faded"
              onClick={() => handleEvaluate({ pyodide, code, setOutput })}
            >
              <PlayCircleRoundedIcon />
            </Button>
          </Tooltip>

          <PyodideConsole
            code={code}
            setCode={setCode}
            output={output}
          />
        </Grid>

        <Grid item style={{ width: "30%" }}>
          <BasicAccordion />
        </Grid>
      </Grid>
    </>
  );
}

export default FirstTask;
