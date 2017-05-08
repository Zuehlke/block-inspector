"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const debug = require("debug");
const App = require("./App");
const ContractObserve = require("./ContractObserve");
debug('ts-express:server');
const port = 3001;
App.default.set('port', port);
const server = http.createServer(App.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
new ContractObserve.ContractObserve("0x323230accd10982a59c26d74e2abf5424d6a3c2a").observe(); //first contract: 0x0be1427087970611dc9ba30f617bd5d3e73593c2
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
//# sourceMappingURL=index.js.map