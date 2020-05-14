function findLongestSubseq(s1, s2) {
  if (s1.length == 0 || s2.length == 0) {
    return "";
  }

  if (s2.length < s1.length) {
    return findLongestSubseq(s2, s1);
  }

  var aS1 = [...s1];
  var result = [];

  for (let aI1 = 0; aI1 < aS1.length; aI1++) {
    var temp = [];
    var idx = 0;
    var idx2 = 0
    while (
      aI1 + idx < aS1.length ||
      result.length < temp.length + (aS1.length - idx)
    ) {
      let nextCharIdx = s2.indexOf(aS1[aI1 + idx], idx2);
      if (nextCharIdx != -1) {
        temp.push(aS1[aI1 + idx]);
        idx2 += (nextCharIdx || 1);
      } 
        idx++;
    }

    if (temp.length > result.length) {
      result = temp;
    }

    if (result.length > aS1.length - aI1) {
      break;
    }
  }

  return result.join("");
}

//console.log(findLongestSubseq("ABAZDC", "BACBAD"));
console.log(findLongestSubseq("AGGTAB", "GTXTXAYB"));
// console.log(findLongestSubseq("", "GTXXAYB"));
// console.log(findLongestSubseq("ABBA", "ABCABA"));
