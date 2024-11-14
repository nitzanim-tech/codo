import React, { useState, useMemo, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { CircularProgress, Chip, Button, Select, SelectItem, Input } from '@nextui-org/react';
import { useFirebase } from '../util/FirebaseProvider';
import getRequest from '../requests/anew/getRequest';
import postRequest from '../requests/anew/postRequest';

import { Unauthorized } from '../components/General/Messages';

function Admin() {
  const { userData } = useFirebase();
  const [groupsPerm, setGroupsPerm] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [instructorsData, setInstructorsData] = useState([]);
  const [instructorsList, setInstructorsList] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [filterText, setFilterText] = useState('');

  const list = useMemo(() => {
    return {
      items: instructorsData,
      sort: (column, direction) => {
        const sortedItems = [...instructorsData].sort((a, b) => {
          const first = a[column];
          const second = b[column];
          let cmp = first < second ? -1 : 1;
          if (direction === 'descending') cmp *= -1;
          return cmp;
        });
        setInstructorsData(sortedItems);
      },
    };
  }, [instructorsData]);

  const filteredItems = useMemo(() => {
    return list.items
      .filter((user) => !selectedRegion || user.regionName === selectedRegion)
      .filter((user) => {
        const userName = user?.groupName?.toLowerCase() || '';
        return userName.includes(filterValue.toLowerCase());
      });
  }, [list.items, filterValue, selectedRegion]);

  const handleSort = (key) => {
    const direction = list.sortDescriptor?.direction === 'ascending' ? 'descending' : 'ascending';
    list.sort(key, direction);
  };

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const syllabusId = 'c03157b3b4d4';
        const data = await getRequest({
          getUrl: `getInstGroupsPerm?syllabusId=${syllabusId}`,
          authMethod: 'jwt',
        });

        setInstructorsData(data.groups);
        setGroupsPerm([...new Set(data.groups.map((item) => item.regionName))]);
        setInstructorsList(data.instructorsList);
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };

    userData && userData.permission > 1 && fetchInstructorData();
  }, [userData]);

  const addPermission = async (instId) => {
    const object = { instructorId: instId, groupId: selectedGroup, action: 'add' };
    const success = await postRequest({ postUrl: `postInstructorGroup`, authMethod: 'jwt', object });
    console.log(success);
  };

  return (
    <>
      <div className={`main-content`}>
        {userData?.permission < 2 ? (
          <Unauthorized text="הכניסה למנהלים בלבד" />
        ) : instructorsData ? (
          <>
            <div style={{ width: showSidebar ? '70%' : '100%', padding: '1%' }}>
              <div className="flex gap-4 mb-4 w-7/10 mx-auto">
                <Select
                  label="מרחב"
                  placeholder="בחר מרחב"
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  value={selectedRegion}
                  className="max-w-xs"
                >
                  <SelectItem value="">הכל</SelectItem>
                  {groupsPerm.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  isClearable
                  placeholder="שם הקבוצה"
                  value={filterValue}
                  onClear={() => setFilterValue('')}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              </div>

              <Table aria-label="Instructors Table with Sorting">
                <TableHeader>
                  <TableColumn key="instructors" allowsSorting onClick={() => handleSort('instructors')}>
                    מדריכים
                  </TableColumn>
                  <TableColumn key="groupName" allowsSorting onClick={() => handleSort('groupName')}>
                    קבוצה
                  </TableColumn>
                  <TableColumn key="regionName" allowsSorting onClick={() => handleSort('regionName')}>
                    מרחב
                  </TableColumn>
                </TableHeader>

                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.groupId}>
                      <TableCell width={'60%'} dir="rtl">
                        {item.instructors.map((instructor) => (
                          <Chip key={instructor.userId} variant="flat" color="primary">
                            {instructor.userName}
                          </Chip>
                        ))}
                        <Button
                          radius="full"
                          isIconOnly
                          variant="flat"
                          color="success"
                          size="sm"
                          onClick={() => {
                            setShowSidebar(true);
                            setSelectedGroup(item.groupId);
                          }}
                        >
                          +
                        </Button>
                      </TableCell>
                      <TableCell>{item.groupName}</TableCell>
                      <TableCell>{item.regionName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        )}
      </div>

      {showSidebar && (
        <div className="sidebar" style={{ width: '30%', padding: '2%' }}>
          <Button isIconOnly onClick={() => setShowSidebar(false)}>
            X
          </Button>
          <h1> {filteredItems.find((group) => group.groupId === selectedGroup).groupName}</h1>
          <div style={{ margin: '20px 0px 20px 0px' }}>
            <Input
              type="text"
              placeholder="שם המדריך"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              direction: 'rtl',
              height: '60vh',
              overflowX: 'auto',
            }}
          >
            {instructorsList
              .filter((inst) => inst.name.toLowerCase().includes(filterText.toLowerCase()))
              .map((inst) => (
                <Chip
                  onClick={() => addPermission(inst.id)}
                  key={inst.id}
                  variant="flat"
                  color={
                    filteredItems
                      .find((group) => group.groupId === selectedGroup)
                      ?.instructors.some((instructor) => instructor.userId === inst.id)
                      ? 'primary'
                      : 'default'
                  }
                  style={{
                    cursor:'pointer',
                    padding: '10px',
                    // flex: '1 1 calc(33.33% - 10px)',
                    textAlign: 'center',
                  }}
                >
                  {inst.name}
                </Chip>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
