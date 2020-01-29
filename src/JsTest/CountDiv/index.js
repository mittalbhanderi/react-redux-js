/*
Write a function:

function solution(A, B, K);

that, given three integers A, B and K, returns the number of integers within the range [A..B] that are divisible by K, i.e.:

{ i : A ≤ i ≤ B, i mod K = 0 }

For example, for A = 6, B = 11 and K = 2, your function should return 3, because there are three numbers divisible by 2 within the range [6..11], namely 6, 8 and 10.

Write an efficient algorithm for the following assumptions:

A and B are integers within the range [0..2,000,000,000];
K is an integer within the range [1..2,000,000,000];
A ≤ B.

*/


function solution(A, B, K) {
  // write your code in JavaScript (Node.js 8.9.4)
    if(A == B) {
      return A%K == 0 ? 1 : 0;
  }

  let result = 0;

  if (A % K == 0) {
      result += 1;
  }

  if(A < K) {
      result += parseInt(B/K)
  } else {
      result += parseInt((B - A)/K)

      if (B % K == 0 && (B - A)%K != 0) {
          result += 1;
      }
  }
  return result;
}

solution(0, 14, 2);
