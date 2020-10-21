import * as express from 'express';
import * as Middleware from '../config/middleware';
import * as Route from '../config/router';

/**
 * @constant {express.Application}
 */
const app: express.Application = express();

/** 
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Route.init(app);

/**
 * @constructs express.Application Error Handler
 */


/**
 * sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);

/**
 * sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('secret', process.env.SECRET || 'superSecret');

/**
 * @exports {express.Application}
 */
export default app;
