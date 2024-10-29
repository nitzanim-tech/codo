import DevTasksTab from '../components/Dev/DevTasksTab';
import AvatarDropdown from '../components/NavBar/AvatarDropdown';
import { useFirebase } from '../util/FirebaseProvider';

const DevTeam = () => {
  const { userData } = useFirebase();

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
            <p style={{ fontSize: '24px' }}>Login:</p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AvatarDropdown />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DevTeam;

