

/* class a  {
    constructor(x){
    this.x = x;
    }
    getX() {
        return this.x;
    }
}

class b extends a {
    constructor(x, y) {
        super(x)
        this.y = y
    }

    getY() {
        return this.y;
    }
}

const newB = new b('x', 'y');

console.log(newB.getX());
console.log(newB.getY());


const c = function(x) {
    this.x = x;
    getX: () => {
        return this.x;
    }
}

const d = function(x, y) {
    c.call(this, x);
    this.y = y
    getY: () => {
        return this.y;
    }
    getX: () => {
        return c.getX()
    }
}

const dObj = new d('xd', 'yd')

//console.log(dObj.getX())
console.log(dObj);

const a1 = [1,2,4,5,6];
const b2 = [2,3,4,5,6,7,10];

const combined = a1.concat(b2);

console.log(combined);

function findMissingElement(arry) {
    let arrayHash = new Object();

    A.forEach(element => {
        arrayHash[element] = true;
    });

    for(let i= 1; i <= A.length ; i++) {
        if(!arrayHash[i]) {
            return i;
        }
    }
}

console.log(findMissingElement([2,3,4,5,6,7,8,1,10]))

// const arr = [5,210, 15, 21];

// for(let i= 0; i < arr.length; i++) {
//     setTimeout(() => {
//         console.log('Index: ' + i + ' , element ' + arr[i]);
//     }, arr[i]);
// }

function findLastKid(n, k, i) {
    if ((k + i) > n) {
        let re = k % n;
        console.log('Last Kid is: ' + re);
    } else {
        console.log('Last Kid is: ' + (k + i));
    }

}

findLastKid(3, 5, 1);
findLastKid(3, 1, 3);

const till = {
    cent: 37, //1
    nickel: 74, //5
    dime: 17, // 10
    quarter: 96, //25
    dollar: 30 //100
}

// $27.37

const standardCurrency = {
    dollar: 100,
    quarter: 25,
    dime: 10,
    nickel: 5,
    cent: 1
}

const returnValues = (amount) => {
    let amountInCents = amount * 100;
    const amountToReturn = {};
    let balance;

    for (let amount in standardCurrency){
        balance  = parseInt(amountInCents/standardCurrency[amount]);
        if(balance > till[amount]){
            amountInCents = amountInCents - (till[amount] * standardCurrency[amount]);
            amountToReturn[amount] = till[amount]
            till[amount] = 0;
        } else {
            amountInCents = amountInCents - (balance * standardCurrency[amount]);
            till[amount]= till[amount] - balance
            amountToReturn[amount] = balance
        }

        if(amountInCents === 0) {
            break;
        }
    }
    console.log('Given amount is: $' + amount)
    console.log({...amountToReturn});
    console.log('Outstanding till balance is: ');
    console.log({...till});
    if(amountInCents > 0) {
        console.log('You still have $' + amountInCents/100 + ' to return')
    }
}

returnValues(27.37)


function solveProblem(inputArray) {
  let solution = [...inputArray];
  let firstPass;
  if (inputArray.length > 2) {
    for (let i = 0; i < inputArray.length; i++) {
      firstPass = true;
      for (let j = 0; j < inputArray.length; j++) {
        if (i !== j) {
          if (inputArray[j] > 0 && Number(inputArray[j])) {
            if (firstPass) {
              solution[i] = inputArray[j];
              firstPass = false;
            } else {
              solution[i] = solution[i] * inputArray[j];
            }
          } else {
            return inputArray;
          }
        }
      }
    }
  }
  return solution;
}

console.log(solveProblem([3, 2, 1, 5, "ab"]));

function SumAddsUpInArray(inputArray, sum) {
  let hashCheck = {};
  for (let i = 0; i < inputArray.length; i++) {
    if (sum === inputArray[i]) {
      return true;
    }
    if (hashCheck[inputArray[i]]) {
      return true;
    } else {
      hashCheck[sum - inputArray[i]] = true;
    }
  }
  return false;
}

console.log(SumAddsUpInArray([10, 15, 3, 7], 11));

function findSmallestMissingNumber(A) {
  if (!A || A.length == 0) {
    throw "Invalid input";
  }

  const n = A.length;
  let temp = 0;

  for (let i = 0; i < n - 1; i++) {
    temp = A[i];
    while (temp < n && A[temp] !== temp) {
      arr;
    }
  }
}

function solution(N) {
    // write your code in JavaScript (Node.js 8.9.4)
    if(Number(N)) {
        const binaryNumber = (+N).toString(2);
        let temp = 0;
        let longestBinaryGap = 0;
        for(let i = 0; i < binaryNumber.length; i++) {
            if(binaryNumber.charAt(i) === '0') {
                temp += 1;
            } else {
                if(temp > longestBinaryGap) {
                    longestBinaryGap = temp;
                    console.log('longest binary gap is' + longestBinaryGap);
                }
                temp = 0;
                if(longestBinaryGap >= (binaryNumber.length - i)) {
                    break;
                }
            }
        }

        return longestBinaryGap;

    }
}

console.log(solution(2147483647));
*/

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

