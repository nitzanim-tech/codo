import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Instructurs from './pages/Instructurs';
import Submit from './pages/Submit';
import Review from './pages/Review';
import DevTeam from './pages/DevTeam';
import AddNewTasks from './components/Dev/addNewTask/AddNewTasks';
import Home from './pages/Home';
import ReadReview from './pages/ReadReview'
import Play from './pages/Play';
import Admin from './pages/Admin';
import Manager from './pages/Manager';

import ReactGA from 'react-ga4';
import firebaseConfig from './util/firebaseConfig';

import './App.css';

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
        <Route path="/submit/:index" element={<Submit />} />
        <Route path="/submit/:index/play" element={<Play />} />
        <Route path="/review" element={<Review />} />
        <Route path="/readReview" element={<ReadReview />} />
        <Route path="/dev" element={<DevTeam />} />
        <Route path="/dev/newTask" element={<AddNewTasks />} />
        <Route path="/dev/editTask/:index" element={<AddNewTasks />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
