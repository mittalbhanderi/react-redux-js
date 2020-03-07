var fs = require("fs");

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let totalRows = A.length;
  let totalColumns = A[0].length;
  let routeMap = [];
  let resultLength = totalRows + totalColumns - 1;
  routeMap.push({ rowIndex: 0, colIndex: 0, result: "" });

  let trailFromTop;
  let maxLength = 0;
  let minLength = 0;
  let maxValue = "";

  if (checkAllSame(A, totalRows, totalColumns)) {
    return A[0][0].toString().repeat(resultLength);
  }

  while (maxLength != resultLength) {
    if (
      routeMap.length > 1 &&
      minLength &&
      maxLength &&
      minLength == maxLength
    ) {
      routeMap = routeMap.filter(ele => ele.result == maxValue);
    }

    maxLength = 0;
    minLength = resultLength;

    for (const route of routeMap) {
      trailFromTop = false;
      
      if (routeMap.length > 2 && route.result.length == maxLength) {
        continue;
      }
      for (
        let rowPosition = route.rowIndex;
        rowPosition < totalRows;
        rowPosition++
      ) {
        if (trailFromTop) {
          break;
        }
        route.rowIndex = rowPosition;
        for (
          let colPosition = route.colIndex;
          colPosition < totalColumns;
          colPosition++
        ) {
          route.colIndex = colPosition;
          route.result = route.result + "" + A[rowPosition][colPosition];

          if (
            maxValue < route.result ||
            maxValue.length < route.result.length
          ) {
            maxValue = route.result;
          }

          maxLength = Math.max(maxLength, route.result.length);
          minLength = Math.min(minLength, route.result.length);

          if (rowPosition + 1 < totalRows && colPosition + 1 < totalColumns) {
            if (
              A[rowPosition + 1][colPosition] > A[rowPosition][colPosition + 1]
            ) {
              route.rowIndex = rowPosition + 1;
              trailFromTop = true;
              break;
            }
            if (
              A[rowPosition + 1][colPosition] == A[rowPosition][colPosition + 1]
            ) {
              let validPath = false;
              if (colPosition + 1 < totalColumns) {
                let value = A[rowPosition + 1][colPosition];
                for (let i = rowPosition + 1; i < totalRows; i++) {
                  if (
                    value != A[i][colPosition] ||
                    value != A[i][colPosition + 1]
                  ) {
                    validPath = true;
                    break;
                  }
                }
              } else {
                validPath = true;
              }

              if (
                validPath &&
                routeMap.filter(
                  route =>
                    route.rowIndex == rowPosition + 1 &&
                    route.colIndex == colPosition
                ).length === 0
              ) {
                routeMap.push({
                  rowIndex: rowPosition + 1,
                  colIndex: colPosition,
                  result: route.result
                });
              }
            }
          }

          if (routeMap.length > 1) {
            if (colPosition + 1 < totalColumns) {
              route.colIndex = colPosition + 1;
            } else if (rowPosition + 1 < totalRows) {
              route.rowIndex = rowPosition + 1;
            }
            trailFromTop = true;
            break;
          }
        }
      }
    }
  }

  return maxValue;
}

const checkAllSame = (A, totalRows, totalColumns) => {
  const ref = A[0][0];
  for (let i = 0; i < totalRows; i++) {
    for (let j = 0; j < totalColumns; j++) {
      if (ref != A[i][j]) {
        return false;
      }
    }
  }
  return true;
};


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

A = [
    [9, 9, 7],
    [9, 7, 2],
    [9, 9, 5],
    [9, 1, 2]
]

console.log(solution(A));

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


A = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function populateMatrix(n, m, numbers) {
  for (let i = 0; i < n; i++) {
    A[i] = [];
    for (let j = 0; j < m; j++) {
      A[i][j] = getRandomInt(numbers);
    }
  }
}

const writeArray = (arr, numbers, result) => {
  const file = fs.createWriteStream(`array_${numbers}.txt`);
  file.on("error", function(err) {
    console.error(err);
  });
  file.write("[ \n");
  arr.forEach(function(subArray) {
    file.write("[" + subArray.join(",") + "],\n");
  });
  file.write("]\n");
  file.write(`${result}`);
  file.end();
};

let err = false;

while (!err) {
  for (let i = 8; i > -1; i--) {
    const n = 10000;
    const m = 10000;
    const offset = 100;

    populateMatrix(n, m + offset * (i + 1), i + 1);

    const start = new Date();
    const problemresult = solution(A);

    if (problemresult.length < n + A[0].length - 1) {
      writeArray(A, i + 1, problemresult);
      err = true;
    }

    console.log(
      "Matrix - " +
        n +
        " x " +
        A[0].length +
        ", filled with random number(s) - " +
        (i + 1) +
        ", result length - " +
        problemresult.length
    );
    const end = new Date() - start;

    console.info("Execution time: %dms", end);
  }
}


/*
const readArrayAsync = fileName => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", function(err, data) {
      if (err) {
        console.error("File read failed!", err);
        reject(new Error(`File read failed! ${err}`));
      }
      try {
        resolve(data.split("\n"));
      } catch (err) {
        console.error("Parsing Array failed!", err);
        reject(new Error(`Parsing Array failed! ${err}`));
      }
    });
  });
};

A = [];

readArrayAsync("array_6.txt").then(data => {
  console.log("Reading array complete.. \n Solving ");
  data.map(row => {
    row = row.replace("\r", "");
    if (row.length > 2) {
      A.push(
        row
          .replace("[", "")
          .replace("],", "")
          .replace("]", "")
          .split(",")
          .map(Number)
      );
    }
  });
  const problemresult = solution(A);
  console.log(
    "Matrix - " +
      10000 +
      " x " +
      A[0].length +
      ", filled with random number(s) - " +
      (5 + 1) +
      ", result length - " +
      problemresult.length
  );
});

*/