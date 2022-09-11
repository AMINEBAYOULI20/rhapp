const express = require('express');
const router = express.Router();
const employeAuth = require("../middlewares/employeAuth");
const adminAuth = require("../middlewares/adminAuth");
const reunionController = require("../controllers/reunionController");

router.get('/all',adminAuth,reunionController.getAllReunion)
router.post('/add',reunionController.AddReunion)
router.get('/:id',employeAuth,reunionController.getreunionByIdemp)
router.put('/:id',adminAuth,reunionController.updateReunion)
router.delete('/:id',adminAuth,reunionController.deleteReunion)
router.get('/count/all/:date',reunionController.detail)
router.get('/count/id/:id/:date',reunionController.detailbyid)
module.exports = router 