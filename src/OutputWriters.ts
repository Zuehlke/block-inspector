var ethjsUnit = require("ethjs-unit")

export interface OutputWriter {
    writeTx(findings: Map<String, Object>): string;
    writeEvent(event: any): string;
}

export class TextOutputWriter implements OutputWriter {

    writeTx(findings: Map<String, Object>): string {
        var output = "TX: ";
        output += "time: " + findings.get("timestamp");
        output += ", from: " + findings.get("from").toString().substring(0, 6);

        output += ", Ether: " + ethjsUnit.fromWei(findings.get("value"), 'ether');
        output += ", " + findings.get("methodName");

        output += "("
        var params = findings.get("params") as Array<any>;
        if (params) {
            for (var i = 0; i < params.length; i++) {
                output += params[i].name + ": " + params[i].value;
                if (i + 1 < params.length) {
                    output += ", ";
                }
            }
        }
        output += ")"


        if (findings.get("outOfGas") == true) {
            output += ", OUT OF GAS!"
        }

        return output;
    }

    writeEvent(event: any): string {
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

export class JsonOutputWriter implements OutputWriter {

    writeTx(findings: Map<String, Object>): string {
        return JSON.stringify([...findings]);
    }

    writeEvent(event: any): string {
        return JSON.stringify(event);
    }
}
