import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";
import { getStudentPass } from "../requests/getStdntsPass";
import { formatDate } from "../util/formatDate";
import { ConfirmationDialog, FameWall, Guidelines } from "../components";
import Timer from "../components/homePage/Timer";
import { useTimer } from "react-timer-hook";
//import useAnalyticsEventTracker from '../util/useAnalyticsEventTracker';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import LottieComponent from "../components/LottieComponent"
import "./Home.css";
import Button from '@mui/material/Button';



const formatData = (data) => {
  const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  const formattedData = sortedData.map((student) => ({
    ...student,
    date: formatDate(student.date),
  }));
  return formattedData;
};

function Home({deadline}) {
  const navigateTo = useNavigate();
  const [open, setOpen] = useState(false);
  const [basicStudents, setBasicStudents] = useState([]);
  const [challengeStudents, setChallengeStudents] = useState([]);

  //const gaEventTracker = useAnalyticsEventTracker('Home');
  
  const currentTime = new Date();
  const isTimeOver = currentTime >= new Date(deadline);




  useEffect(() => {
    const fetchStudents = async () => {
      const tasks = ['basic-sudoku', 'challenge-sudoku'];
      const data = await getStudentPass(tasks);
      setBasicStudents(formatData(data[tasks[0]]));
      setChallengeStudents(formatData(data[tasks[1]]));
    };
    fetchStudents();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    gaEventTracker('agree')
    navigateTo('/submit');
  };
  const handleClickToFW = () => {
    navigateTo('/famewall');
  };

  const targetDate = Date.parse(deadline);
  // const timer = useTimer({
  //   expiryTimestamp: targetDate,
  //   onExpire: () => setShowButtons(false),
  // });


const ParentDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

  return (
    <>
    <Button>
        <LottieComponent name = 'coin' text='אתגר'/>
    </Button>

    <Button>
      <LottieComponent name = 'puzzle' text='משימה'/>
    </Button>

    <Button>
      <LottieComponent name = 'explore' text='התנסות'/>
    </Button>
    
    <Button>
      <LottieComponent name = 'book' text = 'לספר הקורס'/>
    </Button>
    
      <ParentDiv>
          {!isTimeOver ? (
            <div className="timer-container">
            <h2>:האתר יסגר להגשות עוד</h2>
          <Timer targetDate={targetDate} />
            <h3>שלישי | 15.08.23 | 20:00</h3>
          </div>
      ) : (
          <h2 style={{ color: '#003061', margin: '20px' }}>האתר סגור להגשות</h2>
        )}
          <Divider orientation="vertical" flexItem/>
          <div className="vertical-layout">
            <img src={logoImg}></img>
            <h1 style={{fontFamily: 'yarden', fontWeight:'bold'}}>משימה/אתגר קיץ</h1>
            <Guidelines />
          </div>
        </ParentDiv>


      <button className="home-button" onClick={handleClickOpen}>
        {!isTimeOver? 'להגשה': 'לבדיקה'}
      </button>
      <button className="home-button" onClick={handleClickToFW}>
        לקיר התהילה
      </button>

      {/* <div className="blue-container">
        <div className="container" style={{ flexDirection: 'row' }}>
          <div style={{ marginRight: '20px', flex: '1' }}>
            <h3 style={{ color: 'white' }}>אתגר-לוח גדול</h3>
            <FameWall students={challengeStudents} />
          </div>

          <div style={{ flex: '1' }}>
            <h3 style={{ color: 'white' }}>משימה-לוח קטן</h3>
            <FameWall students={basicStudents} />
          </div>
        </div>
      </div> */}
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onAgree={handleAgree}
      />
    </>
  );
}

export default Home;
