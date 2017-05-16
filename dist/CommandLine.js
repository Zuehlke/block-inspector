"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUsage = require('command-line-usage');
const commandLineArgs = require('command-line-args');
const Configuration = require("./Configuration");
// TODO: https://www.npmjs.com/package/command-line-args
// TODO: https://www.npmjs.com/package/command-line-usage
class CommandLine {
    constructor() {
        this.sections = [
            {
                header: 'Block Inspector',
                content: 'Inspects smart contract interactions in real time'
            },
            {
                header: 'Options',
                optionList: [
                    {
                        name: 'abiPath',
                        typeLabel: '[underline]{file}',
                        description: 'The relative or absolute path to the contracts ABI File'
                    },
                    {
                        name: 'address',
                        typeLabel: '[underline]{address}',
                        description: 'The address of the contract. Starts with 0x...'
                    },
                    {
                        name: 'rpcUrl',
                        description: 'RPC URL. Default value: http://localhost:8545/'
                    }
                ]
            },
            {
                header: 'Examples',
                content: [
                    {
                        desc: 'Inspect specific contract interaction. With method name enrichment',
                        example: 'npm run start --abiPath ./contract.abi --address 0x12..a3'
                    },
                    {
                        desc: 'Inspect all contract interactions. But no method name enrichment',
                        example: 'npm run start'
                    }
                ]
            },
            {
                header: 'Project Home',
                content: '[underline]{https://github.com/Zuehlke/block-inspector}'
            }
        ];
        this.optionDefinitions = [
            { name: 'abiPath', type: String, multiple: false },
            { name: 'address', type: String, multiple: false },
            { name: 'rpcUrl', type: String, multiple: false },
        ];
        this.usage = getUsage(this.sections);
    }
    showHelp() {
        console.log(this.usage);
    }
    getConfiguration() {
        const options = commandLineArgs(this.optionDefinitions);
        var cfg = Configuration.Configuration.createDefault();
        if (options.abiPath) {
            cfg.abiPath = options.abiPath;
        }
        if (options.address) {
            cfg.address = options.address;
        }
        if (options.rpcUrl) {
            cfg.rpcUrl = options.rpcUrl;
        }
        console.log("Configuration: ", cfg);
        return cfg;
    }
}
exports.CommandLine = CommandLine;
//# sourceMappingURL=CommandLine.js.map