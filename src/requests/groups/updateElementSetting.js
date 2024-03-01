import { getDatabase, ref, set } from 'firebase/database';

const updateElementSetting = async ({ app, groupId, changes, originalSetting }) => {
  try {
    const db = getDatabase(app);
    const updates = {};

    for (const [id, change] of Object.entries(changes)) {
      const elementId = id.split('-')[1]; 
      const mergedSetting = { ...originalSetting[elementId], ...change }; 
      updates[elementId] = mergedSetting; 
    }

    await Promise.all(
      Object.entries(updates).map(([elementId, setting]) =>
        set(ref(db, `groups/${groupId}/elements/${elementId}`), setting),
      ),
    );

    console.log('Element settings updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating element settings:', error);
    return false;
  }
};

export default updateElementSetting;
