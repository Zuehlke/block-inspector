"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContractObserve = require("./ContractObserve");
const CommandLine = require("./CommandLine");
var cmd = new CommandLine.CommandLine();
cmd.showHelp();
var configuration = cmd.getConfiguration();
new ContractObserve.ContractObserve(configuration).start();
//# sourceMappingURL=index.js.map