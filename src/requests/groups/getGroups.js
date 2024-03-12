import { getDatabase, ref, get } from 'firebase/database';

const getGroups = async (app) => {
  try {
    const db = getDatabase(app);
    const groupsRef = ref(db, 'groups');

    const snapshot = await get(groupsRef);
    const rawGroups = snapshot.val() || {};
    const transformedGroups = {};
    for (const key in rawGroups) {
      transformedGroups[key] = Object.values(rawGroups[key]);
    }

    return transformedGroups;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getGroups;
