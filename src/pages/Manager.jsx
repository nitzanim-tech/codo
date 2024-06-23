import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import getGroupsByRegion from '../requests/groups/getGroupsByRegion';
import getStudentsByGroup from '../requests/getStudents';
import { CircularProgress } from '@nextui-org/react';
import { useFirebase } from '../util/FirebaseProvider';
import ChooseGroups from '../components/Manager/ChooseGroups';
import GeneralDataGraph from '../components/Manager/GeneralDataGraph';

function Manager() {
  const { app, isAuthorized, userData } = useFirebase();
  const [groupsIndex, setGroupIndex] = useState(null);
  const [regions, setRegions] = useState([]);
  const [choosenRegion, setChoosenRegion] = useState(null);
  const [choosenGroups, setChoosenGroups] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [regionsFromDb] = await Promise.all([getGroupsByRegion(app)]);
      const index = makeNameIdIndex(regionsFromDb);
      setGroupIndex(index);
      setRegions(regionsFromDb);
    };
    if (isAuthorized) fetchData();
  }, [isAuthorized, app]);

  const makeNameIdIndex = (regionsFromDb) => {
    return regionsFromDb.reduce((acc, region) => {
      acc[region.id] = region.name;
      region.groups.forEach((group) => {
        acc[group.id] = group.name;
      });
      return acc;
    }, {});
  };

  const fetchStudents = async () => {
    if (choosenGroups.length > 0) {
      let data = [];
      console.log({ choosenGroups });
      for (const groupId of choosenGroups) {
        let groupData = await getStudentsByGroup({ app, groupId });
        groupData = groupData.filter((student) => !student.email.includes('@nitzanim.tech'));
        data = data.concat(groupData);
      }
      setStudents(data);
    }
  };

  return (
    <>
      <NavBar />
      {!isAuthorized ? (
        <h1>הכניסה למנהלים בלבד</h1>
      ) : regions && groupsIndex ? (
        <>
          <ChooseGroups
            regions={regions}
            choosenRegion={choosenRegion}
            setChoosenRegion={setChoosenRegion}
            choosenGroups={choosenGroups}
            setChoosenGroups={setChoosenGroups}
            fetchStudents={fetchStudents}
          />
          <p>HELLO WORD!</p>
          {students && <GeneralDataGraph students={students} />}
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default Manager;
