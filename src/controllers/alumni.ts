import { Request, Response } from 'express';
import { ERROR_STATUS } from '../constants/error';
import { AlumniService } from '../services';

export class AlumniController {
    constructor(private service: AlumniService) {}

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!(email && password))
            return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.login({ email, password });
        res.send(data);
    };

    alumniRegister = async (req: Request, res: Response) => {
        const {
            email,
            name,
            password,
            batch,
            collegeId,
            major,
            degree,
            dob,
            gender,
            phone,
            registerNo,
        } = req.body;

        if (
            !(
                email &&
                name &&
                password &&
                batch &&
                collegeId &&
                major &&
                degree &&
                dob &&
                gender &&
                phone &&
                registerNo
            )
        )
            return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.alumniRegister({
            email,
            name,
            password,
            batch,
            collegeId,
            major,
            degree,
            dob,
            gender,
            phone,
            registerNo,
        });

        res.send(data);
    };

    adminRegister = async (req: Request, res: Response) => {
        const { name, email, collegeId, password } = req.body;

        if (!(name && email && collegeId && password))
            return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.adminRegister({
            name,
            email,
            collegeId,
            password,
        });

        res.send(data);
    };

    getAlumni = async (req: Request, res: Response) => {
        const data = await this.service.getAlumni(req.query);
        res.send(data);
    };

    approveAlumni = async (req: Request, res: Response) => {
        const { id } = req.body;

        if (!id) return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.approveAlumni({ id });
        res.send(data);
    };

    editAlumniDetails = async (req: Request, res: Response) => {
        const { id, email, name, password } = req.body;

        if (!id || !(email || name || password))
            return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.editAlumniDetails({
            id,
            email,
            name,
            password,
        });

        res.send(data);
    };

    emailAlreadyExists = async (req: Request, res: Response) => {
        const { email } = req.body;

        const data = await this.service.emailAlreadyExists({ email });

        res.send(data);
    };
}
