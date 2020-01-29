const a = async() =>
{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('yeah!')
    }, 1000);
  })
}

const b = async() =>
{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Oooo yeah!')
    }, 500);
  })
}

const main = () => {
  Promise.race([a(),b()]).then(result => console.log({result}))
}

main();
