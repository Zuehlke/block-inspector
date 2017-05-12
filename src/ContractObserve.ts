var contractInfo = require("../bin/solidity/DemoContract.json");
import * as Inspectors from './Inspectors';
var Web3 = require('web3');


export class ContractObserve {

    private contractAddress: string;
    private inspectors: Array<Inspectors.Inspectable>;

    public constructor(contractAddress: string) {
        this.contractAddress = contractAddress;
        this.inspectors = [new Inspectors.CommonPropsInsp(),
        new Inspectors.ContractCreateInsp(),
        new Inspectors.MethodNameInsp("../bin/solidity/DemoContract.abi"),        
        new Inspectors.MethodSignatureInsp(),
        new Inspectors.OutOfGasInsp()];
    }

    public observe(): void {
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545/'));
        web3.eth.defaultAccount = web3.eth.accounts[0];

        console.log("START. Observing contract: ");
        let lastBlock = web3.eth.blockNumber;
        for (let i = 615; i <= lastBlock; i++) {
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
//export default new ContractObserve("0x0be1427087970611dc9ba30f617bd5d3e73593c2");