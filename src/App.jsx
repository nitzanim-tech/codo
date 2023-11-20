import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Instructurs from './pages/Instructurs';
import Sumbit from './pages/Sumbit';
import Review from './pages/Review';
import DevTeam from './pages/DevTeam';
import Home from './pages/Home';

import ReactGA from 'react-ga4';
import firebaseConfig from './util/firebaseConfig';

import './App.css';
import Managers from './pages/Managers';

ReactGA.initialize(firebaseConfig.measurementId);

function App() {
  useEffect(() => {
    ReactGA.send('pageview', window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inst" element={<Instructurs />} />
        <Route path="/submit" element={<Sumbit />} />
        <Route path="/review" element={<Review />} />
        <Route path="/dev" element={<DevTeam />} />
        <Route path="/manager" element={<Managers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
