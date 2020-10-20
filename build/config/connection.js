"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const env_1 = require("./env");
const MONGODB_URI = 'mongodb://localhost:27017/';
const MONGODB_DB_MAIN = 'users_db';
const MONGO_URI = `${env_1.default.database.MONGODB_URI}${env_1.default.database.MONGODB_DB_MAIN}`;
const connectOptions = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
exports.default = mongoose.createConnection(MONGO_URI, connectOptions);
