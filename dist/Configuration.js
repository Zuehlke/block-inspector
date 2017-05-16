"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Configuration {
    constructor(rpcUrl, blockToStart, observe, abiPath, address) {
        this.rpcUrl = rpcUrl;
        this.blockToStart = blockToStart;
        this.observe = observe;
        this.abiPath = abiPath;
        this.address = address;
    }
    static createDefault() {
        return new Configuration("http://localhost:8545/", 600, true, null, null);
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map