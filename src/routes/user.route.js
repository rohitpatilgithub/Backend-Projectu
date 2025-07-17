import express from 'express';
import { deleteUser, getUser, getUserById, postUser, updateUser } from '../controller/user.controller.js';
import { authMiddlewareForAPI } from '../middleware/auth01.js';

const routes = express.Router();

routes.get('/',authMiddlewareForAPI,getUser);

// routes.get('/:id',userVerify,userById);

routes.get('/:id',authMiddlewareForAPI,getUserById);

routes.post('/',authMiddlewareForAPI,postUser);

routes.put('/:id',authMiddlewareForAPI,updateUser);

routes.delete('/:id',authMiddlewareForAPI,deleteUser);

export default routes;