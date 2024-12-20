const calculateWorkingTime = (sessions) => {
  const aggrSession = sessions.find((session) => session.type === 'aggr');
  let totalTimeInMinutes = aggrSession ? aggrSession.workingTime : 0;
  let startTime = aggrSession ? new Date(aggrSession.time) : null;


  for (let session of sessions) {
    if (session.type === 'start' || session.type === 'userActive') {
      startTime = new Date(session.time);
    } else if (session.type === 'run' && startTime) {
      const runTime = new Date(session.time);
      totalTimeInMinutes += (runTime - startTime) / (1000 * 60);
      startTime = runTime;
    } else if ((session.type === 'end' || session.type === 'noActivity') && startTime) {
      const endTime = new Date(session.time);
      totalTimeInMinutes += (endTime - startTime) / (1000 * 60);
      startTime = null;
    }
  }

  return Math.round(totalTimeInMinutes * 100) / 100;
};

const updateLocalStorageLogs = (log, task) => {
  const logsKey = `${task}-logs`;
  if (!log.dist) log['dist'] = calculateDist(task);

  const existingLogs = JSON.parse(localStorage.getItem(logsKey)) || [];
  const updatedLogs = [...existingLogs, log];
  localStorage.setItem(logsKey, JSON.stringify(updatedLogs));
};

const calculateDist = (task) => {
  const lastCode = localStorage.getItem(`${task}-lastCode`) || '';
  const code = localStorage.getItem(`${task}-code`) || '';
  localStorage.setItem(`${task}-lastCode`, code);
  return levenshteinDistance(code, lastCode);
};

const agrigateLocalStorageLogs = (task) => {
  const logsKey = `${task}-logs`;
  const existingLogs = JSON.parse(localStorage.getItem(logsKey)) || [];
  const workingTime = calculateWorkingTime(existingLogs);
  const updatedLog = [{ type: 'aggr', workingTime, time: new Date().toISOString() }];
  localStorage.setItem(logsKey, JSON.stringify(updatedLog));
};

const levenshteinDistance = (s1, s2) => {
  const lenS1 = s1.length;
  const lenS2 = s2.length;

  const dp = Array.from(Array(lenS1 + 1), () => Array(lenS2 + 1).fill(0));

  for (let i = 0; i <= lenS1; i++) dp[i][0] = i;
  for (let j = 0; j <= lenS2; j++) dp[0][j] = j;

  for (let i = 1; i <= lenS1; i++) {
    for (let j = 1; j <= lenS2; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[lenS1][lenS2];
};

export { calculateWorkingTime, updateLocalStorageLogs, calculateDist, agrigateLocalStorageLogs };
