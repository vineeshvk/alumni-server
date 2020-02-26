import * as express from 'express';
import { connectDB } from './connect-db';

export async function startServer(router: express.Router, port: number) {	
    const app = express();

    app.use('/', router);

    await connectDB();

    app.listen(process.env.SERVER_PORT || port, () => {
        console.log('Server connected');
    });
}
