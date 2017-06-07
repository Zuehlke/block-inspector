import * as mocha from 'mocha';
import * as chai from 'chai';
import * as Inspectors from '../src/Inspectors';
import * as OutputWriters from '../src/OutputWriters';
var addEntryCall = require("./resources/add-entry.json");

const expect = chai.expect;
let abiPath = "./test/resources/DemoContract.abi";

describe('OutputWriters tests', () => {

    it('Test the text output writer', () => {

        let insp1 = new Inspectors.CommonPropsInsp();
        let insp2 = new Inspectors.MethodNameInsp(abiPath, addEntryCall.txr.to);
        let outputWriter = new OutputWriters.TextOutputWriter();
        let findings = new Map<String, Object>();

        insp1.inspect(addEntryCall.tx, addEntryCall.txr, findings);
        insp2.inspect(addEntryCall.tx, addEntryCall.txr, findings);

        let result = outputWriter.writeTx(findings);

        expect(result).to.equal("TRANSACTION: from: 0x4c51, Ether: 0.01, addEntry(key: 1, data: 0x6f6b000000000000000000000000000000000000000000000000000000000000)");
    });
});
