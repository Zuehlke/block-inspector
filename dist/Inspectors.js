"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abiDecoder = require('abi-decoder');
let fs = require('fs');
class CommonPropsInsp {
    inspect(tx, txr, findings) {
        findings.set("hash", tx.hash);
        findings.set("blockNumber", txr.blockNumber);
        findings.set("from", tx.from);
        findings.set("to", tx.to);
        findings.set("value", tx.value);
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
        findings.set("gas", gas);
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
    constructor(abiPath, address) {
        this.address = address;
        let fileAbi = fs.readFileSync(abiPath);
        let abiObj = JSON.parse(fileAbi);
        abiDecoder.addABI(abiObj);
        this.methodIdMap = abiDecoder.getMethodIDs();
    }
    inspect(tx, txr, findings) {
        if (!this.checkRightContract(txr)) {
            return; //Address does not match
        }
        var method = abiDecoder.decodeMethod(tx.input);
        if (!method) {
            findings.set("methodName", "Method Hash not found in the ABI!");
            return;
        }
        findings.set("methodName", method.name);
        for (let i = 0; i < method.params.length; i++) {
            findings.set("paramN" + i, method.params[i].name);
            findings.set("paramV" + i, method.params[i].value);
            findings.set("paramT" + i, method.params[i].type);
        }
    }
    checkRightContract(txr) {
        let address;
        if (txr.to) {
            address = txr.to;
        }
        else {
            //Detect create contract Transaction. Create contract TX 'to' is null but 'contractAddress' is set in the TransactionReceipt
            address = txr.contractAddress;
        }
        return address == this.address;
    }
}
exports.MethodNameInsp = MethodNameInsp;
//# sourceMappingURL=Inspectors.js.map