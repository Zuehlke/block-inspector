"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Configuration {
    constructor(rpcUrl, abiPath, address) {
        this.rpcUrl = rpcUrl;
        this.abiPath = abiPath;
        this.address = address;
    }
    static createDefault() {
        return new Configuration("http://localhost:8545/", null, null);
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map