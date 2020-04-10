import { Request, Response } from 'express';
import { ERROR_STATUS } from '../constants/error';
import { EventService } from '../services';

export class EventController {
    constructor(private service: EventService) {}

    addEvent = async (req: Request, res: Response) => {
        const {
            contact,
            description,
            image,
            scheduledDate,
            title,
            venue,
        } = req.body;

        if (!(title && contact && scheduledDate && venue))
            return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.addEvent({
            contact,
            description,
            image,
            scheduledDate,
            title,
            venue,
        });

        res.send(data);
    };

    getEvents = async (req: Request, res: Response) => {
        const data = await this.service.getEvents();

        res.send(data);
    };

    deleteEvent = async (req: Request, res: Response) => {
        const { eventId } = req.body;

        if (!eventId) return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.deleteEvent({ eventId });

        res.send(data);
    };
}
