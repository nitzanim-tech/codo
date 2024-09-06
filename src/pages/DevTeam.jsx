import { Tabs, Tab, Divider, Input } from '@nextui-org/react';
import DevTasksTab from '../components/Dev/DevTasksTab';
import AddNewTasks from '../components/Dev/addNewTask/AddNewTasks';
// import ManageLessons from '../components/Dev/manageLessons/ManageLessons';
import MiniDrawer from '../components/Dev/TEST';
import App from '../components/Dev/userTrack/UserTrack';
import NavBar from '../components/NavBar/NavigateBar';
import { useFirebase } from '../util/FirebaseProvider';
import LoginOrRegisterDropdown from '../components/NavBar/LoginOrRegisterDropdown';

const DevTeam = () => {
  const { auth, userData } = useFirebase();

  return (
    <>
      <div
        style={{
          margin: '30px',
          justifyContent: 'center',
          padding: '40px',
          backgroundColor: 'rgba(255,255,255, 0.8)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', color: '#008AD1', margin: '10px 10px 10px 30px' }}>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Tasks</h1>
        </div>
        {userData ? (
          <DevTasksTab />
        ) : (
          <>
            <p style={{fontSize:'24px'}}>Login:</p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LoginOrRegisterDropdown auth={auth} userData={userData} />
            </div>
          </>
        )}

        {/* <Tabs radius="full" aria-label="Tabs radius" style={{ marginTop: '20px' }}>
        <Tab key="table" title="משימות">
        </Tab>
        <Tab key="add" title="משימה חדשה">
          <AddNewTasks />
        </Tab>
         <Tab key="lessons" title="מפגשים">
          <ManageLessons />
        </Tab> 
        <Tab key="track" title="מעקב">
          <App />
        </Tab>
         <Tab key="AA" title="TEST">
          <MiniDrawer />
        </Tab>
      </Tabs> */}
      </div>
    </>
  );
};

export default DevTeam;

