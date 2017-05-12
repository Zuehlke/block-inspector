"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abiDecoder = require('abi-decoder');
let fs = require('fs');
class CommonPropsInsp {
    inspect(tx, txr, findings) {
        findings.set("txHash", tx.hash);
        findings.set("blockNumber", txr.blockNumber);
    }
}
exports.CommonPropsInsp = CommonPropsInsp;
class OutOfGasInsp {
    inspect(tx, txr, findings) {
        let gas = tx.gas;
        let gasUsed = txr.gasUsed;
        var outOfGas = gas == gasUsed;
        findings.set("outOfGas", outOfGas);
        findings.set("gasUsed", gasUsed);
    }
}
exports.OutOfGasInsp = OutOfGasInsp;
class ContractCreateInsp {
    inspect(tx, txr, findings) {
        findings.set("createContract", tx.to == null);
    }
}
exports.ContractCreateInsp = ContractCreateInsp;
class MethodSignatureInsp {
    inspect(tx, txr, findings) {
        findings.set("methodSig", tx.input.substring(0, 10));
    }
}
exports.MethodSignatureInsp = MethodSignatureInsp;
class MethodNameInsp {
    constructor(abiPath) {
        let fileAbi = fs.readFileSync(abiPath);
        let abiObj = JSON.parse(fileAbi);
        abiDecoder.addABI(abiObj);
        this.methodIdMap = abiDecoder.getMethodIDs();
    }
    inspect(tx, txr, findings) {
        var method = abiDecoder.decodeMethod(tx.input);
        if (method) {
            findings.set("methodName", method.name);
            for (let i = 0; i < method.params.length; i++) {
                findings.set("paramN" + i, method.params[i].name);
                findings.set("paramV" + i, method.params[i].value);
                findings.set("paramT" + i, method.params[i].type);
            }
        }
        else {
            findings.set("methodName", "Method Hash not found in the ABI!");
        }
    }
}
exports.MethodNameInsp = MethodNameInsp;
//# sourceMappingURL=Inspectors.js.map