let routesCounter = 0;

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let totalRows = A.length;
  let totalColumns = A[0].length;
  let routeMap = [];
  let resultLength = totalRows + totalColumns - 1;
  routeMap.push({ rowIndex: 0, colIndex: 0, result: "" });
  let trailFromTop;
  let maxLength; let minLength; let maxvalue; let index;
  let differentNumbers = [];


  for(let i=0; i<totalRows; i++) {
    for (let j= 0; j < totalColumns; j++) {
      if(!differentNumbers.includes(A[i][j])){
        differentNumbers.push(A[i][j])
      }
    }
  }
  if(differentNumbers.length == 1) {
    let result = differentNumbers[0] + '';
    return result.repeat(resultLength);
  }



  while (routeMap[routeMap.length - 1].result.length != resultLength) {
    if(routeMap.length > 1 && minLength && maxLength && minLength == maxLength) {
        routeMap = routeMap.filter(ele => ele.result == maxvalue);
    }
    maxLength = 0;
    minLength = resultLength;
    maxvalue = '';
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
               if(routeMap.filter(route => route.rowIndex == (rowPosition + 1) && route.colIndex == colPosition && route.result == routeMap[index].result).length === 0) {
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

      // if(routeMap.length > 0){
      //   routeMap = routeMap.filter(ele => ele.result == maxvalue);
      // }
      //completedRoutes++;

      // if (routeMap.length > 1) {
      //     routeMap = routeMap.filter(function(ele, pos) {
      //         return pos == 0 || ele.result.length < resultLength || routeMap[0].result < ele.result;
      //     })

      //   minLength = totalRows + totalColumns;

      //   for (let i = 0; i < routeMap.length; i++) {
      //     if (minLength > routeMap[i].result.length) {
      //       minLength = routeMap[i].result.length;
      //     }
      //   }

      //   let currentValues = [];
      //   let maxValue = '';
      //   for (let i = 0; i < routeMap.length; i++) {
      //     currentValues[i] = routeMap[i].result.substr(0, minLength);
      //     routeMap[i].maxValue = currentValues[i];
      //     if(maxValue < routeMap[i].maxValue) {
      //         maxValue = routeMap[i].maxValue;
      //     }
      //   }

      //   //let maxValue = Math.max.apply(Math, currentValues);
      //   routeMap = routeMap.filter(ele => ele.maxValue == maxValue);
      // }
    }
  }

  // if (routeMap.length > 1) {
  //   let maxValue = '';
  //   for (let i = 0; i < routeMap.length; i++) {
  //     if(maxValue < routeMap[i].result) {
  //         maxValue = routeMap[i].result;
  //     }
  //   }
  //   result = maxValue;
  // } else {
  //   result = routeMap[0].result
  // }

  return routeMap[0].result;
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

A = [
    [9, 9, 7],
    [9, 7, 2],
    [9, 9, 5],
    [9, 1, 2]
]


A = []

function populateMatrix(n) {
  for(let i=0; i < n; i++) {
    A[i] = []
    for(let j=0; j < n; j++) {
      A[i][j] = getRandomInt(5) + 1
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

populateMatrix(10000);

const start = new Date();

console.log(solution(A));

const end = new Date() - start;

console.info('Execution time: %dms', end)
