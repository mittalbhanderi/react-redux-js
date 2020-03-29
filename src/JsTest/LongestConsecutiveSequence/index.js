/**
 * @param {number[]} nums
 * @return {number}
 */

var longestConsecutive = function(nums) {
  if (nums && nums.length > 0) {
    let objPositiveNumbersHash = {};
    let objNegativeNumbersHash = {};
    let hasZero = false;
    let longestSeq = 0;
    let currentSeq = 1;
    let temp;

    nums.forEach(num => {
      if (num > 0) {
        if (!objPositiveNumbersHash[num]) objPositiveNumbersHash[num] = true;
      } else if (num < 0) {
        num = Math.abs(num);
        if (!objNegativeNumbersHash[num]) objNegativeNumbersHash[num] = true;
      } else {
        objNegativeNumbersHash[num] = true;
        hasZero = true;
      }
    });

    let negativeNumbers = Object.keys(objNegativeNumbersHash);

    if (negativeNumbers.length > 0) {
      temp = negativeNumbers[negativeNumbers.length - 1];
      negativeNumbers.pop();
    } else {
      temp = Object.keys(objPositiveNumbersHash)[0];
      delete objPositiveNumbersHash[temp];
    }

    for (let index = negativeNumbers.length - 1; index >= 0; index--) {
        if (parseInt(temp) - 1 != negativeNumbers[index]) {
          if (longestSeq < currentSeq) {
            longestSeq = currentSeq;
          }
          currentSeq = 0;
        }
        temp = negativeNumbers[index];
        currentSeq += 1;
    }

    if (negativeNumbers.length > 0 && !hasZero) {
      if (longestSeq < currentSeq) {
        longestSeq = currentSeq;
      }
      currentSeq = 0;
    }

    Object.keys(objPositiveNumbersHash).forEach(num => {
        if (parseInt(temp) + 1 != num) {
          if (longestSeq < currentSeq) {
            longestSeq = currentSeq;
          }
          currentSeq = 0;
        }
        temp = num;
        currentSeq += 1;
    });

    if (longestSeq < currentSeq) {
      longestSeq = currentSeq;
    }

    return longestSeq;
  }
  return 0;
};

console.log(longestConsecutive([1, -1, 0]));
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));
console.log(longestConsecutive([5, 4, 6, 1, 3, 2]));
console.log(longestConsecutive([-1, 0]));
console.log(longestConsecutive([9,1,4,7,3,-1,0,5,8,-1,6]));
console.log(longestConsecutive([-7,-1,3,-9,-4,7,-3,2,4,9,4,-9,8,-7,5,-1,-7]));
console.log(longestConsecutive([0, 0]));