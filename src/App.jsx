import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sumbit from "./pages/Sumbit";
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import firebaseConfig from './util/firebaseConfig';

import "./App.css";

ReactGA.initialize(firebaseConfig.measurementId);

function App() {
    useEffect(() => {
      ReactGA.send('pageview', window.location.pathname + window.location.search);
    }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/submit" element={<Sumbit />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
