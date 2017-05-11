"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class MethodNameInsp {
    inspect(tx, txr, findings) {
        findings.set("methoSignature", tx.input.substring(0, 10));
    }
}
exports.MethodNameInsp = MethodNameInsp;
//# sourceMappingURL=Inspectors.js.map