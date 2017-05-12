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
        this.web3 = new Web3();
        this.web3.setProvider(new this.web3.providers.HttpProvider(this.rpcUrl));
        let lastBlock = this.web3.eth.blockNumber;
        this.web3.eth.filter('latest', (e, r) => {
            //result is the block hash
            let block = this.web3.eth.getBlock(r); //getBlock works with the block hash
            this.inspectByBlock(block);
        });
        for (let blockNumber = this.blockToStart; blockNumber <= lastBlock; blockNumber++) {
            let block = this.web3.eth.getBlock(blockNumber); //getBlock works with the block number
            this.inspectByBlock(block);
        }
        console.log("END ...");
    }
    inspectByBlock(block) {
        let findings = new Map();
        for (let txId of block.transactions) {
            let tx = this.web3.eth.getTransaction(txId);
            let txReceipt = this.web3.eth.getTransactionReceipt(txId);
            this.inspectors.forEach(inspt => { inspt.inspect(tx, txReceipt, findings); });
            this.printOut(findings);
        }
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