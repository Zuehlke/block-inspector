import * as ContractObserve from './ContractObserve';
import * as Configuration from './Configuration';


new ContractObserve.ContractObserve(Configuration.Configuration.createDefault()).startScanning();