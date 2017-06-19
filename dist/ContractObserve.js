"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contractInfo = require("../bin/solidity/DemoContract.json");
const Inspectors = require("./Inspectors");
const EventListener = require("./EventListener");
const OutputWriters = require("./OutputWriters");
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
        this.outputWriter = new OutputWriters.TextOutputWriter();
    }
    start() {
        this.web3 = new Web3();
        this.web3.setProvider(new this.web3.providers.HttpProvider(this.configuration.rpcUrl));
        this.web3.eth.filter('latest', (error, result) => {
            if (!error) {
                //result is the block hash
                let block = this.web3.eth.getBlock(result); //getBlock works with the block hash
                this.inspectByBlock(block);
            }
            else {
                console.error(error);
            }
        });
        var eventListener = new EventListener.EventListener(this.configuration, this.web3);
        eventListener.start();
    }
    inspectByBlock(block) {
        let findings = new Map();
        let counter = 0;
        for (let txId of block.transactions) {
            let tx = this.web3.eth.getTransaction(txId);
            let txReceipt = this.web3.eth.getTransactionReceipt(txId);
            if (this.checkRightContract(txReceipt)) {
                this.inspectors.forEach(inspt => { inspt.inspect(tx, txReceipt, block, findings); });
                this.printOut(findings);
            }
        }
    }
    printOut(findings) {
        console.log(this.outputWriter.writeTx(findings));
    }
    checkRightContract(txr) {
        let address;
        if (txr.to) {
            address = txr.to;
        }
        else {
            // Detect create contract Transaction. 
            // Create contract TX 'to' is null but 'contractAddress' is set in the TransactionReceipt
            address = txr.contractAddress;
        }
        return address == this.configuration.address;
    }
}
exports.ContractObserve = ContractObserve;
exports.default = ContractObserve;
//# sourceMappingURL=ContractObserve.js.map