
function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let totalRows = A.length;
  let totalColumns = A[0].length;
  let routeMap = [];
  let resultLength = totalRows + totalColumns - 1;
  routeMap.push({ rowIndex: 0, colIndex: 0, result: "" });
  let trailFromTop;
  let maxLength = 0; let minLength = 0; let maxvalue = ''; let index;

  if(checkAllSame(A, totalRows, totalColumns)) {
    return A[0][0].toString().repeat(resultLength);
  }

  while (maxLength != resultLength) {

    if(routeMap.length > 1 && minLength && maxLength && minLength == maxLength) {
        routeMap = routeMap.filter(ele => ele.result == maxvalue);
    }

    maxLength = 0;
    minLength = resultLength;

    for (index = 0; index < routeMap.length; index++) {
      trailFromTop = false;
      if(routeMap.length > 2 && routeMap[index].result.length == maxLength) {
        continue;
      }
      for (let rowPosition = routeMap[index].rowIndex; rowPosition < totalRows; rowPosition++) {
        if(trailFromTop) {
          break;
        }
        routeMap[index].rowIndex = rowPosition;
        for (let colPosition = routeMap[index].colIndex; colPosition < totalColumns; colPosition++) {
          routeMap[index].colIndex = colPosition;
          routeMap[index].result = routeMap[index].result + '' + A[rowPosition][colPosition];

          if(maxLength < routeMap[index].result.length) {
            maxLength = routeMap[index].result.length
          }

          if(minLength > routeMap[index].result.length) {
            minLength = routeMap[index].result.length
          }

          if(maxvalue < routeMap[index].result) {
            maxvalue = routeMap[index].result
          }

          if (rowPosition + 1 < totalRows && colPosition + 1 < totalColumns) {

            if (A[rowPosition + 1][colPosition] > A[rowPosition][colPosition + 1]) {
              routeMap[index].rowIndex = rowPosition + 1;
              trailFromTop = true;
              break;
            }
            if (A[rowPosition + 1][colPosition] == A[rowPosition][colPosition + 1]) {
              let validPath = false;
              if(colPosition + 1 < totalColumns) {
                let value = A[rowPosition + 1][colPosition];
                for(let i = rowPosition + 1; i < totalRows; i++) {
                  if(value != A[i][colPosition] || value != A[i][colPosition+1]){
                    validPath = true;
                    break;
                  }
                }
              } else {
                validPath = true;
              }

               if(validPath && routeMap.filter(route => route.rowIndex == (rowPosition + 1) && route.colIndex == colPosition).length === 0) {
                routeMap.push({rowIndex: rowPosition + 1, colIndex: colPosition, result: routeMap[index].result});
              }
            }
          }

          if(routeMap.length > 1)  {
            if(colPosition + 1 < totalColumns) {
            routeMap[index].colIndex = colPosition + 1;
            } else if (rowPosition + 1 < totalRows) {
              routeMap[index].rowIndex = rowPosition + 1;
            }
            trailFromTop = true;
            break;
          }
        }

      }
    }
  }

  return maxvalue;
}

const checkAllSame = (A, totalRows, totalColumns) => {
  const ref = A[0][0];
  for(let i = 0; i < totalRows; i++) {
    for(let j = 0; j < totalColumns; j++) {
      if(ref != A[i][j]){
        return false;
      }
    }
  }
  return true;
}


A = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]
console.log(solution(A));

// A = [
//     [9, 9, 7],
//     [9, 7, 2],
//     [9, 9, 5],
//     [9, 1, 2]
// ]

// const problemresult = solution(A)

A =   [
      [1, 1, 1, 4, 8, 7] ,
      [9, 1, 8, 1, 8, 7] ,
      [9, 1, 8, 1, 8, 7] ,
      [9, 1, 8, 1, 8, 7] ,
      [1, 1, 8, 1, 8, 7] ,
      [9, 1, 1, 1, 1, 7]
      ]

console.log(solution(A));

//const problemresult = SolveSum(A)


A = []

function populateMatrix(n, m, numbers) {
  for(let i=0; i < n; i++) {
    A[i] = []
    for(let j=0; j < m; j++) {
      A[i][j] = numbers == 1 ? numbers : getRandomInt(numbers) + 1
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


for(let i = 8; i > -1; i--) {

  const n = 10000
  const m = 10000
  const offset = 100;

  populateMatrix(n, m + (offset * (i + 1)), i);

  const start = new Date();
  const problemresult = solution(A)
  console.log('Matrix - ' + n + ' x ' + A[0].length + ', filled with random number(s) - ' + (i + 1) + ', result length - ' + problemresult.length);
  const end = new Date() - start;

  console.info('Execution time: %dms', end)
}


