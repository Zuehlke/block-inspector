var contractInfo = require("../bin/solidity/DemoContract.json");
import * as Inspectors from './Inspectors';
import * as Configuration from './Configuration';
var Web3 = require('web3');


export class ContractObserve {

    private contractAddress: String;
    private inspectors: Array<Inspectors.Inspectable>;
    private rpcUrl: String;
    private blockToStart: number;

    public constructor(configuration: Configuration.Configuration) {
        this.contractAddress = configuration.address;
        this.rpcUrl = configuration.rpcUrl;
        this.blockToStart = configuration.blockToStart;
        this.inspectors = [new Inspectors.CommonPropsInsp(),
        new Inspectors.ContractCreateInsp(),
        new Inspectors.MethodNameInsp(configuration.abiPath), //"../bin/solidity/DemoContract.abi"
        new Inspectors.MethodSignatureInsp(),
        new Inspectors.OutOfGasInsp()];
    }

    public startScanning(): void {
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider(this.rpcUrl));
        //web3.eth.defaultAccount = web3.eth.accounts[0];

        let lastBlock = web3.eth.blockNumber;
        for (let i = this.blockToStart; i <= lastBlock; i++) {
            let block = web3.eth.getBlock(i);
            let findings = new Map<String, Object>();

            for (let txId of block.transactions) {
                let tx = web3.eth.getTransaction(txId);
                let txReceipt = web3.eth.getTransactionReceipt(txId);
                this.inspectors.forEach(inspt => { inspt.inspect(tx, txReceipt, findings) });
                this.printOut(findings);
            }
        }

        console.log("END ...");
    }

    private printOut(findings: any){
        console.log(findings);
    }

    private checkRightContract(tx: any): boolean {
        return tx.to == this.contractAddress;
    }
}

export default ContractObserve;