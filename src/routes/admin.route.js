import express from 'express';
import { getAdmin, handleUserLogin, homePage, loginUser, postAdmin, singUpUser } from '../controller/admin.controller.js';
import { restrictToLoggedinUserOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup',postAdmin);
router.get('/signup',singUpUser);
router.post('/login',handleUserLogin);
router.get('/login',loginUser);
router.get('/index',restrictToLoggedinUserOnly,homePage)

export default router;