const fs = require('fs')
const Web3 = require('web3')
const config = require('./config.json')


module.exports = (contractName) => {
  const {
    endpoint,
    account,
    cost
  } = config

  const provider = new Web3
    .providers
    .HttpProvider(endpoint)
  const web3 = new Web3(provider)

  const definitionFile = `./build/${contractName}.def.json`
  const definition = require(definitionFile)

  const options = {
    data: '0x' + definition.bin,
    from: account.address,
    gas: cost.gas || 4700000,
  }

  web3
    .personal
    .unlockAccount(account.address, account.password)

  const contract = web3
    .eth
    .contract(definition.abis)
    .new(options, (err, result) => {
      const addr = result.address
      if (addr) {
        definition.address = addr
        fs.writeFileSync(definitionFile, JSON.stringify(definition))
        console.log(`Deploy contract [${contractName}] done!`)
      }
    })
}
