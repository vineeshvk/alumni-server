import { Request, Response } from 'express';
import { ERROR_STATUS } from '../constants/error';
import { AlumniService } from '../services/alumni';

export class AlumniController {
    async login(req: Request, res: Response) {
        const service = new AlumniService();
        const { email, password } = req.body;

        if (!(email && password)) return { error: ERROR_STATUS.INPUT_MISSING };

        const data = await service.login({ email, password });
        res.send(data);
    }

    async register(req: Request, res: Response) {
        const service = new AlumniService();

        const { email, name, password } = req.body;

        if (!(email && name && password))
            return { error: ERROR_STATUS.INPUT_MISSING };

        // const feed = new Feed();
        // feed.description = 'sd';
        // feed.image = 'sfew';
        // feed.title = 'werwer';

        // const connect = await DBConnection.getConnection();
        // await connect.manager.save(feed);

        // const feed = Feed.create({
        //     description: 'sdf',
        //     image: 'sdfds',
        //     title: 'sdf',
        // });
        // await feed.save();
        const data = await service.register({ email, name, password });
        res.send(data);
    }

    async getAlumni(req: Request, res: Response) {
        const service = new AlumniService();

        const data = await service.getAlumni(req.query);
        res.send(data);
    }

    async approveAlumni(req: Request, res: Response) {
        const service = new AlumniService();

        const { id } = req.params;

        if (!id) return { error: ERROR_STATUS.INPUT_MISSING };

        const data = await service.approveAlumni({ id });
        res.send(data);
    }
}
