const Condidate = require("../models/condidate");
require('dotenv').config()
const nodemailer =require('nodemailer');
const multer=require('multer');
const condidate = require("../models/condidate");
// const uuid =require('uuid').v4;
exports.getAllCondidate = (req, res) => {
    try {
        Condidate.find((err, result)=> {
          if (result)return res.status(200).json(result)
          if(err) return res.status(400).json({ message: "Erreur" });
        })
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message|| "erreur du serveur." });
      }
}
exports.getCondidateByid = (req, res) => {
    try {
        Condidate.findById(req.params.id,(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "Aucun candidat trouvé" })
        })
    } catch (e) {
        res.status(500).send({ message: e || "erreur du serveur." });
    }
}

exports.deleteCondidate= (req, res) => { 

    try {
        Condidate.findByIdAndDelete(req.params.id, (err, result)=> {
            if (result) return res.status(200).json({ message: "supprition avec succès"})
            if(err) return res.status(400).json({ message: "Erreur" });
            
        })
    } catch (e) {
        res.status(500).json({ message: e });
    }
}



exports.accepter= (req, res) => { 
  
    try{
let mailTransport = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user: process.env.MAILER_EMAIL_ID, // generated ethereal user
        pass: process.env.MAILER_PASSWORD
  }
})

let details={
  from :"rhormiga.recrutement@gmail.com",
  to:req.body.email,
  subject:"Invitation à un entretien au service Hormiga",
  html:"<h4>Bonjour,</h4>"+ "<p >Merci de votre condidature.</p>"+"<p>Votre candidature pour le poste nous a marqué et nous aimerions vous inviter à une entretient à notre bureau. <br> Nous aimerions mener votre entretien dans  la semaine prochaine. <br>Je vous enverrai une invitation une fois que j'aurai reçu le calendrier de disponibilité des managers.",
}
mailTransport.sendMail(details,(err)=>{
  if(err){
      
    res.status(500).json({ message: "il y a  problème" });
  }
  else{
    
    res.status(200).json({ message:"e-mail est envoyée" });
  }
})}
catch (e) {
    res.status(500).json({ message: e });
}
}
exports.refuser= (req, res) => { 
    try{
let mailTransport = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user: process.env.MAILER_EMAIL_ID, 
        pass: process.env.MAILER_PASSWORD
  }
})

let details={
  from :"rhormiga.recrutement@gmail.com",
  to:req.body.email,
  subject:"Réponse à la demande au RHormiga  ",
html: "<h4>Bonjour,</h4>"+ "<p >Merci de votre condidature.</p>"+"<p >Après avoir examiné votre demande, nous avons le regret de vous informer que nous ne recherchons pas actuellement cette expérience.<br> Bien sûr, nous conserverons votre dossier et ne manquerons pas de vous contacter si une occasion se présente. </p>"+"<p>"+"Nous vous demandons d’accepter l’expression de nos meilleures salutations.</p>"+"<br>"+"<p>meilleures salutations.</p>",
}
mailTransport.sendMail(details,(err)=>{
  if(err){
      
    console.log("il y a problème",err)
    res.status(500).json({ message: "il y a problème" });
  }
  else{
   
    res.status(200).json({ message:"e-mail est envoyée" });
  }
})}
catch (e) {
    res.status(500).json({ message: e });
}
}

exports.detail = (req, res) => {
  
  try {
      condidate.count(function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json( result);
          }
        });
    } catch (e) { 
      console.error(e);
      res.status(500).json({ message: e.message|| "erreur du serveur." });
    }}
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
  

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './file_uploads')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+ file.originalname.replace(' ','_'));
  }
})
const upload = multer({ storage: storage }).array('file',2);

exports.AddCondidate = (req, res) => {
  // console.log("files",req.files);
   upload(req, res, (err) => {
    console.log("dddddddddddddddd",req.body);
    req.body.cv=req.files[0]?.filename;
    req.body.lettre=req.files[1]?.filename;
    console.log("cvvvvvvvvvv",req.body.cv);
    console.log("lettre",req.body.lettre);
    console.log("bbbbody",req.body);
    Condidate(req.body).save().then(data => {
      
      return res.status(200).json({ message: req.body.cv});
      
    }).catch(err => {
      res.status(500).send({ message: err.message || "erreur d'ajout." });
    })
  })
}

exports.getfile = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/file_uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Impossible de télécharger le fichier." + err,
      });
    }
  })
}