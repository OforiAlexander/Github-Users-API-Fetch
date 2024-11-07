import express from 'express';
import UserController from '../controllers/UsersController.js';
import { validateFetchUsers } from '../validate.js';

const router = express.Router();

router.post('/users', validateFetchUsers, UserController.fetchAndStoreUsers);

router.get('/users', UserController.getUsers);

export default router;