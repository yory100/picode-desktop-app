function editDistance(word1, word2) {
  const len = word1.length;
  const len2 = word2.length;
  let dp = [];

  for (let i = 0; i < len + 1; i++) {
    dp[i] = [];
    for (let j = 0; j < len2 + 1; j++) {
      /* base case: empty strings */
      if (i === 0) dp[i][j] = j;
      else if (j === 0) dp[i][j] = i;
      /* test if last characters of the strings match */ 
      else if (
        word1[i - 1] === word2[j - 1]
      ) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[len][len2];
}

console.log(editDistance("hello", "hello")); // 4
console.log(editDistance("hello", "helol")); // 4
console.log(editDistance("hello", "sssss")); // 4