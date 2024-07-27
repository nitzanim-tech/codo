import { getDatabase, ref, get } from 'firebase/database';

import firebaseConfig from '../../util/firebaseConfig';
// TODO: REVIEW WITH NUMBER
const getGroups = async (app) => {
  // try {
  //   const apiUrl = firebaseConfig.apiUrl;
  //   const response = await fetch(`${apiUrl}/regions`);
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const transformedGroups = await response.json();
  //   console.log(transformedGroups);
  //   // return transformedGroups;
  // } catch (error) {
  //   console.error('Error getting data:', error);
  //   return [];
  // }
  try {
    const db = getDatabase(app);
    const groupsRef = ref(db, 'groups');

    const snapshot = await get(groupsRef);
    const rawGroups = snapshot.val() || {};
    const transformedGroups = {};
    for (const key in rawGroups) {
      transformedGroups[key] = Object.values(rawGroups[key]);
    }
    console.log(transformedGroups);
    return transformedGroups;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getGroups;
