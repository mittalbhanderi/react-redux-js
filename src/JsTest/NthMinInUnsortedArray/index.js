const fs = require("fs");
const EventEmitter = require("events");

class WithTime extends EventEmitter {
  execute(func, ...args) {
    console.time("execute");
    this.emit("begin");
    let val = func(...args);
    this.emit("data", val);
    console.timeEnd("execute");
    this.emit("end");
  }

  executeAsync(asyncFunc, ...args) {
    console.time("execute");
    this.emit("begin");
    asyncFunc((err, data) => {
      if (err) {
        this.emit("error", err);
      }
      this.emit("data", data);
      console.timeEnd("execute");
      this.emit("end");
    });
  }
}

/**
 *
 * @param {int} arr
 * @param {int} n
 * a
 * [2,4,6,7,8, 9,19, 10]
 */
function getNthMin(arr, n) {
  var minIndexedArray = [];
  var min = 0,
    max = arr.length - 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[0]) {
      minIndexedArray[min] = arr[i];
      min++;
    } else {
      minIndexedArray[max] = arr[i];
      max--;
    }
  }
  let m = min + 1;
  if (n > m) {
    minIndexedArray.splice(0, m);
    return getNthMin(minIndexedArray, n - m);
  } else if (n < m) {
    minIndexedArray.splice(m - 1, arr.length - (m - 1));
    return getNthMin(minIndexedArray, n);
  } else {
    return arr[0];
  }
}

function SolutionA(arr, n) {
  let m = -1;
  while (n != m) {
    var minArry = [];
    var maxArry = [];
    arr.map((ele) => {
      if (ele < arr[0]) {
        minArry.push(ele);
      } else if (ele > arr[0]) {
        maxArry.push(ele);
      }
    });
    m = minArry.length + 1;
    if (n > m) {
      arr = maxArry;
      n = n - m;
      m = -1;
    } else if (n < m) {
      arr = minArry;
    }
  }
  return arr[0];
}

var a = [9, 2, 4, 6, 19, 0, 10, 7, 8];

var withTime = new WithTime();
withTime.on("begin", () => console.log("getNthMinTime begin"));
withTime.on("end", () => console.log("getNthMinTime end"));
withTime.on("data", (data) => console.log(data));

withTime.execute(getNthMin, a, 4);

withTime = new WithTime();

withTime.on("begin", () => console.log("SolutionA begin"));
withTime.on("end", () => console.log("SolutionA end"));
withTime.on("data", (data) => console.log(data));

withTime.execute(SolutionA, a, 4);

// console.log(SolutionA(a, 1) == getNthMin(a, 1));
// console.log(SolutionA(a, 2) == getNthMin(a, 2));
// console.log(SolutionA(a, 3) == getNthMin(a, 3));
// console.log(SolutionA(a, 4) == getNthMin(a, 4));
// console.log(SolutionA(a, 5) == getNthMin(a, 5));
// console.log(SolutionA(a, 6) == getNthMin(a, 6));
// console.log(SolutionA(a, 7) == getNthMin(a, 7));
// console.log(SolutionA(a, 8) == getNthMin(a, 8));
// console.log(SolutionA(a, 9) == getNthMin(a, 9));
