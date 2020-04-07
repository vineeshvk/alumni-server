import { Request, Response } from 'express';
import { ERROR_STATUS } from '../constants/error';
import { MessageService } from '../services';

export class MessageController {
    constructor(private service: MessageService) {}

    addMessage = (req: Request, res: Response) => {
        const { alumniId, isAlumni, text } = req.body;

        if (!(alumniId && text))
            return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        this.service.addMessage({ alumniId, isAlumni, text });
    };
}
