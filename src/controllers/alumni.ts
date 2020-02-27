import { Response, Request } from "express";
import { AlumniService } from "../services/alumni";
import { ERROR_STATUS } from "../constants/error";
export class AlumniController {


    async login(req: Request, res: Response) {

        const service = new AlumniService();

        const { email, password } = req.params;

        if (!(email && password))
            return { error: ERROR_STATUS.INPUT_MISSING }

        const data = await service.login({ email, password });
        res.send(data);
    }

    async register(req: Request, res: Response) {
        const service = new AlumniService();

        const { email, name, password } = req.params

        if (!(email && name && password))
            return { error: ERROR_STATUS.INPUT_MISSING }

        const data = await service.register({ email, name, password })
        res.send(data)
    }

    async getAlumni(req: Request, res: Response) {
        const service = new AlumniService()

        const data = await service.getAlumni(req.params);
        res.send(data)
    }

    async approveAlumni(req: Request, res: Response) {
        const service = new AlumniService();

        const { id } = req.params

        if (!id)
            return { error: ERROR_STATUS.INPUT_MISSING }

        const data = await service.approveAlumni({ id });
        res.send(data)
    }
}