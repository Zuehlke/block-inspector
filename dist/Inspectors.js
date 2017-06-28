"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abiDecoder = require('abi-decoder');
let fs = require('fs');
class CommonPropsInsp {
    inspect(tx, txr, block, findings) {
        findings.set("hash", tx.hash);
        findings.set("blockNumber", txr.blockNumber);
        findings.set("from", tx.from);
        findings.set("to", tx.to);
        findings.set("value", tx.value);
        var date = new Date(block.timestamp * 1000);
        var formatted = date.toISOString();
        findings.set("timestamp", formatted);
    }
}
exports.CommonPropsInsp = CommonPropsInsp;
class OutOfGasInsp {
    inspect(tx, txr, block, findings) {
        let gas = tx.gas;
        let gasUsed = txr.gasUsed;
        var outOfGas = gas == gasUsed;
        findings.set("outOfGas", outOfGas);
        findings.set("gasUsed", gasUsed);
        findings.set("gas", gas);
    }
}
exports.OutOfGasInsp = OutOfGasInsp;
class ContractCreateInsp {
    inspect(tx, txr, block, findings) {
        findings.set("createContract", tx.to == null);
    }
}
exports.ContractCreateInsp = ContractCreateInsp;
class MethodSignatureInsp {
    inspect(tx, txr, block, findings) {
        findings.set("methodSig", tx.input.substring(0, 10));
    }
}
exports.MethodSignatureInsp = MethodSignatureInsp;
class MethodNameInsp {
    constructor(abiPath, address) {
        this.address = address;
        let fileAbi = fs.readFileSync(abiPath);
        let abiObj = JSON.parse(fileAbi);
        abiDecoder.addABI(abiObj);
        this.methodIdMap = abiDecoder.getMethodIDs();
    }
    inspect(tx, txr, block, findings) {
        var method = abiDecoder.decodeMethod(tx.input);
        if (!method) {
            findings.set("methodName", "Method Hash not found in the ABI!");
            return;
        }
        findings.set("methodName", method.name);
        findings.set("params", method.params);
    }
}
exports.MethodNameInsp = MethodNameInsp;
//# sourceMappingURL=Inspectors.js.map