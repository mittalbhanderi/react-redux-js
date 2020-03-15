/**
 *
 * Kadane's Algorithm gets you the maximum sub array with in an array in linear time with time complexity of O(n)
 * The beauty of the algorithm is that the values are calculated in linear time
 * The simple logic behind the algorithm is that if you calculate the sum at the particular index of an array
 * then the maximum value of the subarray is the sum of current index and the sum at the index before.
 * Let's try to put this logic in the method below.
 * 
 */

function SolutionA(A) {
  if (A) {
    switch (A.length) {
      case 0:
        return 0;
      case 1:
        return A[0];
      default:
        let result = A[0];
        let maxSumAtPreviousElement = A[0];
        for (let i = 1; i < A.length; i++) {
            maxSumAtPreviousElement = Math.max(A[i], (A[i] + maxSumAtPreviousElement));
            if(maxSumAtPreviousElement > result) {
                result = maxSumAtPreviousElement;
            }
        }
        return result;
    }
  }
  return 0;
}

let A = [-2,3,2,-1,1,2,3,4,5,6,-1,8,8,7,9,5,-20,8,4,9];

console.log(SolutionA(A));
