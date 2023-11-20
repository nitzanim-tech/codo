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
import TaskCard from "../components/Home/TaskCard";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import filesLinks from '../util/filesLinks.json';

function Home() {
  const allKeys = Object.keys(filesLinks).map((category) => category.toString());

  return (
    <>
      <NavBar isShowTask={false} />

      <Grid container spacing={1} columns={3} rows={1}>
        <Grid item style={{ width: '75%' }}>
          <Accordion dir="rtl" selectedKeys={allKeys}>
            {Object.entries(filesLinks).map(([category, files]) => (
              <AccordionItem key={category} aria-label={`Accordion ${category}`} title={category}>
                {Object.entries(files).map(([fileName, file]) =>
                  file.type === 'task' ? (
                    <TaskCard key={fileName} text={fileName} />
                  ) : (
                    <Card key={fileName} dir="rtl" style={{ margin: '5px', textAlign: 'right' }}>
                      <Button radius="full" isIconOnly variant="faded" onClick={() => window.open(file.link)}>
                        {file.type === 'ppt' && <SlideshowIcon style={{ color: '#FAE233' }} />}
                        {file.type === 'pdf' && <PictureAsPdfIcon style={{ color: '#BF1E2E' }} />}
                      </Button>
                      {fileName}
                    </Card>
                  ),
                )}
              </AccordionItem>
            ))}
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
