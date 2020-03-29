/**
 * Given n non-negative integers representing an elevation map where the width of each bar is 1, 
 * compute how much water it is able to trap after raining.
 * Example:
        Input: [0,1,0,2,1,0,1,3,2,1,2,1]
        Output: 6
 */

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let result = 0;
  if (height.length > 2) {
    let left_max = height[0];
    let right_max = { index: -1, value: -1 };
    let right_max_found;
    let temp;
    for (let index = 1; index < height.length - 1; index++) {
      if (right_max.index <= index || right_max.value < height[index]) {
        right_max_found = false;
        temp = index + 1;
        right_max.value = -1;
        while (temp < height.length) {
          if (height[temp] >= right_max.value && height[index] < height[temp]) {
            right_max.index = temp;
            right_max.value = height[right_max.index];
            right_max_found = true;
          }
          temp += 1;
        }
        if (!right_max_found) {
          left_max = Math.max(left_max, height[index]);
          continue;
        }
      }
      if (height[index] < left_max) {
        result += Math.min(left_max, right_max.value) - height[index];
      } else {
        left_max = height[index];
      }
    }
  }
  return result;
};

let h;

h = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
//console.log(trap(h));

h = [4, 2, 0, 3, 2, 5];

h = [5, 4, 1, 2];

h = [5, 5, 1, 7, 1, 1, 5, 2, 7, 6];

h = [0, 7, 1, 4, 6];

h = [4,3,3,9,3,0,9,2,8,3];

console.log(trap(h));
