import * as ContractObserve from './ContractObserve';
import * as Configuration from './Configuration';
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'abiPath', type: String, multiple: false},
  { name: 'address', type: String, multiple: false},
  { name: 'rpcUrl', type: String, multiple: false },
  { name: 'block', type: String, multiple: false},
  { name: 'help', alias: 'h', type: Boolean }
]

const options = commandLineArgs(optionDefinitions);
// TODO: https://www.npmjs.com/package/command-line-args
// TODO: https://www.npmjs.com/package/command-line-usage
console.log(options);

new ContractObserve.ContractObserve(Configuration.Configuration.createDefault()).startScanning();