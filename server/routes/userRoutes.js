import express from 'express';
const routes = express.Router();
import { registerUser, loginUser, allUser, logoutUser } from '../controller/userConrtroller.js';
import { verifyToken } from '../auth/verifyToken.js'

routes.post('/login', loginUser);
routes.post('/register', registerUser);
routes.post('/logout', logoutUser);
routes.get('/', verifyToken, allUser);

export default routes;