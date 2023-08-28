import { push } from 'firebase/database';
import { getDatabase, ref, set } from 'firebase/database';

import { onValue } from 'firebase/database';
const printUserCode = ({ uid, app }) => {
  const db = getDatabase(app);
  const userRef = ref(db, `users/${uid}/submissions`);

  onValue(userRef, (snapshot) => {
    const submissions = snapshot.val();
    if (submissions) {
      Object.values(submissions).forEach((submission) => {
        console.log(submission.data[0].code);
      });
    }
  });
};

const sumbitCode = ({ user, app, code }) => {
  const db = getDatabase(app);
  const newUserRef = push(ref(db, `users/${user.uid}/submissions`));
  set(newUserRef, { task: 'task', data: [{ code: code, date: new Date().toISOString(), pass: true }] })
    .then(() => {
      console.log('Data saved successfully');
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
};

export default sumbitCode;
