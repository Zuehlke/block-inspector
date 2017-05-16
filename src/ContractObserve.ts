var contractInfo = require("../bin/solidity/DemoContract.json");
import * as Inspectors from './Inspectors';
import * as Configuration from './Configuration';
var Web3 = require('web3');


export class ContractObserve {

    private configuration: Configuration.Configuration;
    private inspectors: Array<Inspectors.Inspectable>;
    private web3: any;

    public constructor(configuration: Configuration.Configuration) {
        this.configuration = configuration;

        this.inspectors = [new Inspectors.CommonPropsInsp(),
        new Inspectors.ContractCreateInsp(),
        new Inspectors.MethodSignatureInsp(),
        new Inspectors.OutOfGasInsp()];

        if (configuration.abiPath && configuration.address) {
            this.inspectors.push(new Inspectors.MethodNameInsp(configuration.abiPath, configuration.address));
        } else {
            console.log("No abiPath or no address configured. Method name inspection is disabled");
        }
    }

    public start(): void {
        this.web3 = new Web3();
        this.web3.setProvider(new this.web3.providers.HttpProvider(this.configuration.rpcUrl));

        if (this.configuration.observe) {
            this.initObserve(this.web3);
        }

        if (this.configuration.blockToStart && this.configuration.blockToStart >= 0) {
            let lastBlock: number = this.web3.eth.blockNumber;
            for (let blockNumber: number = this.configuration.blockToStart.valueOf(); blockNumber <= lastBlock; blockNumber++) {
                let block = this.web3.eth.getBlock(blockNumber); //getBlock works with the block number
                this.inspectByBlock(block);
            }
        }
        console.log("END ...");
    }

    private initObserve(web3: any): void {
        this.web3.eth.filter('latest', (e, r) => {
            //result is the block hash
            let block = this.web3.eth.getBlock(r); //getBlock works with the block hash
            this.inspectByBlock(block);
        });
    }

    private inspectByBlock(block: any) {
        let findings = new Map<String, Object>();

        for (let txId of block.transactions) {
            let tx = this.web3.eth.getTransaction(txId);
            let txReceipt = this.web3.eth.getTransactionReceipt(txId);

            if (this.inspectAllContracts() || this.checkRightContract(txReceipt)) {
                this.inspectors.forEach(inspt => { inspt.inspect(tx, txReceipt, findings) });
                this.printOut(findings);
            }
        }
    }

    private printOut(findings: any) {
        console.log(findings);
    }

    private inspectAllContracts(): boolean {
        if (this.configuration.address) {
            return false;
        } else {
            return true;
        }
    }

    private checkRightContract(txr: any): boolean {
        let address: string;

        if (txr.to) {
            address = txr.to;
        } else {
            //Detect create contract Transaction. Create contract TX 'to' is null but 'contractAddress' is set in the TransactionReceipt
            address = txr.contractAddress;
        }

        return address == this.configuration.address;
    }
}

export default ContractObserve;