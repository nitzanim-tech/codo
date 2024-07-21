import codoData from '../components/Dashboards/CodoData.json';

const getStudentsByGroupMock = async ({ groupId }) => {
  try {
    const students = codoData.users || {};

    let filteredStudents;
    if (groupId && groupId !== 'all') {
      filteredStudents = Object.entries(students).filter(([uid, student]) => student.group === groupId);
    } else {
      filteredStudents = Object.entries(students);
    }

    const studentArray = filteredStudents.map(([uid, student]) => {
      return { ...student, uid };
    });

    return studentArray;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default getStudentsByGroupMock;
