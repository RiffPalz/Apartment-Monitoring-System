import express from 'express';
import { createUser, getAllUsers} from '../controllers/userController.js';

const router = express.Router();

// Create new user
router.post('/create', createUser);

//  Get all users
router.get('/list', getAllUsers);



export default router;