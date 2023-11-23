import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Instructurs from './pages/Instructurs';
import Submit from './pages/Submit';
import Review from './pages/Review';
import DevTeam from './pages/DevTeam';
import Home from './pages/Home';
import ReadReview from './pages/ReadReview'
import ReactGA from 'react-ga4';
import firebaseConfig from './util/firebaseConfig';

import './App.css';
import Managers from './pages/Managers';

ReactGA.initialize(firebaseConfig.measurementId);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Sumbit />} />
        <Route path="/check" element={<Check />} />
        <Route path="/sent" element={<SumbitSent />} />
        <Route path="/famewall" element={<RegionalFameWall />} />
        <Route path="/inst" element={<Instructors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
