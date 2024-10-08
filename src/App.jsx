import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Instructurs from './pages/Instructurs';
import Submit from './pages/Submit';
import Review from './pages/Review';
import DevTeam from './pages/DevTeam';
import AddNewTasks from './components/Dev/addNewTask/AddNewTasks';
import Home from './pages/Home';
import ReadReview from './components/Submit/ReadReview';
import Play from './pages/Play';
import Admin from './pages/Admin';
import Manager from './pages/Manager';
// import Dashboard from './pages/Dashboard';
import ReactGA from 'react-ga4';
import firebaseConfig from './util/firebaseConfig';
import Syllabus from './pages/Syllabus';
import ManageGroups from './components/Admin/ManageGroups';
import NotFound from './pages/NotFound';
import './App.css';
import NavigateBar from './components/NavBar/NavigateBar';
ReactGA.initialize(firebaseConfig.measurementId);

function App() {
  useEffect(() => {
    ReactGA.send('pageview', window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
      <NavigateBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inst" element={<Instructurs />} />
        <Route path="/submit/:unit/:task" element={<Submit />} />
        <Route path="/submit/:index/play" element={<Play />} />
        {/* <Route path="/review" element={<Review />} />
        <Route path="/readReview" element={<ReadReview />} /> */}
        <Route path="/dev" element={<DevTeam />} />

        <Route path="/dev/:task" element={<AddNewTasks />} />

        {/* <Route path="/admin" element={<Admin />} />
        <Route path="/admin/groups" element={<ManageGroups />} />*/}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route path="/manager" element={<Manager />} />

        <Route path="/syllabus" element={<Syllabus />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
