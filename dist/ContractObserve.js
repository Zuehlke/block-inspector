"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contractInfo = require("../bin/solidity/DemoContract.json");
const Inspectors = require("./Inspectors");
var Web3 = require('web3');
class ContractObserve {
    constructor(contractAddress) {
        this.contractAddress = contractAddress;
        this.inspectors = [new Inspectors.CommonPropsInsp(),
            new Inspectors.ContractCreateInsp(),
            new Inspectors.MethodNameInsp("../bin/solidity/DemoContract.abi"),
            //new Inspectors.MethodNameInsp("/Users/kasimir/Documents/camp-blockchain/solidity-contract-observer/test/resources/DemoContract.abi"),
            new Inspectors.MethodSignatureInsp(),
            new Inspectors.OutOfGasInsp()];
    }
    observe() {
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545/'));
        web3.eth.defaultAccount = web3.eth.accounts[0];
        console.log("START. Observing contract: ");
        let lastBlock = web3.eth.blockNumber;
        for (let i = 615; i <= lastBlock; i++) {
            let block = web3.eth.getBlock(i);
            let findings = new Map();
            for (let txId of block.transactions) {
                let tx = web3.eth.getTransaction(txId);
                let txReceipt = web3.eth.getTransactionReceipt(txId);
                this.inspectors.forEach(inspt => { inspt.inspect(tx, txReceipt, findings); });
                this.printOut(findings);
            }
        }
        console.log("END ...");
    }
    printOut(findings) {
        console.log(findings);
    }
    checkRightContract(tx) {
        return tx.to == this.contractAddress;
    }
}
exports.ContractObserve = ContractObserve;
exports.default = ContractObserve;
//export default new ContractObserve("0x0be1427087970611dc9ba30f617bd5d3e73593c2"); 
//# sourceMappingURL=ContractObserve.js.map