import { Request, Response } from 'express';
import { ERROR_STATUS } from '../constants/error';
import { MessageService } from '../services';

export class MessageController {
    constructor(private service: MessageService) {}

    addMessage = async (req: Request, res: Response) => {
        const { alumniId, isAlumni, text } = req.body;

        if (!(alumniId && text))
            return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.addMessage({
            alumniId,
            isAlumni,
            text,
        });
        res.send(data);
    };

    getMessages = async (req: Request, res: Response) => {
        const { alumniId } = req.query;

        if (!alumniId) return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.getMessages({ alumniId });
        res.send(data);
    };
}
