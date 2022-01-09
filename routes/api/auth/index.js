import express from 'express';

import guard from '../../../middlewares/guard';

import {
  registration,
  login,
  logout,
  current,
  updateSubscription,
} from '../../../controllers/auth/index.js';

import {
  validateRegCredentials,
  validateLogCredentials,
  validateToken,
  validateUpdateSubscription,
} from './validation';

const router = express.Router();

router.post('/signup', validateRegCredentials, registration);
router.post('/login', validateLogCredentials, login);
router.get('/current', guard, validateToken, current);
router.get('/logout', guard, logout);
router.patch('/', guard, validateUpdateSubscription, updateSubscription);

export default router;
