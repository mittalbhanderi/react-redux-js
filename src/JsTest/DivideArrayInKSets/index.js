/**
 * Given an array of integers nums and a positive integer k, find whether it's
 * possible to divide this array into sets of k consecutive numbers
 * Return True if its possible otherwise return False.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */

function BuggySuperSolution(nums, k) {
  const mem = Array(k).fill(0);
  for (const num of nums) {
      mem[num % k]++;
  }
  const nbSets = nums.length / k;
  return mem.every(e => e === nbSets);
};

function SolutionA(nums, k) {
  if (nums && nums.length > 0 && nums.length % k == 0 && k > 1) {
    let uniqueHash = {};
    for (let num of nums) {
      if (!uniqueHash[num]) {
        uniqueHash[num] = 1;
      } else {
        uniqueHash[num] += 1;
      }
    }
    
    for(let loop = 0; loop < nums.length/k; loop++) {
      for (let item in uniqueHash) {
        for (let i = 0; i < k; i++) {
          let key = parseInt(item) + i;
          if (!uniqueHash[key]) {
            return false;
          } else {
            if (uniqueHash[key] > 1) {
              uniqueHash[key] -= 1;
            } else {
              delete uniqueHash[key];
            }
          }
        }
          break;
      }
      if (Object.keys(uniqueHash).length == 0) {
        return true;
      }
    }
  }

  if (k == 1) {
    return true;
  }
  return false;
}

var isPossibleDivide = function(nums, k) {
  // intial check
  if (nums && nums.length > 0 && nums.length % k == 0 && k > 1) {
    let divides = [];
    nums = nums.sort((a, b) => a - b);
    let dividedArrays = 0;
    for (let num of nums) {
      if (divides.length == 0) {
        divides[0] = [];
        divides[0].push(num);
      } else {
        let numberAccommodated = false;
        for (let arr = 0; arr < divides.length; arr++) {
          let thisArray = divides[arr];
          if (thisArray.length < k) {
            if (num == arr[0] - 1) {
              thisArray.unshift(num);
              numberAccommodated = true;
            } else if (num == thisArray[thisArray.length - 1] + 1) {
              thisArray.push(num);
              numberAccommodated = true;
            }
            if (numberAccommodated) {
              divides[arr] = thisArray;
              if (thisArray.length == k) {
                dividedArrays += 1;
              }
              break;
            }
          }
        }
        if (!numberAccommodated) {
          divides[divides.length] = [];
          divides[divides.length - 1].push(num);
        }
      }
    }
    if (divides.length == dividedArrays) {
      return true;
    }
  }

  return false;
};

let nums; 
let k;

nums = [1,2,3,4,10,15,12,13]
k = 4;
console.log(isPossibleDivide(nums, k));
console.log(BuggySuperSolution(nums, k));

nums = [9,8,18,20,12,13,12,20,14,22,17,19,11,14,8,25,14,11,8,17,23,26,12,6,14,9,20,4,11,3,16,10,8,10,5,22,18,21,18,12,17,17,7,19,24,15,9,22,11,10,2,18,7,23,24,11,21,15,5,18,13,15,26,2,20,8,16,10,27,7,24,6,3,23,9,17,7,9,21,20,15,21,5,13,19,16,12,16,21,16,19,19,15,25,4,14,6,13,13,10];
k = 20;

console.log(BuggySuperSolution(nums, k));
console.log(isPossibleDivide(nums, k));

nums = [1,2,3,4,5,1,2,3,4,5,1,2,3,4]
k = 5

console.log(BuggySuperSolution(nums, k));
console.log(isPossibleDivide(nums, k));

nums = [1, 2, 3, 3, 4, 4, 5, 6];
k = 4;

console.log(BuggySuperSolution(nums, k));
console.log(isPossibleDivide(nums, k));

nums = [3, 2, 1, 2, 3, 4, 3, 4, 5, 9, 10, 11];
k = 3;

console.log(BuggySuperSolution(nums, k));
console.log(isPossibleDivide(nums, k));

nums = [3, 3, 2, 2, 1, 1];
k = 3;

console.log(BuggySuperSolution(nums, k));
console.log(isPossibleDivide(nums, k));
