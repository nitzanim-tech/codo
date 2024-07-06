export default function levenshteinDistance(s1, s2) {
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
}
