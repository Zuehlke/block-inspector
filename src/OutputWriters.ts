var BigNumber = require('bignumber.js');


export interface OutputWriter {
    writeTx(findings: Map<String, Object>): void;
    writeEvent(event: any): void;
}

export class TextOutputWriter implements OutputWriter {

    writeTx(findings: Map<String, Object>) {
        var output = "TRANSACTION: ";

        output += "from: " + findings.get("from").toString().substring(0, 6);
        output += ", Wei: " + new BigNumber(findings.get("value")).toString(4);
        output += ", " + findings.get("methodName");

        output += "("
        var params = findings.get("params") as Array<any>;
        for (var i = 0; i < params.length; i++) {
            // output += ", param[" + i + "]: " + params[i].name + "=" + params[i].value;
            output += params[i].name + ": " + params[i].value;
            if (i + 1 < params.length) {
                output += ", ";
            }
        }
        output += ")"


        if (findings.get("outOfGas") == true) {
            output += ", OUT OF GAS!"
        }

        console.log(output);
    }

    writeEvent(event: any) {
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

export class JsonOutputWriter implements OutputWriter {

    writeTx(findings: Map<String, Object>) {
        var mapString = JSON.stringify([...findings]);
        console.log(mapString);
    }

    writeEvent(event: any) {
        console.log(JSON.stringify(event));    
    }
}
