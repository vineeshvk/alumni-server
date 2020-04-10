import { Request, Response } from 'express';
import { ERROR_STATUS } from '../constants/error';
import { CollegeService } from '../services/college';

export class CollegeController {
    constructor(private service: CollegeService) {}

    addCollege = async (req: Request, res: Response) => {
        const { address, affiliated, district, name, state } = req.body;

        if (!(address && affiliated && district && name && state))
            return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.addCollege({
            address,
            affiliated,
            district,
            name,
            state,
        });

        res.send(data);
    };

    getColleges = async (req: Request, res: Response) => {
        const data = await this.service.getColleges();

        res.send(data);
    };

    deleteCollege = async (req: Request, res: Response) => {
        const { collegeId } = req.body;

        if (!collegeId) return res.send({ error: ERROR_STATUS.INPUT_MISSING });

        const data = await this.service.deleteCollege({ collegeId });
        res.send(data);
    };
}
