import * as ContractObserve from './ContractObserve';
import * as Configuration from './Configuration';
import * as CommandLine from './CommandLine';

var cmd = new CommandLine.CommandLine();
cmd.showHelp();
var configuration = cmd.getConfiguration();

new ContractObserve.ContractObserve(configuration).start();