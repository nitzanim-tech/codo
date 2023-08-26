import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sumbit from "./pages/Sumbit";
import Instructors from "./pages/Instructors";
import { app, analytics } from "./util/Firebase";

import "./App.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Sumbit />} />
        <Route path="/inst" element={<Instructors />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
