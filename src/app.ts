import { startServer } from './loaders/start-server';
import { router } from './router';


startServer(router, 3000);
