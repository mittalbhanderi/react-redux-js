// const fs = require('fs')
// const http = require('http')
// const file = './test.mp4'

// http.createServer((req, res) => {
//   res.writeHeader(200, { 'Content-Type': 'video/mp4'});
//   fs.createReadStream(file)
//     .pipe(res)
//     .on('error', console.error);
// }).listen(3001, () => console.log('running on port 3001'));

const cpus = require('os').cpus()
const cluster = require('cluster')
const http = require('http')
const { createWriteStream } = require('fs')

const writeStream = new createWriteStream('./file.txt')

process.stdin.pipe(writeStream)

/*
console.log(cpus)
if (cluster.isMaster) {
  for (let i = 0; i < cpus.length; i++) {
    cluster.fork()
  }

  console.log('this is the master process', process.pid)
  cluster.on('exit', worker => {
    console.log('worker with processid ' + process.pid + ' has died')
    console.log(
      `only ${Object.keys(cluster.workers).length} processes remaining`
    )
    cluster.fork()
  })
} else {
  http
    .createServer((req, res) => {
      if (req.url === '/kill') {
        let message = `Ending worker process id is ${process.pid}`
        res.end(message)
        process.exit()
      } else {
        let message = `Current worker process id is ${process.pid}`
        res.end(message)
      }
    }, console.log('Server started on port 3000'))
    .listen(3000)
}

query("SELECT clientId FROM clients WHERE clientName='picanteverde';", function(
  id
) {
  query('SELECT FROM transactions WHERE clientId=' + id, function(
    transactions
  ) {
    transactions.each(function(transac) {
      query(
        'UPDATE transactions SET value = ' +
          transac.value01 +
          ' WHERE id=' +
          transac.id,
        function(error) {
          if (!error) {
            console.log('success!!')
          } else {
            console.log('error')
          }
        }
      )
    })
  })
})

var logError = function(error) {
    if (!error) {
      console.log('success!!')
    } else {
      console.log('error')
    }
  },
  updateTransaction = function(t) {
    query(
      'UPDATE transactions SET value = ' + t.value01 + ' WHERE id=' + t.id,
      logError
    )
  },
  handleTransactions = function(transactions) {
    transactions.each(updateTransaction)
  },
  handleClient = function(id) {
    query('SELECT FROM transactions WHERE clientId=' + id, handleTransactions)
  }

query(
  "SELECT clientId FROM clients WHERE clientName='picanteverde';",
  handleClient
)
*/
