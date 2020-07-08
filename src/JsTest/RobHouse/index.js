/**
 *  House Robber
 * 
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.

Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
             Total amount you can rob = 2 + 9 + 1 = 12.
 

Constraints:

0 <= nums.length <= 100
0 <= nums[i] <= 400
*/

const { memoize } = require("lodash");

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (!nums || nums.length == 0) {
    return 0;
  }

  if (nums.length == 1) {
    return nums[0];
  }

  var a = nums[0];
  var loot = Math.max(a, nums[1]);

  for (let i = 2; i < nums.length; i++) {
    var temp = loot;
    loot = Math.max(loot, nums[i] + a);
    a = temp;
  }

  return loot;
};

var circularrob = function (nums) {
  if (!nums || nums.length == 0) {
    return 0;
  }

  switch (nums.length) {
    case 1:
      return nums[0];

    case 2:
      return Math.max(nums[0], nums[1]);

    case 3:
      return Math.max(nums[0], nums[1], nums[2]);

    default:
      var getLoot = function (a, b, c, d) {
        var loot = Math.max(a, b);

        for (let i = c; i < d; i++) {
          var temp = loot;
          loot = Math.max(loot, nums[i] + a);
          a = temp;
        }
        return loot;
      };

      var first_loot = getLoot(nums[0], nums[1], 2, nums.length - 1),
          last_loot = getLoot(nums[1], nums[2], 3, nums.length);

      return Math.max(first_loot, last_loot);
  }
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var treerob = function(root) {
  var memo = {};

  var robFromRoot = function(root) {
    if (memo[root]) {
      return memo[root];
    }
    if (root == null) {
      return 0;
    }
    var loot = Math.max(root.val + robChidren(root.left) + robChildren(root.right), 
                        robFromRoot(root.left) + robFromRoot(root.right));
    memo[root] = loot;
    return loot;
  }

  var robChildren = function(root) {
   if (root == null) {
      return 0;
    }
    if (memo[root]) {
      return memo[root];
    }
    var left_loot = 0, right_loot = 0;
    if(root.left) {
      left_loot = robFromRoot(root.left);
    }
    if(root.right) {
      right_loot = robFromRoot(root.right);
    }
    memo[root] = left_loot + right_loot;

    return memo[root];
  }

  return robFromRoot(root, 0);

}