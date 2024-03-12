import { getDatabase, ref, get } from 'firebase/database';

const getGroupsByRegion = async (app) => {
  try {
    const db = getDatabase(app);
    const groupsRef = ref(db, 'groups');
    const regionsRef = ref(db, 'regions');
    const [groupsSnapshot, regionsSnapshot] = await Promise.all([get(groupsRef), get(regionsRef)]);
    const rawGroups = groupsSnapshot.val() || {};
    const regionsData = regionsSnapshot.val() || {};

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

export default getGroupsByRegion;
