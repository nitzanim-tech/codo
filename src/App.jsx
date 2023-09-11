import { BrowserRouter, Route, Routes } from "react-router-dom";
import Instructurs from './pages/Instructurs';
import Sumbit from "./pages/Sumbit";
import Review from "./pages/Review";
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
        <Route path="/inst" element={<Instructurs />} />
        <Route path="/submit" element={<Sumbit />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
