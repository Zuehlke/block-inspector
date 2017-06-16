const getUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args');
import * as Configuration from './Configuration';

// TODO: https://www.npmjs.com/package/command-line-args
// TODO: https://www.npmjs.com/package/command-line-usage
export class CommandLine {
  private sections: Object = [
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
          desc: 'Start block-inspector',
          example: 'block-inspector --abiPath ./contract.abi --address 0x12..a3'
        }
      ]
    },
    {
      header: 'Project Home',
      content: '[underline]{https://github.com/Zuehlke/block-inspector}'
    }
  ];

  private optionDefinitions = [
    { name: 'abiPath', type: String, multiple: false },
    { name: 'address', type: String, multiple: false },
    { name: 'rpcUrl', type: String, multiple: false },
    //  { name: 'block', type: String, multiple: false },
    //  { name: 'help', alias: 'h', type: Boolean }
  ]

  private usage = getUsage(this.sections);

  public showHelp(): void {
    console.log(this.usage);
  }

  public getConfiguration(): Configuration.Configuration {
    const options = commandLineArgs(this.optionDefinitions);

    var cfg = Configuration.Configuration.createDefault();
    if (options.abiPath) {
      cfg.abiPath = options.abiPath;
    }

    if (options.address) {
      cfg.address = options.address
    }

    if (options.rpcUrl) {
      cfg.rpcUrl = options.rpcUrl;
    }

    console.log("Configuration: ", cfg);
    return cfg;
  }

}