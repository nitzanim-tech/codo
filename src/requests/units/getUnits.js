import { getDatabase, ref, set, get } from 'firebase/database';

const getUnitsBySyllabus = async ({ app, syllabusId }) => {
  const db = getDatabase(app);
  const unitsRef = ref(db, 'units');

  try {
    const snapshot = await get(unitsRef);
    let units = snapshot.val() || {};
    if (syllabusId) {
      units = Object.entries(units)
        .filter(([key, unit]) => unit.syllabus === syllabusId)
        .reduce((acc, [key, unit]) => {
          acc[key] = unit;
          return acc;
        }, {});
    }
    return units;
  } catch (error) {
    console.error('Error fetching units by syllabus:', error);
    return {};
  }
};

export { getUnitsBySyllabus };
