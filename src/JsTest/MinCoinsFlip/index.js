function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  if(A.length > 1) {
      let coinsFlippedZero = 0;
      let coinsFlippedOne = 0;

      let coinStateZero = 0;
      let coinStateOne = 1;
      let temp;

      for(let coinIndex = 0; coinIndex < A.length; coinIndex++) {
          if(A[coinIndex] !== coinStateZero) {
              coinsFlippedZero++;
          }
          if(A[coinIndex] !== coinStateOne) {
            coinsFlippedOne++;
        }
          temp = coinStateOne;
          coinStateOne = coinStateZero;
          coinStateZero = temp;
      }

      return coinsFlippedZero > coinsFlippedOne ? coinsFlippedOne : coinsFlippedZero;
  }

  return 0;
}

console.log(solution([1, 1, 0, 1, 1]))
console.log(solution([0, 1, 0, 1, 1]))
console.log(solution([1, 0, 0, 1, 1]))
console.log(solution([1, 1, 0, 1, 0]))
console.log(solution([1, 0, 0, 1, 0]))
console.log(solution([1, 0, 1, 0, 1, 0]))
