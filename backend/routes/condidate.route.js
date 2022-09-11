const express = require('express');
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth");

const condidateController = require("../controllers/condidateController");

router.get('/all',condidateController.getAllCondidate)
router.post('/add',condidateController.AddCondidate)
router.get('/:id',condidateController.getCondidateByid)
router.post('/accepter',condidateController.accepter)
router.post('/refuser',condidateController.refuser)
router.get('/file/:name',condidateController.getfile)
router.delete('/:id',condidateController.deleteCondidate)
router.get('/count/all',adminAuth,condidateController.detail)
 router.put('/:id',condidateController.updateEmploye)
module.exports = router