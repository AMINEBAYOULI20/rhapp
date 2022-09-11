const express = require('express');
const router = express.Router();
const employeAuth = require("../middlewares/employeAuth");
const adminAuth = require("../middlewares/adminAuth");
const congeController = require("../controllers/congeController");

router.get('/all',congeController.getAllConge)
router.get('/count',adminAuth,congeController.getnum)

router.get('/count/emp/:id',congeController.detail)
router.post('/add',employeAuth,congeController.AddConge)
router.get('/get/:id',congeController.getCongeByid)
router.get('/:id',employeAuth,congeController.getcongeByIdemp)
router.delete('/:id',congeController.delete)
router.put('/refuse/:id',adminAuth,congeController.refusemconge)
router.put('/confirm/:id',adminAuth,congeController.confirmconge)
router.put('/set/:id',employeAuth,congeController.updateConge)

module.exports = router   