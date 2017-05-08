"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contractInfo = require("../bin/solidity/DemoContract.json");
var Web3 = require('web3');
class ContractObserve {
    constructor(contractAddress) {
        this.contractAddress = contractAddress;
    }
    observe() {
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545/'));
        web3.eth.defaultAccount = web3.eth.accounts[0];
        console.log("START. Observing contract: ");
        let lastBlock = web3.eth.blockNumber;
        for (let i = 0; i <= lastBlock; i++) {
            let block = web3.eth.getBlock(i);
            for (let txId of block.transactions) {
                let tx = web3.eth.getTransaction(txId);
                if (this.checkRightContract(tx)) {
                    let txReceipt = web3.eth.getTransactionReceipt(txId);
                    this.printInfo(tx, txReceipt);
                }
            }
        }
        console.log("END ...");
    }
    checkRightContract(tx) {
        return tx.to == this.contractAddress;
    }
    printInfo(tx, txReceipt) {
        let gas = tx.gas;
        let gasUsed = txReceipt.gasUsed;
        let methodSig = tx.input;
        let blockNumber = txReceipt.blockNumber;
        //console.log(methodSig);
        methodSig = methodSig.substring(0, 10);
        var outOfGas = gas == gasUsed;
        console.log("tx Id: " + tx.hash + ", method hash: " + methodSig + ", Block: " + blockNumber + ", gasUsed: " + gasUsed + ", out of gas: " + outOfGas);
    }
}
exports.ContractObserve = ContractObserve;
exports.default = ContractObserve;
//export default new ContractObserve("0x0be1427087970611dc9ba30f617bd5d3e73593c2"); 
//# sourceMappingURL=ContractObserve.js.map