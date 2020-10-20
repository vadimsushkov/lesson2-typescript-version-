"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const router_1 = require("../components/Auth/router");
const router_2 = require("../components/User/router");
let swaggerDoc;
swaggerDoc = require('../../swagger.json');
function init(app) {
    const router = express.Router();
    app.use('/v1/users', router_2.default);
    app.use('/v1/auth', router_1.default);
    app.use('/docs', swaggerUi.serve);
    app.get('/docs', swaggerUi.setup(swaggerDoc));
    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });
    app.use(router);
}
exports.init = init;
