import { Router } from 'express';
import { EventController } from '../controllers';
import { EventService } from '../services';

const eventRouter = Router();

const service = new EventService();
const event = new EventController(service);

export { eventRouter };
