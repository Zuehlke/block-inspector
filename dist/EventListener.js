"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require('fs');
var Web3 = require('web3');
const OutputWriters = require("./OutputWriters");
class EventListener {
    constructor(configuration, web3) {
        this.out = new OutputWriters.TextOutputWriter();
        this.configuration = configuration;
        this.web3 = web3;
    }
    start() {
        let fileAbi = fs.readFileSync(this.configuration.abiPath);
        let abiObj = JSON.parse(fileAbi);
        this.web3.eth.contract(abiObj).at(this.configuration.address).allEvents().watch((error, event) => {
            if (!error) {
                this.out.writeEvent(event);
            }
            else {
                console.error(error);
            }
        });
    }
}
exports.EventListener = EventListener;
//# sourceMappingURL=EventListener.js.map