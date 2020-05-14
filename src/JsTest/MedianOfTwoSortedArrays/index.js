/**
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume nums1 and nums2 cannot be both empty.

Example 1:

nums1 = [1, 3]
nums2 = [2]

The median is 2.0
Example 2:

nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5

 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

 /**
  * Approach:
  * Find the median of the combined array in O(log(n+m)) time
  * Find Median index - mD
  * Start with the middle of first array lets call it m1
  * Start with the middle of the second array at m2 = mD - m1 or 0
  * compare the values and increase or decrease m1
  */
var findMedianSortedArrays = function(nums1, nums2) {
  if (nums2.length > nums1.length) {
    return findMedianSortedArrays(nums2, nums1);
  }
  const totalLength = nums1.length + nums2.length;
  const totalEven = (totalLength / 2) % 2 == 0;
  const median = totalEven ? totalLength / 2 - 1 : Math.floor(totalLength / 2);
  let i = Math.floor(
    totalLength / 2 > nums1.length / 2 ? nums1.length / 2 : totalLength / 2
  );
  let j = Math.floor(
    totalLength / 2 > nums2.length / 2 ? nums2.length / 2 : totalLength / 2
  );

  while (i + j <= median) {
    switch (totalLength) {
      case 0:
        return 0;

      case 1:
        return nums1[i] || nums2[j];

      case 2:
        return nums1[i] && nums2[j]
          ? (nums1[i] + nums2[j]) / 2
          : nums1[i]
          ? (nums1[i] + nums1[i + 1]) / 2
          : nums2[i] + nums2[i + 1];

      case 3:
        return nums1[i] && nums2[j]
          ? nums1[i] >= nums2[j]
            ? Math.max(nums1[i - 1], nums2[j])
            : nums1[i]
          : nums1[i] || nums2[j];

      default:
        if (i == 0) {
          return totalEven ? (nums1[i] + nums2[j]) / 2 : nums1[i];
        } else if (j == 0) {
          return totalEven
            ? (nums1[i] + nums2[j]) / 2
            : Math.min(nums1[i], nums2[j]);
        } else {
          if (
            nums1[i] < nums2[j + 1] &&
            nums1[i] > nums2[j - 1] &&
            nums2[j] < nums1[i + 1] &&
            nums2[j] > nums1[i - 1]
          ) {
            return totalEven
              ? (nums1[i] + nums2[j]) / 2
              : Math.min(nums1[i], nums2[j]);
          }
          if (nums1[i - 1] > nums2[j]) {
            i--;
          }
          if (nums2[j + 1] && nums2[j + 1] < nums1[i]) {
            j++;
          }
          if (nums2[j - 1] > nums1[i]) {
            j--;
          }
          if (nums1[i + 1] && nums1[i + 1] < nums2[j]) {
            i--;
          }
        }
    }
  }
};

let nums1;
let nums2;

nums1 = [1, 2];
nums2 = [-2, -1];

//console.log(findMedianSortedArrays(nums1, nums2));

nums2 = [2];
nums1 = [3, 4];

//console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [1, 2];
nums2 = [3, 4];

//console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [3, 7, 9, 15, 18, 21, 25];
nums2 = [4, 6, 8, 10, 11, 18];
//console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [1, 3, 8, 9, 15];
nums2 = [7, 11, 18, 19, 21, 25];
console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [1, 3, 5, 7, 9];
nums2 = [2, 4, 6, 8, 10];
//console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [1, 2, 3, 4];
nums2 = [1, 2, 3, 4];
//console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [1, 2, 3, 4, 8, 9, 11];
nums2 = [1, 2, 3, 4, 5, 6, 7];
//console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [];
nums2 = [2, 3];
//console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [4, 5, 6];
nums2 = [];
//console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [1, 2];
nums2 = [-1, 3];
//console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [1, 3];
nums2 = [2, 4];
//console.log(findMedianSortedArrays(nums1, nums2));

nums1 = [1, 4];
nums2 = [2, 3];
//console.log(findMedianSortedArrays(nums1, nums2));
