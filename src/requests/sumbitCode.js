import { getDatabase, ref, get, set, update } from 'firebase/database';
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

const sumbitCode = async ({ user, app, code, task }) => {
  const db = getDatabase(app);
  const submissionsRef = ref(db, `users/${user.uid}/submissions`);

  try {
    const snapshot = await get(submissionsRef);
    const submissions = snapshot.val() || {};

    if (submissions.hasOwnProperty(task)) {
      const newSubmission = { code: code, date: new Date().toISOString(), pass: true };
      submissions[task].trials.push(newSubmission);
    } else {
      submissions[task] = {
        trials: [{ code: code, date: new Date().toISOString(), pass: true }],
      };
    }

    await update(submissionsRef, submissions);

    console.log('Data saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

export default sumbitCode;
