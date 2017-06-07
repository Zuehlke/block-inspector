"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethunits = require('ethereum-units');
class TextOutputWriter {
    writeTx(findings) {
        var output = "TRANSACTION: ";
        output += "from: " + findings.get("from").toString().substring(0, 6);
        output += ", Wei: " + ethunits.convert(findings.get("value"), 'wei', 'ether');
        output += ", " + findings.get("methodName");
        output += "(";
        var params = findings.get("params");
        if (params) {
            for (var i = 0; i < params.length; i++) {
                output += params[i].name + ": " + params[i].value;
                if (i + 1 < params.length) {
                    output += ", ";
                }
            }
        }
        output += ")";
        if (findings.get("outOfGas") == true) {
            output += ", OUT OF GAS!";
        }
        return output;
    }
    writeEvent(event) {
        var params = "";
        Object.keys(event.args).forEach(key => {
            params += key + ": " + event.args[key] + ", ";
        });
        if (params.endsWith(", ")) {
            params = params.substring(0, params.length - 2);
        }
        var args = JSON.stringify(event.args);
        var output = "EVENT: " + event.event + "(" + params + ")";
        return output;
    }
}
exports.TextOutputWriter = TextOutputWriter;
class JsonOutputWriter {
    writeTx(findings) {
        var mapString = JSON.stringify([...findings]);
        return mapString;
    }
    writeEvent(event) {
        return JSON.stringify(event);
    }
}
exports.JsonOutputWriter = JsonOutputWriter;
//# sourceMappingURL=OutputWriters.js.map