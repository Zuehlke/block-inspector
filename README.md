# Block Inspector 

Ethereum Block Inspector. Inspects a specific smart contract in real time. 

Features:
- Shows all transactions to the contract 
- Listening to all events
- "Out of gas" detection

Demo video on youtube:

[![Link to Youtube](https://img.youtube.com/vi/35cLpa20-Uw/0.jpg)](https://www.youtube.com/watch?v=35cLpa20-Uw)

Architectural overview:

![Overview](./docs/block-inspector-light.jpg)

## Installation
- NodeJS > v6.10

### Global installation
```bash
npm install -g block-inspector
block-inspector --abiPath contract.abi --address 0x123..
```

### Development
```bash

# At the first time
npm install

npm run test
npm run start

# Debugging with Visual Studio Code: Press F5. 
```
## Deplyoment
```bash
npm run test
npm run build
npm version patch
npm publish
```

## Notes
- [Ethereum records](./docs/records.md)