import * as express from 'express';
import { collegeRouter, eventRouter, messageRouter } from '../router';
import { alumniRouter } from '../router/alumni';
import { DBConnection } from './db-connect';
import bodyParser = require('body-parser');

export async function startServer(port: number) {
    const app = express();
    app.use(bodyParser.json());

    app.use('/alumni', alumniRouter);
    app.use('/college', collegeRouter);
    app.use('/event', eventRouter);
    app.use('/message', messageRouter);

    await DBConnection.getConnection();

    app.listen(process.env.PORT || port, () => {
        console.log('Server connected');
    });
}
