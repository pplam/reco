const fs = require('fs')
const solc = require('solc')

module.exports = (solFile) => {
  const contractFile = `./contracts/${solFile}.sol`

  const code = fs
    .readFileSync(contractFile)
    .toString()
  const compiledCode = solc
    .compile(code)

  Object
    .getOwnPropertyNames(compiledCode.contracts)
    .forEach((name) => {
      const definitionFile = `./build/${name.substring(1)}.def.json`

      const abiDefinition = compiledCode
        .contracts[name]
        .interface
      const byteCode = compiledCode
        .contracts[name]
        .bytecode

      const abstraction = {
        abis: JSON.parse(abiDefinition),
        bin: byteCode,
      }

      fs
        .writeFileSync(definitionFile, JSON.stringify(abstraction))
    })
  console.log(`Compile solidity source [${solFile}.sol] done!`)
}
