import { Router } from 'express';
import guard from '../../../middlewares/guard';
import { upload } from '../../../middlewares/upload';
import {
  uploadAvatar,
  verifyUser,
  repeatEmailForVrifyUser,
} from '../../../controllers/users/index';

import { validateResendCredentials } from './validation';

const router = new Router();

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar);
router.get('/verify/:token', verifyUser);
router.post('/verify', validateResendCredentials, repeatEmailForVrifyUser);

export default router;
