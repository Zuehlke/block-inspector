import * as mocha from 'mocha';
import * as chai from 'chai';
import * as Inspectors from '../src/Inspectors';
var outOfGasCall = require("./resources/out-of-gas.json");
var deployContractCall = require("./resources/deploy-contract.json");
var addEntryCall = require("./resources/add-entry.json");

const expect = chai.expect;
//let abiPath = "/Users/kasimir/Documents/camp-blockchain/solidity-contract-observer/test/resources/DemoContract.abi";
let abiPath = "./test/resources/DemoContract.abi";

describe('Inspectors tests', () => {

  it('Check the common props', () => {
    let insp: Inspectors.CommonPropsInsp = new Inspectors.CommonPropsInsp();
    let findings = new Map<String, Object>();

    insp.inspect(outOfGasCall.tx, outOfGasCall.txr, findings);
    expect(findings.get("hash")).to.equal("0x5ed62e17b9127aa749dace8c866a5b88fe132a5afe203d915f9f9d4469a7de5b");
    expect(findings.get("blockNumber")).to.equal(25);
    expect(findings.get("from")).to.equal("0x4c51098b8f7547476f85ed24dec890f835a841c5");
    expect(findings.get("to")).to.equal("0x0be1427087970611dc9ba30f617bd5d3e73593c2");
    expect(findings.get("value")).to.equal(0);
  });

  it('Out of Gas', () => {
    let insp: Inspectors.OutOfGasInsp = new Inspectors.OutOfGasInsp();
    let findings = new Map<String, Object>();

    insp.inspect(outOfGasCall.tx, outOfGasCall.txr, findings);
    expect(findings.get("outOfGas")).to.equal(true);
    expect(findings.get("gasUsed")).to.equal(1000000);
    expect(findings.get("gas")).to.equal(1000000);
  });

  it('Not out of Gas', () => {
    let insp: Inspectors.OutOfGasInsp = new Inspectors.OutOfGasInsp();
    let findings = new Map<String, Object>();

    insp.inspect(deployContractCall.tx, deployContractCall.txr, findings);
    expect(findings.get("outOfGas")).to.equal(false);
    expect(findings.get("gasUsed")).to.equal(171761);
    expect(findings.get("gas")).to.equal(4700000);
  });

  it('Contract create should be detected', () => {
    let insp: Inspectors.ContractCreateInsp = new Inspectors.ContractCreateInsp();
    let findings = new Map<String, Object>();

    insp.inspect(deployContractCall.tx, deployContractCall.txr, findings);
    expect(findings.get("createContract")).to.equal(true);
  });

  it('MethodNameInsp. With Param', () => {
    let insp: Inspectors.MethodNameInsp = new Inspectors.MethodNameInsp(abiPath, addEntryCall.txr.to);
    let findings = new Map<String, Object>();

    insp.inspect(addEntryCall.tx, addEntryCall.txr, findings);

    expect(findings.get("methodName")).to.equal("addEntry");

    expect(findings.get("paramN0")).to.equal("key");
    expect(findings.get("paramV0")).to.equal("1");
    expect(findings.get("paramT0")).to.equal("uint256");

    expect(findings.get("paramN1")).to.equal("data");
    expect(findings.get("paramV1")).to.equal("0x6f6b000000000000000000000000000000000000000000000000000000000000");
    expect(findings.get("paramT1")).to.equal("bytes32");
  });

  it('MethodNameInsp. With Param. But wrong ABI', () => {
    let insp: Inspectors.MethodNameInsp = new Inspectors.MethodNameInsp(abiPath, addEntryCall.txr.to);
    let findings = new Map<String, Object>();

    //modify the input. So that the method signature doesn't match anymore
    addEntryCall.tx.input = "0xffa584b000000000000000000000000000000000000000000000000000000000000000016f6b000000000000000000000000000000000000000000000000000000000000"
    insp.inspect(addEntryCall.tx, addEntryCall.txr, findings);
    expect(findings.get("methodName")).to.equal("Method Hash not found in the ABI!");
  });

  it('MethodNameInsp. Check method without parameters', () => {
    let insp: Inspectors.MethodNameInsp = new Inspectors.MethodNameInsp(abiPath, outOfGasCall.txr.to);
    let findings = new Map<String, Object>();

    insp.inspect(outOfGasCall.tx, outOfGasCall.txr, findings);
    expect(findings.get("methodName")).to.equal("outOfGas");
    expect(findings.size).to.equal(1);
  });

  it('MethodSignatureInsp. Check signature from method name', () => {
    let insp: Inspectors.MethodSignatureInsp = new Inspectors.MethodSignatureInsp();
    let findings = new Map<String, Object>();

    insp.inspect(outOfGasCall.tx, outOfGasCall.txr, findings);
    expect(findings.get("methodSig")).to.equal("0x31fe52e8");
  });
});
