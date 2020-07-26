import { Router } from 'express';
import { AlumniController } from '../controllers';
import { AlumniService } from '../services';

const alumniRouter = Router();

const service = new AlumniService();
const alumni = new AlumniController(service);

alumniRouter.get('/', alumni.getAlumni);

alumniRouter.post('/login', alumni.login);
alumniRouter.post('/register', alumni.alumniRegister);
alumniRouter.post('/register/admin', alumni.adminRegister);
alumniRouter.post('/approve', alumni.approveAlumni);
alumniRouter.post('/emailexists', alumni.emailAlreadyExists);

alumniRouter.put('/', alumni.editAlumniDetails);

export { alumniRouter };
