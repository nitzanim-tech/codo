import codoData from '../../components/Dashboards/CodoData.json';

const mockedGetGroupsByRegion = async (app) => {
  try {
    const rawGroups = codoData.groups;
    const regionsData = codoData.regions;

    const regions = {};

    for (const key in rawGroups) {
      const group = rawGroups[key];
      const groupId = key;
      const groupName = group.name;
      const groupRegion = group.region;

      if (!regions[groupRegion]) {
        regions[groupRegion] = {
          id: groupRegion,
          name: regionsData[groupRegion],
          groups: [],
        };
      }

      regions[groupRegion].groups.push({
        id: groupId,
        name: groupName,
      });
    }

    const result = Object.values(regions);

    return result;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default mockedGetGroupsByRegion;
