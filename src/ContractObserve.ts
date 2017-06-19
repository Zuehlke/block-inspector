var contractInfo = require("../bin/solidity/DemoContract.json");
import * as Inspectors from './Inspectors';
import * as Configuration from './Configuration';
import * as EventListener from './EventListener';
import * as OutputWriters from './OutputWriters';
var Web3 = require('web3');

export class ContractObserve {

    private configuration: Configuration.Configuration;
    private inspectors: Array<Inspectors.Inspectable>;
    private outputWriter: OutputWriters.OutputWriter;
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

        this.outputWriter = new OutputWriters.TextOutputWriter();
    }

    public start(): void {
        this.web3 = new Web3();
        this.web3.setProvider(new this.web3.providers.HttpProvider(this.configuration.rpcUrl));

        this.web3.eth.filter('latest', (error, result) => {
            if (!error) {
                //result is the block hash
                let block = this.web3.eth.getBlock(result); //getBlock works with the block hash
                this.inspectByBlock(block);
            } else {
                console.error(error)
            }
        });

        var eventListener = new EventListener.EventListener(this.configuration, this.web3);
        eventListener.start();
    }

    private inspectByBlock(block: any) {
        let findings = new Map<String, Object>();
        let counter = 0;
        for (let txId of block.transactions) {
            let tx = this.web3.eth.getTransaction(txId);
            let txReceipt = this.web3.eth.getTransactionReceipt(txId);

            if (this.checkRightContract(txReceipt)) {
                this.inspectors.forEach(inspt => { inspt.inspect(tx, txReceipt, block, findings) });
                this.printOut(findings);
            }
        }
    }

    private printOut(findings: any) {
        console.log(this.outputWriter.writeTx(findings));
    }

    private checkRightContract(txr: any): boolean {
        let address: string;

        if (txr.to) {
            address = txr.to;
        } else {
            // Detect create contract Transaction. 
            // Create contract TX 'to' is null but 'contractAddress' is set in the TransactionReceipt
            address = txr.contractAddress;
        }

        return address == this.configuration.address;
    }
}

export default ContractObserve;