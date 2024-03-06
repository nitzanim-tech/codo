import { getDatabase, ref, set } from 'firebase/database';

const updateElementSetting = async ({ app, groupId, changes, originalSetting }) => {
  try {
    const db = getDatabase(app);
    const updates = {};
    for (const [id, change] of Object.entries(changes)) {
      const [lessonId, elementId] = id.split('-');
      if (originalSetting[lessonId] && originalSetting[lessonId].elements[elementId]) {
        updates[elementId] = { ...originalSetting[lessonId].elements[elementId]?.setting };
        for (const [key, value] of Object.entries(change)) {
          updates[elementId][key] = value;
        }
      } else {
        console.warn(`Original setting not found for elementId: ${elementId} and lessonId: ${lessonId}`);
        updates[elementId] = change;
      }
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
