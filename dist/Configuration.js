"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require('fs');
class Configuration {
    constructor(rpcUrl, abiPath, address) {
        this.rpcUrl = rpcUrl;
        this.abiPath = abiPath;
        this.address = address;
    }
    static createDefault() {
        return new Configuration("http://localhost:8545/", null, null);
    }
    validate() {
        if (fs.existsSync(this.abiPath) == false) {
            console.error("ERROR: File not found: " + this.abiPath);
            return false;
        }
        return true;
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map