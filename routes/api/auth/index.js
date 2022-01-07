import express from 'express';

import {
  registration,
  login,
  logout,
} from '../../../controllers/auth/index.js';

// import {
//   validationNewContact,
//   validationUpdateContact,
//   validationId,
//   validationUpdateFavorite,
// } from './validation';

const router = express.Router();

router.post('/signup', registration);
router.post('/login', login);
// router.get('/login', current);
router.get('/logout', logout);

export default router;
