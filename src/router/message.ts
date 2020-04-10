import { Router } from 'express';
import { MessageController } from '../controllers';
import { MessageService } from '../services';

const messageRouter = Router();

const service = new MessageService();
const message = new MessageController(service);

export { messageRouter };
