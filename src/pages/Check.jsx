import React, { useState, useEffect, useRef } from "react";
import("./Check.css");


function Check() {
//   const side = parseInt(localStorage.getItem("task")) || 4;
//   const code = localStorage.getItem("code") || "";
//   const sudokusRef = useRef(
//     side === 4
//       ? [
//           generateSudoku(side, 2),
//           generateSudoku(side, 1),
//           generateSudoku(side, 5),
//           generateSudoku(side, 3),
//         ]
//       : [
//           generateSudoku(side, 5),
//           generateSudoku(side, 10),
//           generateSudoku(side, 20),
//           generateSudoku(side, 40),
//         ]
//   );

//   const [outputs, setOutputs] = useState([[], [], [], []]);
//   const [isValid, setIsValid] = useState([false, false, false, false]);
//   const [studentName, setStudentName] = useState("");
//   const [selectedRegion, setSelectedRegion] = useState("");
//   const [selectedInst, setSelectedInst] = useState("");
//   const [sent, setSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const pass = isValid.every((value) => value === true);
//   const formProps = {
//     studentName,
//     setStudentName,
//     selectedRegion,
//     setSelectedRegion,
//     selectedInst,
//     setSelectedInst,
//     pass,
//     setSent,
//   };


//   useEffect(() => {
//     side === 4
//       ? document.body.classList.add("small", "body--blue")
//       : document.body.classList.add("big", "body--blue");

//     return () => {
//       document.body.classList.remove("small","big", "body--blue");
//     };
//   }, []);

// useEffect(() => {
//   async function fetchData() {
//     setLoading(true);
//     const response = await runScript({
//       script: code,
//       inputs: sudokusRef.current,
//     });
//     setOutputs(response.outputs);
//     setLoading(false);
//   }
//   fetchData();
// }, []);


//   useEffect(() => {
//     if (sent) {
//       navigate("/sent");
//     }
//   }, [sent]);

  return (
    <div className="container">
      <div className="container" style={{ width: "70%" }}>
        {/* <div className="grid">
          {sudokusRef.current.map((sudoku, index) => (
            <TestCard
              key={index}
              index={index}
              outputs={outputs}
              isValid={isValid}
              loading={loading}
              setIsValid={setIsValid}
              sudoku={sudoku}
            />
          ))}
        </div>

        <div className="container">
          <SendForm {...formProps} />
        </div> */}
      </div>
    </div>
  );
}

export default Check;
