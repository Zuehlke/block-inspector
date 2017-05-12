
export class Configuration {

    public abiPath: String;
    public address: String;
    public rpcUrl: String;
    public blockToStart: number;
    public scanning: Boolean;

    public constructor(rpcUrl: String, blockToStart: number, scanning: Boolean, abiPath: String, address: String) {
        this.rpcUrl = rpcUrl;
        this.blockToStart = blockToStart;
        this.scanning = scanning;
        this.abiPath = abiPath;
        this.address = address;
    }

    public static createDefault(): Configuration {
        return new Configuration("http://localhost:8545/", 
            600, 
            true, 
            "./bin/solidity/DemoContract.abi", 
            "0x323230accd10982a59c26d74e2abf5424d6a3c2a");
    }
}

