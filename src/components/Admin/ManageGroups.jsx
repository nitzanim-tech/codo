import React, { useState, useMemo } from 'react';
import { useAsyncList } from '@react-stately/data';
import { Button, Spinner, Input, Select, SelectItem } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

import getRequest from '../../requests/anew/getRequest';

const ManageGroups = () => {
  const [filterValue, setFilterValue] = useState('');
  const [selectedSyllabus, setSelectedSyllabus] = useState('');

  const list = useAsyncList({
    async load({ signal }) {
      const groups = await getRequest({ getUrl: 'getGroupsTable', authMethod: 'jwt', signal });
      console.log({ groups });
      return {
        items: groups,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];

          if (sortDescriptor.column === 'lastUpdate') {
            first = first ? new Date(first) : new Date(0);
            second = second ? new Date(second) : new Date(0);
          }

          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const transformedData = useMemo(() => transformData(list.items), [list.items]);

  const regions = Array.from(new Set(list.items.map((group) => group.region_name)));
  const syllabi = Array.from(new Set(list.items.map((group) => group.syllabus_name)));

  const onGroupClick = (group) => {
    window.location.href = `./dev/editGroup/${group.id}`;
  };

  const filteredData = useMemo(() => {
    return Object.keys(transformedData).reduce((acc, region) => {
      if (!selectedSyllabus || region === selectedSyllabus) {
        acc[region] = Object.keys(transformedData[region]).reduce((subAcc, syllabus) => {
          if (
            transformedData[region][syllabus].some((group) =>
              group.name.toLowerCase().includes(filterValue.toLowerCase()),
            )
          ) {
            subAcc[syllabus] = transformedData[region][syllabus].filter((group) =>
              group.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
          }
          return subAcc;
        }, {});
      }
      return acc;
    }, {});
  }, [transformedData, filterValue, selectedSyllabus]);

  return (
    <>
      <div className="flex gap-4 mb-4 w-7/10 mx-auto" style={{ width: '70%' }}>
        <Select
          placeholder="Select Region"
          selectedKeys={selectedSyllabus}
          value={selectedSyllabus}
          onChange={(value) => setSelectedSyllabus(value.target.value)}
        >
          <SelectItem key="">All Regions</SelectItem>
          {syllabi.map((region) => (
            <SelectItem key={region}>{region}</SelectItem>
          ))}
        </Select>
        <Button onClick={() => (window.location.href = './dev/newGroup')}>Add new syllabus</Button>
      </div>
      <Table aria-label="Groups Table">
        <TableHeader>
          {regions.map((region) => (
            <TableColumn key={region}>{region}</TableColumn>
          ))}
          <TableColumn key="syllabus">Syllabus</TableColumn>
        </TableHeader>
        <TableBody>
          {syllabi.map((syllabus) => (
            <TableRow key={syllabus}>
              {regions.map((region) => (
                <TableCell key={region}>
                  {filteredData[region] &&
                    filteredData[region][syllabus] &&
                    filteredData[region][syllabus].map((group) => (
                      <div key={group.id}>
                        <Button
                          variant="light"
                          radius="full"
                          onClick={() => onGroupClick(group)}
                          color={group.isDefault && 'primary'}
                        >
                          {/* <EditRoundedIcon style={{ color: '#005395' }} /> */}
                          {group.name}
                        </Button>
                      </div>
                    ))}
                  <Button variant="light" radius="full" isIconOnly onClick={() => onGroupClick(group)}>
                    +{' '}
                  </Button>
                </TableCell>
              ))}
              <TableCell>{syllabus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ManageGroups;

const transformData = (groups) => {
  const result = {};

  groups.forEach((group) => {
    const { region_name, syllabus_name } = group;
    if (!result[region_name]) {
      result[region_name] = {};
    }
    if (!result[region_name][syllabus_name]) {
      result[region_name][syllabus_name] = [];
    }
    result[region_name][syllabus_name].push(group);
  });

  return result;
};
