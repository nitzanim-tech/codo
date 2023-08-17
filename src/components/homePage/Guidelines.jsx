import React from "react";
import { driveImg } from "../../assets/img";

function Guidelines() {
  const handleDownload = (file) => {
    const link = document.createElement("a");
    if (file == "basic") {
      link.href = `https://drive.google.com/file/d/1P2Q-NpB9gLWmcgl3iGvKYlCLSonKubNF/view?usp=sharing`;
    } else {
      link.href =
        "https://drive.google.com/file/d/1A4gOAv-GYNumLRCd8cnrKdaLBIMQXJob/view?usp=sharing";
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ width: "1000px", margin: "0 auto", textAlign: "center" }}>
      <p style={{fontFamily: 'yarden', fontWeight:'normal'}}> 
        ...חניכים יקרים, רק יצאתם לחופש וכבר אנחנו מתגעגעים <br />
        כדי לשמור על כשירות, מצורפת משימה לקיץ. הגשה שלה היא תנאי הכרחי להמשך
        לשנה ב <br />
        בנוסף קיים אתגר לאמיצים, ניתן להגיש אותו במקום המשימה הרגילה <br />
        מזכירים שבקרוב יהיה תרגול מונחה, שבו נפתור את המשימות יחד <br />
        מוזמנים בינתיים לנסות לפתור לבד ולתפוס את מקומכם על קיר התהילה
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <img
            src={driveImg}
            alt="Google Drive Icon"
            onClick={() => handleDownload("challenge")}
            className="drive-image"
          />
          <h4>9X9 אתגר</h4>
        </div>
        <div style={{ textAlign: "center" }}>
          <img
            src={driveImg}
            alt="Google Drive Icon"
            onClick={() => handleDownload("basic")}
            className="drive-image"
          />
          <h4>4X4 משימה</h4>
        </div>
      </div>
      <p>
        :לכל שאלה, צוות פיתוח שנה א' זמינים במייל
        <br />
        devteam.a@nitzanim.tech
        <br />
        <b>!בהצלחה</b>
      </p>
    </div>
  );
}

export default Guidelines;
