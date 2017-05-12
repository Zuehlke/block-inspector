var contractInfo = require("../bin/solidity/DemoContract.json");
import * as Inspectors from './Inspectors';
import * as Configuration from './Configuration';
var Web3 = require('web3');


export class ContractObserve {

    private contractAddress: String;
    private inspectors: Array<Inspectors.Inspectable>;
    private rpcUrl: String;
    private blockToStart: number;
    private web3: any;

    public constructor(configuration: Configuration.Configuration) {
        this.contractAddress = configuration.address;
        this.rpcUrl = configuration.rpcUrl;
        this.blockToStart = configuration.blockToStart;
        this.inspectors = [new Inspectors.CommonPropsInsp(),
        new Inspectors.ContractCreateInsp(),
        new Inspectors.MethodNameInsp(configuration.abiPath),
        new Inspectors.MethodSignatureInsp(),
        new Inspectors.OutOfGasInsp()];
    }

    public startScanning(): void {
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

    private inspectByBlock(block: any) {
        let findings = new Map<String, Object>();

        for (let txId of block.transactions) {
            let tx = this.web3.eth.getTransaction(txId);
            let txReceipt = this.web3.eth.getTransactionReceipt(txId);
            this.inspectors.forEach(inspt => { inspt.inspect(tx, txReceipt, findings) });
            this.printOut(findings);
        }
    }

    private printOut(findings: any) {
        console.log(findings);
    }

    private checkRightContract(tx: any): boolean {
        return tx.to == this.contractAddress;
    }
}

export default ContractObserve;