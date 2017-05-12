"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandLineArgs = require('command-line-args');
const optionDefinitions = [
    { name: 'abiPath', type: String, multiple: false },
    { name: 'address', type: String, multiple: false },
    { name: 'rpcUrl', type: String, multiple: false },
    { name: 'block', type: String, multiple: false },
    { name: 'help', alias: 'h', type: Boolean }
];
const options = commandLineArgs(optionDefinitions);
console.log(options);
//new ContractObserve.ContractObserve(Configuration.Configuration.createDefault()).startScanning(); 
//# sourceMappingURL=index.js.map