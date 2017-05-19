"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BigNumber = require('bignumber.js');
class TextOutputWriter {
    writeTx(findings) {
        var output = "TRANSACTION: ";
        output += "from: " + findings.get("from").toString().substring(0, 6);
        output += ", Wei: " + new BigNumber(findings.get("value")).toString(4);
        output += ", " + findings.get("methodName");
        output += "(";
        var params = findings.get("params");
        for (var i = 0; i < params.length; i++) {
            // output += ", param[" + i + "]: " + params[i].name + "=" + params[i].value;
            output += params[i].name + ": " + params[i].value;
            if (i + 1 < params.length) {
                output += ", ";
            }
        }
        output += ")";
        if (findings.get("outOfGas") == true) {
            output += ", OUT OF GAS!";
        }
        console.log(output);
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
        var out = "EVENT: " + event.event + "(" + params + ")";
        console.log(out);
    }
}
exports.TextOutputWriter = TextOutputWriter;
class JsonOutputWriter {
    writeTx(findings) {
        var mapString = JSON.stringify([...findings]);
        console.log(mapString);
    }
    writeEvent(event) {
        console.log(JSON.stringify(event));
    }
}
exports.JsonOutputWriter = JsonOutputWriter;
//# sourceMappingURL=OutputWriters.js.map