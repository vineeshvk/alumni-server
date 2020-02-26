import { Response, Request } from "express";
import { AlumniService } from "../services/alumni";
export class AlumniController {

    
    async login(req: Request, res: Response) {

        const service = new AlumniService();

        const email = req.param('email')
        const password = req.param('password')


        if (!(email && password))
            return { error: "Some inputs are missing" }

        const data = await service.login({ email, password });
        res.send(data);
    }

    async register(req: Request, res: Response) {
        const service = new AlumniService();

        const email = req.param('email')
        const name = req.param('name')
        const password = req.param('password')

        if (!(email && name && password))
            return { error: "Some inputs are missing" }

        const data = await service.register({ email, name, password })
        res.send(data)
    }

    async getAlumni(req: Request, res: Response) {
        const service = new AlumniService()
        
        const id = req.param("id")
        const data = await service.getAlumni({ id });
        res.send(data)
    }

    async approveAlumni(req: Request, res: Response) {
        const service = new AlumniService();

        const id = req.param("id")

        if (!id)
            return { error: "Some inputs are missing" }

        const data = await service.approveAlumni({ id });
        res.send(data)
    }
}