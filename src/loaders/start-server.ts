import * as express from 'express';
import { DBConnection } from './db-connect';
import bodyParser = require('body-parser');

export async function startServer(router: express.Router, port: number) {
    const app = express();
    app.use(bodyParser.json());
    app.use('/', router);
    await DBConnection.getConnection();

    app.listen(process.env.PORT || port, () => {
        console.log('Server connected');
    });
}
