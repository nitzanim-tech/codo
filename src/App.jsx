import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga4';
import firebaseConfig from './util/firebaseConfig';
import NavigateBar from './components/NavBar/NavigateBar';
import ErrorBoundary from './components/General/ErrorBoundary';

import './App.css';

import Home from './pages/Home';
const Instructurs = lazy(() => import('./pages/Instructurs'));
const Submit = lazy(() => import('./pages/Submit'));
const Play = lazy(() => import('./pages/Play'));
const Review = lazy(() => import('./pages/Review'));
const DevTeam = lazy(() => import('./pages/DevTeam'));
const AddNewTasks = lazy(() => import('./components/Dev/addNewTask/AddNewTasks'));
const Admin = lazy(() => import('./pages/Admin'));
const Manager = lazy(() => import('./pages/Manager'));
const Syllabus = lazy(() => import('./pages/Syllabus'));
const NotFound = lazy(() => import('./pages/NotFound'));

ReactGA.initialize(firebaseConfig.measurementId);

function App() {
  useEffect(() => {
    ReactGA.send('pageview', window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
      <NavigateBar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inst" element={<Instructurs />} />
          <Route path="/submit/:unit/:task" element={<Submit />} />
          <Route path="/play/:task" element={<Play />} />
          <Route path="/review/:submissionId" element={<Review />} />
          <Route path="/dev" element={<DevTeam />} />

          <Route path="/dev/:task" element={<AddNewTasks />} />

          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/admin/groups" element={<ManageGroups />} />*/}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          <Route path="/manager" element={<Manager />} />

          <Route path="/syllabus" element={<Syllabus />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
