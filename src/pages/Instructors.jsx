import React from "react";
import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import SelectInst from "../components/SelectInst";
import logoImg from "../assets/img/logo.png";
import DownloadIcon from "../components/instractorsPage/DownloadIcon";
import PasswordDialog from "../components/instractorsPage/PasswordDialog";
import TableFrame from "../components/instractorsPage/TableFrame";

function Instructors() {
  const [students, setStudents] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedInst, setSelectedInst] = useState("");
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(
    !localStorage.getItem("token"),
  );

  async function fetchData() {
    const response = await fetch(
      `https://suduku-back.up.railway.app/student/get?instId=${selectedInst}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
    );
    if (response.status === 401) {
      localStorage.removeItem("token");
    } else {
      let data = await response.json();
      data = data.map((student) => ({ ...student, id: student._id }));
      setStudents(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedInst]);

  return (
    <div
      style={{
        width: "700px",
      }}
    >
      {students.length > 0 && <DownloadIcon students={students} />}
      <img src={logoImg} alt="Logo" />
      <Card style={{ margin: "20px" }}>
        <SelectInst
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedInst={selectedInst}
          setSelectedInst={setSelectedInst}
        />
      </Card>

      <PasswordDialog
        open={passwordDialogOpen}
        onEnter={() => {
          setPasswordDialogOpen(false);
          fetchData();
        }}
      />

      <TableFrame students={students} />
    </div>
  );
}

export default Instructors;
