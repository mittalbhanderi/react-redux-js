/**
 * Beautiful program to find maximum profit doing K number of transactions.
 * You can hold only one share at a time.
 */

 // Time complexity - O(nk)
 // Space complexity - O(nk)
function SolutionA(A, k) {
  if (A && A.length > 1) {
    let profit = [];

    for (let column = 0; column <= k; column++) {
      profit[column] = [];
      for (let row = 0; row < A.length; row++) {
        profit[column][row] = 0;
      }
    }

    for (let transaction = 1; transaction <= k; transaction++) {
      maxThusFar = Number.NEGATIVE_INFINITY;
      for (let d = 1; d < A.length; d++) {
        maxThusFar = Math.max(
          maxThusFar,
          profit[transaction - 1][d - 1] - A[d - 1]
        );
        profit[transaction][d] = Math.max(
          profit[transaction][d - 1],
          A[d] + maxThusFar
        );
      }
    }
    return profit[k][A.length - 1];
  }
}

 // Time complexity - O(nk)
 // Space complexity - O(n)
function SolutionB(A, k) {
  if (A && A.length > 1) {
    let oddTransaction = [];
    let evenTransaction = [];

    for (let row = 0; row < A.length; row++) {
      oddTransaction[row] = 0;
      evenTransaction[row] = 0;
    }

    for (let transaction = 1; transaction <= k; transaction++) {
      let currentTransaction;
      let previousTransaction;

      if (transaction % 2 == 0) {
        currentTransaction = evenTransaction;
        previousTransaction = oddTransaction;
      } else {
        currentTransaction = oddTransaction;
        previousTransaction = evenTransaction;
      }

      maxThusFar = Number.NEGATIVE_INFINITY;
      for (let d = 1; d < A.length; d++) {
        maxThusFar = Math.max(
          maxThusFar,
          previousTransaction[d - 1] - A[d - 1]
        );
        currentTransaction[d] = Math.max(
          currentTransaction[d - 1],
          A[d] + maxThusFar
        );
      }
    }

    return k % 2 == 0
      ? evenTransaction[A.length - 1]
      : oddTransaction[A.length - 1];
  }
}

let A = [5, 11, 3, 50, 60, 90];
let K = 3;

A = [5, 2, 4, 0, 1];
K = 2;

console.log(SolutionB(A, K));
