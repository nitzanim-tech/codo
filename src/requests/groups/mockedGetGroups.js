import codoData from '../../components/Dashboards/CodoData.json';

const mockedGetGroups = async (app, auth) => {
  try {
    return codoData.groups;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export default mockedGetGroups;
