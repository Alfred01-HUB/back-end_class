const express= require('express');

const userController = require('../controller/userController')
//const { getAllUsers, getUserById } = require('../controllers/userController');
const router = express.Router();




router.post('/signup', userController.signup);
// router.patch('/signup', userController.signup);
// router.get('/login', userController.login);
router.post('/login', userController.login);
// router.post('/update-profile', userController.signup);
// router.post('/delete-user', userController.signup);
// router.get('/login', userController.login);
router.get('/getAllUsers',userController.getAllUsers);
router.get('/getUserById/:id',userController.getUserById);

module.exports = router;

