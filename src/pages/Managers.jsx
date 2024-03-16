import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar/NavigateBar';
import getInsts from '../requests/manager/getInsts';
import { getGroupsDictionary } from '../requests/groups/getGroupsByRegion';
import { Table, TableHeader, TableRow, TableCell, TableBody, TableColumn } from '@nextui-org/react';
import { CircularProgress, Chip, Button } from '@nextui-org/react';

import addPermissionToUser from '../requests/manager/addPermission';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useFirebase } from '../util/FirebaseProvider';

function Managers() {
  const { app, isAuthorized } = useFirebase();
  const [groupsDict, setGroupsDict] = useState(null);
  const [instructorsData, setInstructorsData] = useState(null);
  const autocompleteRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const [instFromDb, dict] = await Promise.all([getInsts({ app }), getGroupsDictionary(app)]);
      setGroupsDict(dict);
      setInstructorsData(instFromDb);
    };
    if (isAuthorized) fetchData();
  }, [isAuthorized]);

  const findIdByName = (name) => {
    for (const [id, groupName] of Object.entries(groupsDict)) {
      if (groupName === name) {
        return id;
      }
    }
  };

  return (
    <>
      <NavBar />
      {!isAuthorized ? (
        <h1>הכניסה למנהלים בלבד</h1>
      ) : instructorsData && groupsDict ? (
        <>
          <Autocomplete
            label="קבוצה להוספה"
            aria-label="Select permission group"
            className="max-w-xs"
            size="sm"
            ref={autocompleteRef}
          >
            {Object.entries(groupsDict).map(([id, name]) => (
              <AutocompleteItem variant="flat" key={id}>
                {name}
              </AutocompleteItem>
            ))}

            {/* {Object.keys(regions).map((district) => (
              <AutocompleteItem variant="flat" key={district} color={'danger'}>
                <p style={{ color: '#BF1E2E' }}>{district.name}</p>
              </AutocompleteItem>
            ))} */}
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
              {instructorsData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{groupsDict[user.group]}</TableCell>
                  <TableCell>{user.is_manager ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{groupsDict[user.region]}</TableCell>
                  <TableCell style={{ maxWidth: '200px' }}>
                    {user.permissions && (
                      <>
                        {user.permissions.map((permission) => (
                          <Chip
                            variant="flat"
                            key={permission}
                            onClose={() => console.log('h')}
                            color={permission == 'all' ? 'primary' : 'default'}
                          >
                            {groupsDict[permission] || permission}
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
                            userId: user.id,
                            permission: findIdByName(newPermission),
                          });
                          if (haveAdded) {
                            const updatedPermissions = [...user.permissions, newPermission];
                            const updatedInstructorsData = instructorsData.map((inst) =>
                              inst.id === user.id ? { ...inst, permissions: updatedPermissions } : inst,
                            );
                            setInstructorsData(updatedInstructorsData);
                          }
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
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default Managers;
