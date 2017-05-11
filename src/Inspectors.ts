

export interface Inspectable {
    inspect(tx: any, txr: any, findings: Map<String, Object>): void;
}

export class CommonPropsInsp implements Inspectable {
    inspect(tx: any, txr: any, findings: Map<String, Object>) {
        findings.set("txHash", tx.hash);
        findings.set("blockNumber", txr.blockNumber);
    }
}

export class OutOfGasInsp implements Inspectable {

    inspect(tx: any, txr: any, findings: Map<String, Object>) {
        let gas: number = tx.gas;
        let gasUsed: number = txr.gasUsed;
        var outOfGas = gas == gasUsed;

        findings.set("outOfGas", outOfGas);
        findings.set("gasUsed", gasUsed);
    }
}

export class ContractCreateInsp implements Inspectable {

    inspect(tx: any, txr: any, findings: Map<String, Object>) {
        findings.set("createContract", tx.to == null);
    }
}

export class MethodNameInsp implements Inspectable {
    inspect(tx: any, txr: any, findings: Map<String, Object>) {
        findings.set("methoSignature", tx.input.substring(0, 10));
    }

}