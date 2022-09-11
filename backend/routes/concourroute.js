const express = require('express');
const router = express.Router();
// const employeAuth = require("../middlewares/employeAuth");
// const adminAuth = require("../middlewares/adminAuth");
const concourController = require("../controllers/concourController");

router.get('/all',concourController.getAllConcour)
router.post('/add',concourController.AddConcour)
// router.get('/:id',employeAuth,concourController.getreunionByIdemp)
router.put('/:id',concourController.updateConcour)
// router.delete('/:id',adminAuth,concourController.deleteReunion)
// router.get('/count/all/:date',concourController.detail)
// router.get('/count/id/:id/:date',concourController.detailbyid)
module.exports = router 