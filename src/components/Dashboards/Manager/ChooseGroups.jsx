import React from 'react';
import { Select, SelectItem, Button } from '@nextui-org/react';

const ChooseGroups = ({ regions, choosenRegion, setChoosenRegion, choosenGroups, setChoosenGroups, fetchStudents }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width:'75%' }}>
      <Button color="primary" variant="light" radius="full" onClick={fetchStudents}>
        יאללה סע
      </Button>
      <Select
        label="קבוצה"
        selectionMode="multiple"
        variant="bordered"
        selectedKeys={new Set(choosenGroups)}
        onSelectionChange={(keys) => {
          setChoosenGroups(Array.from(keys));
        }}
        // dir="rtl"
        disabled={!choosenRegion}
        scrollShadowProps={{
          isEnabled: false,
        }}
      >
        {choosenRegion &&
          regions
            .find((region) => region.id === choosenRegion)
            ?.groups.map((group) => (
              <SelectItem key={group.id} value={group.id} dir="rtl">
                {group.name}
              </SelectItem>
            ))}
      </Select>
      <Select
        label=" מרחב"
        variant="bordered"
        selectedKeys={choosenRegion ? new Set([choosenRegion]) : new Set()}
        onSelectionChange={(keys) => {
          const selectedRegion = Array.from(keys)[0];
          setChoosenRegion(selectedRegion);
          setChoosenGroups([]);
        }}
        scrollShadowProps={{
          isEnabled: false,
        }}
        // dir="rtl"
      >
        {regions &&
          regions.map((region) => (
            <SelectItem key={region.id} value={region.id} dir="rtl">
              {region.name}
            </SelectItem>
          ))}
      </Select>
    </div>
  );
};

export default ChooseGroups;
