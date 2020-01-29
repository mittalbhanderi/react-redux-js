function findLargestNoString(arr)
  {

    var i = 0, j = 0, pathToGo = null;
    var result = ''+ arr[i][j];

    var rowLen = arr.length;
    var colLen = arr[0].length;

    var notDone = true;

    if(colLen > 1) {
      while(notDone) {
        if(arr[i][j+1] > arr[i+1][j]) {
          j = j+1;
          result = result + arr[i][j];
        }
        else if(arr[i+1][j] > arr[i][j+1]) {
          i = i+1;
          result = result + arr[i][j];
        }
        else {
          result = result + arr[i][j+1];
          pathToGo = getWhichPathToGo(arr, i+1, j+1, rowLen, colLen);
          i = pathToGo[0];
          j = pathToGo[1];
        }

        if(i == (rowLen-1) && j == (colLen-1)) {
          result = result + arr[i][j];
          notDone = false;
        }
        else if(i == (rowLen-1)) {
          for(var l = j+1; l < colLen; l++) {
            result = result + arr[i][l];
          }
          notDone = false;
        }
        else if(j == (colLen-1)) {
          for(var k = i+1; k < rowLen; k++) {
             result = result + arr[k][j];
          }
          notDone = false;
        }
      }
    }
    else {
      for(var k = i+1; k < rowLen; k++) {
         result = result + arr[k][j];
      }
    }

    return result;

    function getWhichPathToGo(arr, i, j, rowLen, colLen)
    {
        var k = (j-1), res = [];
        var m = i; //i+1;
        var n = j; //j+1;
        if(m == (rowLen-1) && n == (colLen-1)) {
          res.push(m);
          res.push(n);
          return res;
        }
        else if(m == (rowLen-1)) {
          res.push(m-1);
          res.push(n);
          return res;
        }
        else if(n == (colLen-1)) {
          res.push(m);
          res.push(n-1);
          return res;
        }

        if(arr[m+1][k] > arr[k][n+1]) {
          res.push(m);
          res.push(k);
          return res;
        }
        else if(arr[m+1][k] < arr[k][n+1]) {
          res.push(k);
          res.push(n);
          return res;
        }
        else {
          getWhichPathToGo(arr, m+1, n+1, rowLen, colLen);
        }
    }

  }


  A =   [
    [2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2],
    ]


console.log(findLargestNoString(A));
