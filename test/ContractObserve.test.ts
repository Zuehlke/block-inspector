import * as mocha from 'mocha';
import * as chai from 'chai';
import * as Inspectors from '../src/Inspectors';
var outOfGasCall = require("./resources/out-of-gas.json");
var deployContractCall = require("./resources/deploy-contract.json");
var addEntryCall = require("./resources/add-entry.json");

const expect = chai.expect;

describe('Inspectors tests', () => {

  it('Check the common props', () => {
    let insp: Inspectors.CommonPropsInsp = new Inspectors.CommonPropsInsp();
    let findings = new Map<String, Object>();

    insp.inspect(outOfGasCall.tx, outOfGasCall.txr, findings);
    expect(findings.get("txHash")).to.equal("0x5ed62e17b9127aa749dace8c866a5b88fe132a5afe203d915f9f9d4469a7de5b");
    expect(findings.get("blockNumber")).to.equal(25);
  });

  it('Out of Gas', () => {
    let insp: Inspectors.OutOfGasInsp = new Inspectors.OutOfGasInsp();
    let findings = new Map<String, Object>();

    insp.inspect(outOfGasCall.tx, outOfGasCall.txr, findings);
    expect(findings.get("outOfGas")).to.equal(true);
    expect(findings.get("gasUsed")).to.equal(1000000);
  });

  it('Not out of Gas', () => {
    let insp: Inspectors.OutOfGasInsp = new Inspectors.OutOfGasInsp();
    let findings = new Map<String, Object>();

    insp.inspect(deployContractCall.tx, deployContractCall.txr, findings);
    expect(findings.get("outOfGas")).to.equal(false);
    expect(findings.get("gasUsed")).to.equal(171761);
  });

  it('Contract create should be detected', () => {
    let insp: Inspectors.ContractCreateInsp = new Inspectors.ContractCreateInsp();
    let findings = new Map<String, Object>();

    insp.inspect(deployContractCall.tx, deployContractCall.txr, findings);
    expect(findings.get("createContract")).to.equal(true);
  });

  it('Method Call. With Param', () => {
    let insp: Inspectors.MethodNameInsp = new Inspectors.MethodNameInsp();
    let findings = new Map<String, Object>();

    insp.inspect(addEntryCall.tx, addEntryCall.txr, findings);
    expect(findings.get("methodSig")).to.equal("0x75a584b0");
    expect(findings.get("methodName")).to.equal("tbd");
    expect(findings.get("methodParam")).to.equal("00000000000000000000000000000000000000000000000000000000000000016f6b000000000000000000000000000000000000000000000000000000000000");
  });

    it('Method Call. No Param', () => {
    let insp: Inspectors.MethodNameInsp = new Inspectors.MethodNameInsp();
    let findings = new Map<String, Object>();

    insp.inspect(outOfGasCall.tx, outOfGasCall.txr, findings);
    expect(findings.get("methodSig")).to.equal("0x31fe52e8");
    expect(findings.get("methodName")).to.equal("tbd");
    expect(findings.get("methodParam")).to.equal("");
  });
});
