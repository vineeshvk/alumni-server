import { Router } from 'express';
import { AlumniController } from '../controllers';
import { AlumniService } from '../services';

const alumniRouter = Router();

const service = new AlumniService();
const alumni = new AlumniController(service);

alumniRouter.get('/getAlumni', alumni.getAlumni);

alumniRouter.post('/login', alumni.login);
alumniRouter.post('/register', alumni.register);
alumniRouter.post('/approveAlumni', alumni.approveAlumni);
alumniRouter.put('/editAlumniDetails', alumni.editAlumniDetails);

export { alumniRouter };
