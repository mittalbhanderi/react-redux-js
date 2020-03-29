var sortArray = function(nums) {
    if (nums.length > 0) {
      let temp;
      for (let index = 0; index < nums.length; index++) {
        if (index + 1 != nums[index]) {
          temp = nums[nums[index] - 1];
          nums[nums[index] - 1] = nums[index];
          nums[index] = temp;
        }
      }
      return nums;
    }
    return [];
  };
  
  console.log(sortArray([2,5,3,6,4,1,9,8,7]));
  