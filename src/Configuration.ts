let fs = require('fs');

export class Configuration {

    public abiPath: String;
    public address: String;
    public rpcUrl: String;

    public constructor(rpcUrl: String, abiPath: String, address: String) {
        this.rpcUrl = rpcUrl;
        this.abiPath = abiPath;
        this.address = address;
    }

    public static createDefault(): Configuration {
        return new Configuration("http://localhost:8545/",
            null,
            null);
    }

    public validate(): boolean {
        if (fs.existsSync(this.abiPath) == false) {
            console.error("ERROR: File not found: " + this.abiPath);
            return false;
        }

        return true;
    }
}

