const express = require('express');
const router = express.Router();

import userController from '../controllers/UserController';


router.post('/login', userController.login);
router.post('/register', userController.handleRegisterUser);
router.get('/get-all-user-limit', userController.getAllUserLimit)
router.delete('/delete-user', userController.handleDeleteUser)
router.put('/edit-user',userController.handleEditUser)

router.use('/', userController.index)

export default router;