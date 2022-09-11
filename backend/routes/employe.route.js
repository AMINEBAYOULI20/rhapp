const express = require('express');
const router = express.Router();
const employeAuth = require("../middlewares/employeAuth");
const adminAuth = require("../middlewares/adminAuth");
const employeController = require("../controllers/employeController"); 

router.get('/all',adminAuth,employeController.getAllEmploye)
router.post('/image',employeAuth,employeController.AjoutImage)
router.get('/image/:name',employeController.getImage)
router.post('/add',adminAuth,employeController.AddEmploye)
router.get('/:id',employeAuth,employeController.getEmployeByid)
router.delete('/:id',adminAuth,employeController.deleteEmploye)
router.put('/:id',employeController.updateEmploye)
router.get('/count/all',adminAuth,employeController.detail)

module.exports = router 