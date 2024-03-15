import { getDatabase, ref, get } from 'firebase/database';

const getGroupsList = async ({ app }) => {
  const db = getDatabase(app);
  const groupsRef = ref(db, 'groups');

  try {
    const snapshot = await get(groupsRef);
    const groups = snapshot.val();

    if (groups) {
      const groupsList = Object.entries(groups).map(([id, group]) => ({ id, name: group.name }));
      groupsList.push({ id: 'all', name: 'all' });
      return groupsList;
    } else {
      console.error('No groups found');
      return [];
    }
  } catch (error) {
    console.error('Error getting groups:', error);
    return [];
  }
};

const getCurrentUser = async ({ app, id }) => {
  const db = getDatabase(app);
  const userRef = ref(db, `users/${id}`);

  try {
    const [snapshot, groupsList] = await Promise.all([get(userRef), getGroupsList({ app })]);

    const user = snapshot.val();

    if (user) {
      user.id = id;

      if (user.group) {
        const group = groupsList.find((group) => group.id === user.group);
        if (group) {
          user.group = group;
        }
      }

      if (user.permissions) {
        user.permissions = user.permissions.map((permissionId) => {
          const permission = groupsList.find((group) => group.id === permissionId);
          return permission || { id: permissionId, name: null };
        });
      }

      return user;
    } else {
      console.error('No user found with the given id:', id);
      return null;
    }
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

export { getCurrentUser, getGroupsList };
