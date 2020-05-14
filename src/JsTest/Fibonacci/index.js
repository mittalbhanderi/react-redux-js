var memoize = require("memoizee");

  // const fibonacci = function(n) {
  //   if (n === 0) {
  //     return 0;
  //   } else if (n === 1) {
  //     return 1;
  //   } else {
  //     return memoized(n - 1) + memoized(n-2)
  //     // let current = 0,
  //     //       next = 1,
  //     //       total;
  //     // for (let i = 0; i < n - 1; i++) {
  //     //   total = current + next;
  //     //   current = next;
  //     //   next = total;
  //     // }
  //     // return total;
  //   }
  // }


  var yourself = {
    fibonacci : function(n) {
        if (n == 0) {
            return 0;
        } else if (n == 1) {
            return 1;
        } else {
            return memoized(n - 1) +
            memoized(n - 2);
        }
    },
};

const memoized = memoize(yourself.fibonacci)

console.log(yourself.fibonacci(680));
