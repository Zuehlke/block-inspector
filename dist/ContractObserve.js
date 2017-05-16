"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contractInfo = require("../bin/solidity/DemoContract.json");
const Inspectors = require("./Inspectors");
var Web3 = require('web3');
class ContractObserve {
    constructor(configuration) {
        this.configuration = configuration;
        this.inspectors = [new Inspectors.CommonPropsInsp(),
            new Inspectors.ContractCreateInsp(),
            new Inspectors.MethodSignatureInsp(),
            new Inspectors.OutOfGasInsp()];
        if (configuration.abiPath && configuration.address) {
            this.inspectors.push(new Inspectors.MethodNameInsp(configuration.abiPath, configuration.address));
        }
        else {
            console.log("No abiPath or no address configured. Method name inspection is disabled");
        }
    }
    start() {
        this.web3 = new Web3();
        this.web3.setProvider(new this.web3.providers.HttpProvider(this.configuration.rpcUrl));
        if (this.configuration.observe) {
            this.initObserve(this.web3);
        }
        if (this.configuration.blockToStart && this.configuration.blockToStart >= 0) {
            let lastBlock = this.web3.eth.blockNumber;
            for (let blockNumber = this.configuration.blockToStart.valueOf(); blockNumber <= lastBlock; blockNumber++) {
                let block = this.web3.eth.getBlock(blockNumber); //getBlock works with the block number
                this.inspectByBlock(block);
            }
        }
        console.log("END ...");
    }
    initObserve(web3) {
        this.web3.eth.filter('latest', (e, r) => {
            //result is the block hash
            let block = this.web3.eth.getBlock(r); //getBlock works with the block hash
            this.inspectByBlock(block);
        });
    }
    inspectByBlock(block) {
        let findings = new Map();
        for (let txId of block.transactions) {
            let tx = this.web3.eth.getTransaction(txId);
            let txReceipt = this.web3.eth.getTransactionReceipt(txId);
            if (this.inspectAllContracts() || this.checkRightContract(txReceipt)) {
                this.inspectors.forEach(inspt => { inspt.inspect(tx, txReceipt, findings); });
                this.printOut(findings);
            }
        }
    }
    printOut(findings) {
        console.log(findings);
    }
    inspectAllContracts() {
        if (this.configuration.address) {
            return false;
        }
        else {
            return true;
        }
    }
    checkRightContract(txr) {
        let address;
        if (txr.to) {
            address = txr.to;
        }
        else {
            //Detect create contract Transaction. Create contract TX 'to' is null but 'contractAddress' is set in the TransactionReceipt
            address = txr.contractAddress;
        }
        return address == this.configuration.address;
    }
}
exports.ContractObserve = ContractObserve;
exports.default = ContractObserve;
//# sourceMappingURL=ContractObserve.js.map