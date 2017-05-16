
export class Configuration {

    public abiPath: String;
    public address: String;
    public rpcUrl: String;
    public blockToStart: Number;
    public observe: Boolean;

    public constructor(rpcUrl: String, blockToStart: Number, observe: Boolean, abiPath: String, address: String) {
        this.rpcUrl = rpcUrl;
        this.blockToStart = blockToStart;
        this.observe = observe;
        this.abiPath = abiPath;
        this.address = address;
    }

    public static createDefault(): Configuration {
        return new Configuration("http://localhost:8545/", 
            600, 
            true, 
            null, 
            null);
    }
}

