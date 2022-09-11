const Employe = require("../models/employee");
const bcrypt = require('bcryptjs')
const multer=require('multer')
exports.getAllEmploye = (req, res) => {

    try {
        Employe.find({role :{$ne:"ADMIN"}},(err, result)=> {
          if (result)return res.status(200).json(result)
          if(err) return res.status(400).json({ message: "Erreur" });
        })
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message|| "erreur du serveur." });
      }
}
exports.getEmployeByid = (req, res) => {
    try {
        Employe.find({_id:req.params.id},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "Aucun employé trouvé" })
        })
    } catch (e) {
        res.status(500).send({ message: e || "erreur du serveur" });
    }
}

exports.AddEmploye = (req, res) => {
    const password = req.body.password
    // cryptage
  
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);
    Employe(req.body).save().then(data => {
        return res.status(200).json({
            message: "employé est ajoutee"
        });
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "erreur du serveur."
        });
    })
}

exports.updateEmploye= (req, res) => {
    try {
        Employe.findByIdAndUpdate(req.params.id, { $set: { nom:req.body.nom, prenom:req.body.prenom ,cin:req.body.cin, date_nais:req.body.date_nais, role:req.body.role, salaire:req.body.salaire, adresse:req.body.adresse,email:req.body.email,tel:req.body.tel,genre:req.body.genre} }, (err, result)=> {
            if (result) return res.status(200).json({ message: "modification avec succès.",result})
            if(err) return res.status(400).json({ message: "Erreur" });
        })
    } catch (e) {
        res.status(500).json({ message: e });
    }
}

exports.deleteEmploye= (req, res) => { 
    try {
        Employe.findByIdAndDelete(req.params.id, (err, result)=> {
            if (result) return res.status(200).json({ message: "suppression avec succès"})
            if(err) return res.status(400).json({ message: "Erreur" });
            
        })
    } catch (e) {
        res.status(500).json({ message: e });
    }
}


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log(file);
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname.replace(' ', '_'));
    }
  })

  const fs = require('fs');
const employee = require("../models/employee");
  const upload = multer({ storage: storage }).single('image');
exports.AjoutImage = async (req, res) => {
  try {
    let userInformations = await Employe.findById(req.user);
    if(userInformations.images.url!="image-1651525461882profile.jpg"){
    fs.unlinkSync("uploads/"+userInformations.images.url)
    console.log("remove");}
  } catch(err) {
    console.error(err)
  }
    upload(req, res, (err) => {
      
      try {
        Employe.findByIdAndUpdate(req.user, { $set: { images: { url: req.file.filename, uploaded: Date.now() } } }, (err, result) => {
          if (result) res.status(200).json({ message:req.file.filename })
        })
      } catch (e) {
        res.status(500).send({ message: e.error || "erreur du serveur" });
      }
    }) 
  }
  exports.getImage = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/uploads/";
    
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Impossible de télécharger le fichier." + err,
        });
      }
    })
  }
  exports.detail = (req, res) => {
  
    try {
        employee.count({role :{$ne:"ADMIN"}},function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.json( result);
              // console.log("result",result);
            }
          });
      } catch (e) { 
        console.error(e);
        res.status(500).json({ message: e.message|| "erreur du serveur." });
      }
    
}