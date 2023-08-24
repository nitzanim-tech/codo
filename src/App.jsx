import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sumbit from "./pages/Sumbit";
import Check from "./pages/Check";
import Instructors from "./pages/Instructors";
import "./App.css";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Sumbit />} />
        <Route path="/check" element={<Check />} />
        <Route path="/inst" element={<Instructors />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
