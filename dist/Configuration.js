"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Configuration {
    constructor(rpcUrl, blockToStart, scanning, abiPath, address) {
        this.rpcUrl = rpcUrl;
        this.blockToStart = blockToStart;
        this.scanning = scanning;
        this.abiPath = abiPath;
        this.address = address;
    }
    static createDefault() {
        return new Configuration("http://localhost:8545/", 600, true, "./bin/solidity/DemoContract.abi", "0x323230accd10982a59c26d74e2abf5424d6a3c2a");
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map