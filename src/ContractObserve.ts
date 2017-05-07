var contractInfo = require("../bin/solidity/DemoContract.json");

var Web3 = require('web3');


export class ContractObserve {

    private contractAddress: string;

    public constructor(contractAddress: string){
        this.contractAddress = contractAddress;
    }


    public observe(): void {
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
                    this.checkOutOfGas(tx, txReceipt);
                }
            }
        }

        console.log("END ...");
    }

    private checkRightContract(tx: any): boolean {
        return tx.to == this.contractAddress;
    }

    private checkOutOfGas(tx: any, txReceipt: any): void {
        let gas: number = tx.gas;
        let gasUsed: number = txReceipt.gasUsed;
        if (gas == gasUsed) {
            let methodSig: string = tx.input;
            let blockNumber: number = txReceipt.blockNumber;
            //console.log(methodSig);
            methodSig = methodSig.substring(0, 10);
            console.log("Out of Gas! tx Id: " + tx.hash + ", method hash: " + methodSig + ", Block: " + blockNumber);

        }
    }
}

export default ContractObserve;
//export default new ContractObserve("0x0be1427087970611dc9ba30f617bd5d3e73593c2");