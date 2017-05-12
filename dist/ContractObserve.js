"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contractInfo = require("../bin/solidity/DemoContract.json");
const Inspectors = require("./Inspectors");
var Web3 = require('web3');
class ContractObserve {
    constructor(configuration) {
        this.contractAddress = configuration.address;
        this.rpcUrl = configuration.rpcUrl;
        this.blockToStart = configuration.blockToStart;
        this.inspectors = [new Inspectors.CommonPropsInsp(),
            new Inspectors.ContractCreateInsp(),
            new Inspectors.MethodNameInsp(configuration.abiPath),
            new Inspectors.MethodSignatureInsp(),
            new Inspectors.OutOfGasInsp()];
    }
    startScanning() {
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider(this.rpcUrl));
        //web3.eth.defaultAccount = web3.eth.accounts[0];
        let lastBlock = web3.eth.blockNumber;
        for (let i = this.blockToStart; i <= lastBlock; i++) {
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
//# sourceMappingURL=ContractObserve.js.map