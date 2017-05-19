let fs = require('fs');
var Web3 = require('web3');
import * as Configuration from './Configuration';
import * as OutputWriters from './OutputWriters';

export class EventListener {
    private configuration: Configuration.Configuration;
    private web3: any;
    private out: OutputWriters.OutputWriter = new OutputWriters.TextOutputWriter();

    public constructor(configuration: Configuration.Configuration, web3: any) {
        this.configuration = configuration;
        this.web3 = web3;
    }

    public start(): void {
        let fileAbi = fs.readFileSync(this.configuration.abiPath);
        let abiObj = JSON.parse(fileAbi);

        this.web3.eth.contract(abiObj).at(this.configuration.address).allEvents().watch((error, event) => {
            if (!error) {
                this.out.writeEvent(event);
            } else {
                console.error(error);
            }
        });
    }
}