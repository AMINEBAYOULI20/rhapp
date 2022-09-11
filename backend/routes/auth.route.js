const express = require('express');
const router = express.Router();
// const Auth = require("../middlewares/auth");
// 
const authController = require("../controllers/authController");

router.post('/register',authController.register)
router.post('/login',authController.signin)
router.post('/logout',authController.signout)
router.post('/changePassword',authController.changePassword)
router.post('/forgot-password',authController.forgotPassword)
router.post('/reset-password',authController.resetPassword)
// router.delete('/:id',congeController.delete)
// router.put('/refuse/:id',congeController.refusemconge)
// router.put('/confirm/:id',congeController.confirmconge)

module.exports = router