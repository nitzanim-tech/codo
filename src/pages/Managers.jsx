import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import getInsts from '../requests/manager/getInsts';
import getCurrentUser from '../requests/getCurrentUser';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../util/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Table, TableHeader, TableRow, TableCell, TableBody, TableColumn } from '@nextui-org/react';
import { CircularProgress, Chip, Button } from '@nextui-org/react';

import addPermissionToUser from '../requests/manager/addPermission';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

const groups = {
  'נגב מזרחי': ['דימונה', 'ירוחם', 'רמת נגב', 'באר שבע'],
  'נגב מערבי': ['אשכול', 'מרחבים - אופקים', 'נתיבות בנות', 'נתיבות מעורב', 'שער הנגב', 'מבואות הנגב'],
  'נגב צפוני': ['שקמה', 'כפר סילבר', 'אשקלון'],
  מרכז: ['אשדוד', 'קריית גת', 'בת ים', 'רמלה'],
  'גליל והעמקים וגליל מערבי': ['קצרין', 'טבריה', 'בית שאן', 'עמק הירדן', 'עפולה', 'נהלל', 'ימין אורד'],
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function Managers() {
  const [isLoading, setIsLoading] = useState(true);
  const [studentsRawData, setStudentsRawData] = useState(null);
  const [userGroup, setUserGroup] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [unauthorized, setUnauthorized] = useState(true);

  onAuthStateChanged(auth, async (user) => {
    try {
      if (!currentUser) {
        const current = await getCurrentUser({ app, id: user.uid });
        setCurrentUser(current);
        setUserGroup(current.group);
      }
      user.email.includes('@nitzanim.tech') ? setUnauthorized(false) : setUnauthorized(true);
    } catch {
      setCurrentUser({ email: '' });
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      let data = await getInsts({ app });
      console.log(data);
    //   addPermissionToUser({ app: app, userId: 'kTqDi3pSI5NkUW21FbJF6sxDm3D3', permission: 'ירוחם' });
      setStudentsRawData(data);
      setIsLoading(false);
    };

    if (userGroup.length > 0) fetchData();
  }, [userGroup]);

  return (
    <>
      <NavBar isShowTask={false} />
      {currentUser && studentsRawData ? (
        <>
          {unauthorized ? (
            <h1>הכניסה למדריכים בלבד</h1>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableColumn>Email</TableColumn>
                  <TableColumn>Group</TableColumn>
                  <TableColumn>Is Manager</TableColumn>
                  <TableColumn>Last Name</TableColumn>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Region</TableColumn>
                  <TableColumn>Permissions</TableColumn>
                </TableHeader>
                <TableBody>
                  {studentsRawData.map((student) => (
                    <TableRow key={student.email}>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.group}</TableCell>
                      <TableCell>{student.is_manager ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{student.lastName}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.region}</TableCell>
                      <TableCell>
                        {student.permissions && (
                          <>
                            {student.permissions.map((permission) => (
                              <Chip variant="flat" onClose={() => handleClose(fruit)}>
                                {permission}
                              </Chip>
                            ))}
                          </>
                        )}

                        <Autocomplete label="קבוצה להוספה" className="max-w-xs" style={{ maxWidth: '200px' }}>
                          {Object.values(groups).map((district) =>
                            district.map((group) => (
                              <AutocompleteItem variant="flat" key={group}>
                                {group}
                              </AutocompleteItem>
                            )),
                          )}
                          {Object.keys(groups).map((district) => (
                            <AutocompleteItem variant="flat" key={district} color={'danger'}>
                              <p style={{ color: '#003061' }}>{district}</p>
                            </AutocompleteItem>
                          ))}
                        </Autocomplete>
                        <Button color="success">+</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default Managers;
