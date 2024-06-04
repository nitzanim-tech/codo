import { Tabs, Tab, Divider, Input } from '@nextui-org/react';
import DevTasksTab from '../components/Dev/DevTasksTab';
import AddNewTasks from '../components/Dev/addNewTask/AddNewTasks';
import ManageLessons from '../components/Dev/manageLessons/ManageLessons';
import MiniDrawer from '../components/Dev/TEST';
import App from '../components/Dev/userTrack/UserTrack';

const DevTeam = () => {
  return (
    <div
      style={{
        margin: '30px',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: 'rgba(255,255,255, 0.8)',
      }}
    >
      <Tabs radius="full" aria-label="Tabs radius" style={{ marginTop: '20px' }}>
        <Tab key="table" title="משימות">
          <DevTasksTab />
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
        {/* <Tab key="AA" title="TEST">
          <MiniDrawer />
        </Tab> */}
      </Tabs>
    </div>
  );
};

export default DevTeam;

{
  /* <div>
                <h2>generateExplanation (js)</h2>
                <Editor
                  height="315px"
                  width="550px"
                  theme="vs-dark"
                  defaultLanguage="javascript"
                  value={explanationCode}
                  onChange={(newValue) => setExplanationCode(newValue)}
                  options={{ minimap: { enabled: false } }}
                />
              </div> */
}
