import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Guidelines } from "../components/Guidelines";
import Divider from "@mui/material/Divider";
import NavBar from "../components/NavBar/NavigateBar";

import "./Home.css";
import { Button ,Grid,Card} from "@mui/material";
import { Accordion, AccordionItem, Tooltip, Badge } from '@nextui-org/react';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LoopIcon from '@mui/icons-material/Loop';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FlagCircleRoundedIcon from '@mui/icons-material/FlagCircleRounded';
import Forward30RoundedIcon from '@mui/icons-material/Forward30Rounded';

import TaskCard from "../components/Home/TaskCard";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const PPlink = `https://onedrive.live.com/view.aspx?resid=E76849631A0CCAEC%21349&authkey=!AIhEW84wlIykoHM`;
const PDFlink=`https://1drv.ms/b/s!AuzKDBpjSWjngl5HjCkXY7tOBDQ5?e=6iduU3`
const wordlink = `https://1drv.ms/w/s!AuzKDBpjSWjngQjXxR9jjkC6ELWN?e=dCI8P4`;
function Home() {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  return (
    <>
      <NavBar isShowTask={false} />

      <Grid container spacing={1} columns={3} rows={1}>
        <Grid item style={{ width: '75%' }}>
          <Accordion dir="rtl" disabledKeys={['4', '5']} selectedKeys={['1', '2', '3']}>
            <AccordionItem key="1" aria-label="Accordion 1" title="הכנה" indicator={<FlagCircleRoundedIcon />}>
              <Card dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
                <Button radius="full" isIconOnly variant="faded" onClick={() => window.open(PPlink)}>
                  <SlideshowIcon style={{ color: '#FAE233' }} />
                </Button>
                ברוכים הבאים לניצנים
              </Card>

              <Card dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
                <Button radius="full" isIconOnly variant="faded" onClick={() => window.open(wordlink)}>
                  <PictureAsPdfIcon style={{ color: '#BF1E2E' }} />
                </Button>
                הוראת התקנת PyCharm
              </Card>

              <TaskCard text={'משימה 01 - שלום עולם'} />
              <TaskCard text={'משימה 02 -אליס והמעלית'} />
            </AccordionItem>

            <AccordionItem key="2" aria-label="Accordion 2" title="תנאים" indicator={<HelpOutlineIcon />}>
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="לולאת while" indicator={<LoopIcon />}>
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="4" aria-label="Accordion 3" title="לולאת for" indicator={<Forward30RoundedIcon />}>
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="5" aria-label="Accordion 3" title="פונקציות" indicator={<LoopIcon />}>
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </Grid>
        <Grid item style={{ width: '24%' }}>
          <h1 style={{ margin: '40px' }}> שלום יוסלה</h1>
          <h2>אירועים קרובים</h2>
          <Card dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
            <CalendarMonthIcon />
            2.3.23 טיול חנוכה
          </Card>
          <Card dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
            <CalendarMonthIcon />
            2.5.23 האקתון
          </Card>

          <h2 style={{ marginTop: '30px' }}>הודעות מהמדריך</h2>
          <Card dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
            <div style={{ margin: '15px' }}>
              <p style={{ color: 'gray', textAlign: 'left' }}>22.5.23</p>
              היי, מה נשמע.
              <br />
              מזכיר שמחר האקתון, לבוא עם חולצה לבנה! <br />
              <p style={{ textAlign: 'left' }}>שמעון</p>
            </div>
          </Card>

          <Card dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
            <div style={{ margin: '15px' }}>
              <p style={{ color: 'gray', textAlign: 'left' }}>22.3.23</p>
              היי, מקווה שאתם בסדר.
              <br />
              מעדכן ששבוע הבא אתם צריכים להביא עוגה
              <br />
              <p style={{ textAlign: 'left' }}>שמעון</p>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );

}

export default Home;
