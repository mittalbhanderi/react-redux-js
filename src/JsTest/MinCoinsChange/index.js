/**
 * So, given a list of coins the algorithm below finds the minimum 
 * number of coins required to make the given balance.
 * Program below only works if the minimum coin adds to the final balance. 
 * It does not work if only one kind of coin is required to make the sum.
 * 
 * @param {typeof Number} cents
 * @param {typeof Object} balance
 */
function min_coins(cents, balance) {
  if (!balance || !cents) {
    return 0;
  }

  var totalBalance = Object.keys(balance).reduce((acc, key) => {
    return acc + Number(key) * Number(balance[Number(key)]);
  }, 0);

  if (cents > totalBalance) {
    return 0;
  }

  let change = [];
  change[0] = 0;

  for (let i = 1; i <= cents; i++) {
    let tally = cents;
    Object.keys(balance).forEach(key => {
      change[i] = tally;
      let x = parseInt(i / Number(key));
      if (x != 0) {
        tally = Math.min(tally, x + (change[cents - (x * Number(key))] || 0));
      }
    });
    change[i] = tally;
  }

  return change[cents];
}

let cents = 70;
let balance = { 25: 5, 10: 3, 1: 5 };

console.log(min_coins(cents, balance));
