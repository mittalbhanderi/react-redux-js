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

var findMedianSortedArrays = function(nums1, nums2) {
    const returnMedian = arr => {
      return arr.length % 2 == 0
        ? (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2
        : arr[Math.floor(arr.length / 2)];
    };
    if (nums1.length == 0 || nums2.length == 0) {
      return nums1.length != 0 ? returnMedian(nums1) : returnMedian(nums2);
    } else if (nums1.length == 1 && nums2.length == 1) {
      return (nums1[0] + nums2[0]) / 2;
    } else if (nums1.length == 1 || nums2.length == 1) {
      if (nums1.length == 1) {
        nums2.splice(
          nums1[0] - nums2[0] < 0 ? 0 : nums1[0] - nums2[0],
          0,
          ...nums1
        );
        return returnMedian(nums2);
      } else {
        nums1.splice(
          nums2[0] - nums1[0] < 0 ? 0 : nums2[0] - nums1[0],
          0,
          ...nums2
        );
        return returnMedian(nums1);
      }
    } else if (nums1.length == 2 || nums2.length == 2) {
        return returnMedian([...nums1, ...nums2].sort());
    }
    let pointer1 = Math.floor(
      Math.min((nums1.length + nums2.length + 1) / 2, nums1.length / 2)
    );
    let pointer2 = Math.floor(
      Math.min((nums1.length + nums2.length + 1) / 2, nums2.length / 2)
    );
  
    while (
      !(pointer1 == 0 || pointer1 == nums1.length) &&
      !(pointer2 == 0 || pointer2 == nums2.length)
    ) {
      if (
        nums1[pointer1] <= (nums2[pointer2 + 1] || nums2[pointer2]) &&
        nums1[pointer1] >= (nums2[pointer2 - 1] || nums2[pointer2]) &&
        nums2[pointer2] <= (nums1[pointer1 + 1] || nums1[pointer1]) &&
        nums2[pointer2] >= (nums1[pointer1 - 1] || nums1[pointer1])
      ) {
        return (nums1.length + nums2.length) % 2 == 0
          ? pointer1 + pointer2 >= (nums1.length + nums2.length) / 2
            ? (nums1[pointer1] + nums1[pointer1 - 1]) / 2
            : (nums1[pointer1] + nums2[pointer2]) / 2
          : pointer1 + pointer2 >= (nums1.length + nums2.length - 1) / 2
          ? Math.min(nums1[pointer1], nums2[pointer2])
          : Math.max(nums1[pointer1], nums2[pointer2]);
      }
      if (nums1[pointer1] > (nums2[pointer2 + 1] || nums2[pointer2])) {
        pointer1 = Math.max(0, pointer1 - 1);
      } else if (nums1[pointer1] < nums2[pointer2]) {
        pointer1 = Math.min(nums1.length - 1, pointer1 + 1);
      }
  
      if (nums2[pointer2] > (nums1[pointer1 + 1] || nums1[pointer1])) {
        pointer2 = Math.max(0, pointer2 - 1);
      } else if (nums2[pointer2] < nums1[pointer1]) {
        pointer2 = Math.min(nums2.length - 1, pointer2 + 1);
      }
    }
    if (
      (nums1.length + nums2.length) % 2 == 0 &&
      nums1[pointer1] < 0 &&
      nums2[pointer2] > 0
    ) {
      return (nums2[pointer2] + nums2[pointer2 - 1]) / 2;
    } else if (
      (nums1.length + nums2.length) % 2 == 0 &&
      nums1[pointer1] > 0 &&
      nums2[pointer2] < 0
    ) {
      return (nums1[pointer1] + nums1[pointer1 - 1]) / 2;
    }
    return (nums1.length + nums2.length) % 2 == 0
      ? pointer1 + pointer2 >= (nums1.length + nums2.length) / 2
        ? (nums1[pointer1] + nums1[pointer1 - 1]) / 2
        : (nums1[pointer1] + nums2[pointer2]) / 2
      : pointer1 + pointer2 >= (nums1.length + nums2.length - 1) / 2
      ? Math.min(nums1[pointer1], nums2[pointer2])
      : Math.max(nums1[pointer1], nums2[pointer2]);
  };
  
  let nums1;
  let nums2;
  
  // nums1 = [1];
  // nums2 = [2];
  
  // console.log(findMedianSortedArrays(nums1, nums2));
  
  // nums2 = [2];
  // nums1 = [3, 4];
  
  // console.log(findMedianSortedArrays(nums1, nums2));
  
  nums1 = [1, 2];
  nums2 = [3, 4];
  
  //console.log(findMedianSortedArrays(nums1, nums2));
  
  nums1 = [3, 7, 9, 15, 18, 21, 25];
  nums2 = [4, 6, 8, 10, 11, 18];
  //console.log(findMedianSortedArrays(nums1, nums2));
  
  nums1 = [1, 3, 8, 9, 15];
  nums2 = [7, 11, 18, 19, 21, 25];
  //console.log(findMedianSortedArrays(nums1, nums2));
  
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

  nums1 =[1,2,6]
  nums2 = [3,4,5]
  console.log(findMedianSortedArrays(nums1, nums2));
  