"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const serverHandlers = require("./events");
const server_1 = require("./server");
const Server = http.createServer(server_1.default);
Server.listen(server_1.default.get('port'));
Server.on('error', (error) => serverHandlers.onError(error, server_1.default.get('port')));
Server.on('listening', serverHandlers.onListening.bind(Server));
