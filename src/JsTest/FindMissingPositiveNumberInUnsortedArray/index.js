/**
 * @param {number[]} nums
 * @return {number}
 */

 function SolutionA(nums) {
    const hashMap = nums.reduce((acc, cur) => {
        acc[cur] = cur
        return acc
      }, {})
      
      let i = 1
      while (i <= nums.length) {
        if (!hashMap[i]) return i
        ++i
      }
      return i
 }

var firstMissingPositive = function(nums) {
  if (nums && nums.length > 0) {
    let objHash = {};
    let min = Number.MAX_SAFE_INTEGER;
    let max = 0;
    nums.forEach(n => {
      if (n >= 0) {
        objHash[n] = true;
        min = n < min ? n : min;
        max = n > max ? n : max;
      }
    });
    if (max + 1 - min == Object.keys(objHash).length) {
      return min == 1 ? max + 1 : 1;
    }
    for (
      let positiveInteger = min;
      positiveInteger <= nums.length;
      positiveInteger++
    ) {
      if (!objHash[positiveInteger]) {
        return positiveInteger;
      }
    }
  }
  return 1;
};

/**
 * [1,2,0]

[7,8,9,11,12]
 */
console.log(SolutionA([7,8,9,11,12]));
