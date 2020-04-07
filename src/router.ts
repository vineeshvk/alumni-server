import { Router } from 'express';
import { AlumniController } from './controllers';
import { AlumniService } from './services';

const router = Router();

const service = new AlumniService();
const alumni = new AlumniController(service);

router.get('/getAlumni', alumni.getAlumni);

router.post('/login', alumni.login);
router.post('/register', alumni.register);
router.post('/approveAlumni', alumni.approveAlumni);
router.put('/editAlumniDetails', alumni.editAlumniDetails);

export { router };
