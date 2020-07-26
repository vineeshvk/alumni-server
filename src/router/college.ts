import { Router } from 'express';
import { CollegeController } from '../controllers/college';
import { CollegeService } from '../services/college';

const collegeRouter = Router();

const service = new CollegeService();
const college = new CollegeController(service);

collegeRouter.get('/', college.getColleges);

collegeRouter.delete('/', college.deleteCollege);
collegeRouter.post('/', college.addCollege);

export { collegeRouter };
