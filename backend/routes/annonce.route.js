const express = require('express');
const router = express.Router();

const adminAuth = require("../middlewares/adminAuth");

const annonceController = require("../controllers/annonceController");

router.get('/all',annonceController.getAllannonce)
router.post('/add',adminAuth,annonceController.AddAnnonce)
router.delete('/:id',adminAuth,annonceController.deleteAnnonce)
router.put('/:id',adminAuth,annonceController.updateAnnonce)
router.get('/count/all',annonceController.detail)
module.exports = router 