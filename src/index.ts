import * as ContractObserve from './ContractObserve';
import * as Configuration from './Configuration';


new ContractObserve.ContractObserve(Configuration.Configuration.createDefault()).startScanning(); //first contract: 0x0be1427087970611dc9ba30f617bd5d3e73593c2