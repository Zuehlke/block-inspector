import * as mocha from 'mocha';
import * as chai from 'chai';
import * as Inspectors from '../src/Inspectors';
var outOfGas = require("./resources/out-of-gas.json");
var deployContract = require("./resources/deploy-contract.json");
const expect = chai.expect;

describe('Inspectors tests', () => {

  it('Check the common props', () => {
    let insp: Inspectors.CommonPropsInsp = new Inspectors.CommonPropsInsp();
    let findings = new Map<String, Object>();

    insp.inspect(outOfGas.tx, outOfGas.txr, findings);
    expect(findings.get("txHash")).to.equal("0x5ed62e17b9127aa749dace8c866a5b88fe132a5afe203d915f9f9d4469a7de5b");
    expect(findings.get("blockNumber")).to.equal(25);
  });

  it('Out of Gas', () => {
    let insp: Inspectors.OutOfGasInsp = new Inspectors.OutOfGasInsp();
    let findings = new Map<String, Object>();

    insp.inspect(outOfGas.tx, outOfGas.txr, findings);
    expect(findings.get("outOfGas")).to.equal(true);
    expect(findings.get("gasUsed")).to.equal(1000000);
  });

  it('Not out of Gas', () => {
    let insp: Inspectors.OutOfGasInsp = new Inspectors.OutOfGasInsp();
    let findings = new Map<String, Object>();

    insp.inspect(deployContract.tx, deployContract.txr, findings);
    expect(findings.get("outOfGas")).to.equal(false);
    expect(findings.get("gasUsed")).to.equal(171761);
  });

  it('Contract create should be detected', () => {
    let insp: Inspectors.ContractCreateInsp = new Inspectors.ContractCreateInsp();
    let findings = new Map<String, Object>();

    insp.inspect(deployContract.tx, deployContract.txr, findings);
    expect(findings.get("createContract")).to.equal(true);
  });
});
