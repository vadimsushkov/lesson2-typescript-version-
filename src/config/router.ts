import * as express from 'express';
import * as http from 'http';
import * as swaggerUi from 'swagger-ui-express';
import AuthRouter from '../components/Auth/router';
import UserRouter from '../components/User/router';
let swaggerDoc: Object;

    swaggerDoc = require('../../swagger.json');

export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use('/v1/users', UserRouter);
    app.use('/v1/auth', AuthRouter);


    app.use('/docs', swaggerUi.serve);
    app.get('/docs', swaggerUi.setup(swaggerDoc));


    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    app.use(router);
}