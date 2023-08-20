import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";
import { ConfirmationDialog, FameWall, Guidelines } from "../components";
//import useAnalyticsEventTracker from '../util/useAnalyticsEventTracker';
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import LottieComponent from "../components/LottieComponent";
import "./Home.css";
import { Button ,Grid} from "@mui/material";
import waveSvg from "../assets/wave-haikei.svg";

function Home({ deadline }) {
  const navigateTo = useNavigate();
  const [open, setOpen] = useState(false);

  const targetDate = Date.parse(deadline);

  const ParentDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
  `;

  return (
    <>
      <img src={logoImg} style={{ width: "200px" }} />

      <Grid container spacing={1} columns={3} rows={1}>
        <Grid item style={{ width: "25%" }}>
          <Button>
            <LottieComponent name="book" text="לספר הקורס" />
          </Button>

          <Button>
            <LottieComponent name="coin" text="אתגר" />
          </Button>

          <Button>
            <LottieComponent name="puzzle" text="משימה" />
          </Button>

          <Button>
            <LottieComponent name="explore" text="התנסות" />
          </Button>
        </Grid>
        <Divider orientation="vertical" flexItem />

        <Grid
          item
          style={{
            width: "74%",
            backgroundImage: `url(${waveSvg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            textAlign: "right",
          }}
        >
          <h1
            style={{
              fontFamily: "yarden",
              fontWeight: "bold",
              color: "white",
              marginRight: "10%",
            }}
          >
            ברוכים הבאים
          </h1>
          <Guidelines />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
