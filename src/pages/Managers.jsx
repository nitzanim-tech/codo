import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import getInsts from '../requests/manager/getInsts';
import getCurrentUser from '../requests/getCurrentUser';
import getGroups from '../requests/getGroups';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../util/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Table, TableHeader, TableRow, TableCell, TableBody, TableColumn } from '@nextui-org/react';
import { CircularProgress, Chip, Button } from '@nextui-org/react';

import addPermissionToUser from '../requests/manager/addPermission';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function Managers() {
  const [groups, setGroups] = useState(null);
  const [instructorsData, setInstructorsData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [unauthorized, setUnauthorized] = useState(true);
  const autocompleteRef = useRef();

  onAuthStateChanged(auth, async (user) => {
    try {
      if (!currentUser) {
        const [groupsFromDB, current] = await Promise.all([getGroups(app), getCurrentUser({ app, id: user.uid })]);
        setGroups(groupsFromDB);
        setCurrentUser(current);
      }

      user.email.includes('@nitzanim.tech') ? setUnauthorized(false) : setUnauthorized(true);
    } catch {
      setCurrentUser({ email: '' });
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInsts({ app });
      setInstructorsData(data);
    };
    if (!unauthorized) fetchData();
  }, [unauthorized]);

  return (
    <>
      <NavBar isShowTask={false} />
      {currentUser && instructorsData ? (
        <>
          {unauthorized ? (
            <h1>הכניסה למנהלים בלבד</h1>
          ) : (
            <>
              <Autocomplete
                label="קבוצה להוספה"
                aria-label="Select permission group"
                className="max-w-xs"
                size="sm"
                ref={autocompleteRef}
              >
                {Object.values(groups).map((district) =>
                  district.map((group) => (
                    <AutocompleteItem variant="flat" key={group}>
                      {group}
                    </AutocompleteItem>
                  )),
                )}
                {Object.keys(groups).map((district) => (
                  <AutocompleteItem variant="flat" key={district} color={'danger'}>
                    <p style={{ color: '#BF1E2E' }}>{district}</p>
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              <Table aria-label="Intstructors table">
                <TableHeader>
                  <TableColumn>Email</TableColumn>
                  <TableColumn>Group</TableColumn>
                  <TableColumn>Manager</TableColumn>
                  <TableColumn>Last Name</TableColumn>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Region</TableColumn>
                  <TableColumn>Permissions</TableColumn>
                </TableHeader>
                <TableBody>
                  {instructorsData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.group}</TableCell>
                      <TableCell>{student.is_manager ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{student.lastName}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.region}</TableCell>
                      <TableCell style={{ maxWidth: '200px' }}>
                        {student.permissions && (
                          <>
                            {student.permissions.map((permission) => (
                              <Chip variant="flat" key={permission} onClose={() => console.log('h')}>
                                {permission}
                              </Chip>
                            ))}
                          </>
                        )}

                        <Button
                          radius="full"
                          isIconOnly
                          variant="flat"
                          color="success"
                          size="sm"
                          onClick={async () => {
                            const newPermission = autocompleteRef.current.value;
                            if (newPermission) {
                              const haveAdded = addPermissionToUser({
                                app: app,
                                userId: student.id,
                                permission: newPermission,
                              });
                              if (haveAdded) student.permissions.push(newPermission);
                            }
                          }}
                        >
                          +
                        </Button>
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
