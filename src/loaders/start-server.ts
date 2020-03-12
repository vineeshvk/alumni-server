import * as express from 'express';
import { connectDB } from './connect-db';
const cors = require('cors');

export async function startServer(router: express.Router, port: number) {	
    const app = express();
    app.use(cors())
    app.use('/', router);

    await connectDB();

    app.listen(process.env.PORT || port, () => {
        console.log('Server connected');
    });
}
