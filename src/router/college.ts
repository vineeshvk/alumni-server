import { Router } from 'express';
import { CollegeController } from '../controllers/college';
import { CollegeService } from '../services/college';

const collegeRouter = Router();

const service = new CollegeService();
const college = new CollegeController(service);

export { collegeRouter };
