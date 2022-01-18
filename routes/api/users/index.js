import { Router } from 'express';
import guard from '../../../middlewares/guard';
import { upload } from '../../../middlewares/upload';
import { uploadAvatar } from '../../../controllers/users/index';

const router = new Router();

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar);

export default router;
