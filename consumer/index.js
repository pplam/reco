const Web3 = require('web3')
const config = require('./config')

const {
  endpoint,
  contract,
  account,
  cost
} = config

module.exports = (method, imagePath, options) => {
  const provider = new Web3.providers
    .HttpProvider(endpoint)
  const web3 = new Web3(provider)

  const instance = web3.eth
    .contract(contract.abi)
    .at(contract.address)

  web3.personal
    .unlockAccount(account.address, account.password)

  const answerEvent = instance.NewAnswer()
  answerEvent.watch((err, msg) => {
    console.log(msg.args.answer)
  })

  const question = JSON.stringify({
    method,
    params: {
      image: imagePath,
      options
    }
  })
  instance
    .ask(question, {
      from: account.address,
      gas: cost.gas
    })
}

module.exports(process.argv[2], process.argv[3])
