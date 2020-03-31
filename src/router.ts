import { Router } from 'express';
import { AlumniController } from './controllers/alumni';

const router = Router();

const alumni = new AlumniController();

router.get('/getAlumni', alumni.getAlumni);

router.post('/login', alumni.login);
router.post('/register', alumni.register);
router.post('/approveAlumni', alumni.approveAlumni);
router.put('/editAlumniDetails', alumni.editAlumniDetails);

export { router };
