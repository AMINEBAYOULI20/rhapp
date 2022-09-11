
const Employe = require("../models/employee")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const employee = require("../models/employee");


exports.register =async (req, res) => {
    if (req.body.email != "" && req.body.password.length > 6) {
      try {
        const email=req.body.email
        const password = req.body.password
        // cryptage
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(password, salt);
        // email mawjoud walla
        let userInformations =await Employe.findOne({ email });
        
        if (userInformations) return res.status(400).json({ message: "Le compte existe déja !!! " });
        Employe(req.body).save().then(data => {
            console.log(data);
            if(data) return res.status(200).json({ message: 'compté ajoutée'});
        }).catch(err=>{
            return res.status(200).json({ message: "erreur d'ajout"});
        })
        //   const payload = {
        
      } catch (error) {
        res.status(500).json({
          message: error.message || "erreur du serveur."
        });
      }
    }
  }
  exports.signin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      let userInformations = await Employe.findOne({ email });
      if (!userInformations) return res.status(404).json({ message: "Le compte n'existe pas ou a été supprimé" });
      if (!bcrypt.compareSync(password, userInformations.password))return res.status(400).json({message: "Mot de passe incorrect !"});

        const payload = {
          employe: {
            id: userInformations.id,
            nom: userInformations.nom,
            prenom: userInformations.prenom,
            role: userInformations.role,
            
          }
        };
        const Token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY)
        return res.status(200).json({message:"Connexion réussie",Token: Token});
    } catch (e) {
      console.error(e);
      res.status(500).json({message: "erreur du serveur."});
    }
  }
  exports.signout = (req, res) => {
    const token = req.header("token");
    // console.log("llllllllll",token);

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      Employe.findByIdAndUpdate(decoded.employe.id, { DeconnectionTime: Date.now() }, (err, result)=> {
        if (err) return res.status(404).json({ message: "l'utilisateur n'existe pas" })
        res.status(200).json({ message: "Déconnexion avec succès !" })
      })
    } catch (e) {
      res.status(500).json({ message: "erreur du serveur." });
    }
  }
  
  exports.changePassword = async (req, res) => {
    // console.log("id",req.body.id);
    try {
      const userInformations=await Employe.findById(req.body.id)
      if (!bcrypt.compareSync(req.body.password, userInformations.password))return res.status(400).json({message: "Mot de passe incorrect !"});
      if (bcrypt.compareSync(req.body.newPassword, userInformations.password)) return res.status(400).json({ message: "Veuillez ne pas utiliser le même mot de passe" });
      const salt = bcrypt.genSaltSync(10);
      const newPassword = bcrypt.hashSync(req.body.newPassword, salt);
      Employe.findByIdAndUpdate(req.body.id,{password:newPassword,passwordChangeDate: Date.now()},(err,result)=>{
        if (err) res.status(400).json({ message: "erreur le mot de passe peut être modifié" });
        if (result)return res.status(200).json({ message: "Votre mot de passe a été changé avec succès" })
      })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "erreur du serveur." });
      
    }
  }
  exports.resetPassword = async (req, res) => {
    const token = req.header("token");
    if (!token) { return res.status(401).json({ message: "Veuillez utiliser le lien dans votre e-mail pour réinitialiser votre mot de passe" }); }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (!decoded) return res.status(401).json({ message: "Veuillez utiliser un jeton valide" });
    if (decoded.user.sub != "réinitialiser le mot de passe") return res.status(401).json({ message: "Veuillez utiliser un jeton valide" });
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    let userInformations = await Employe.findById(decoded.user.userId)
    if (bcrypt.compareSync(req.body.password, userInformations.password)) return res.status(400).json({ message: "Veuillez ne pas utiliser le même mot de passe" });
    Employe.findByIdAndUpdate(decoded.user.userId, { $set: { password: password, passwordChangeDate: Date.now(), DeconnectionTime: Date.now() } }, function (err, result) {
      if (result) return res.status(200).json({ message: "Votre mot de passe a été changé avec succès" })
      return res.status(400).json({ message: 'Erreur de vérification par e-mail' });
    })
  };
 
  exports.forgotPassword = async (req, res) => {
    const email= req.body.email;
 
    try {
      if (req.body == null) return res.status(404).json({ message: "Adresse e-mail obligatoire!" });
      let user = await Employe.findOne({email: email });
      // console.log("user",user);
      if (!user) return res.status(404).json({ message: "Le compte n'existe pas ou a été supprimé" });
 
      const payload = {
        user: {
          userId: user.id,
          sub: "réinitialiser le mot de passe"
        }
      };
  
      const Token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '10m' })
  
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        // true for 465, false for other ports
        auth: {
          user: process.env.MAILER_EMAIL_ID, // generated ethereal user
          pass: process.env.MAILER_PASSWORD // generated ethereal password
        },
      });
      let url = `http://localhost:4200/reset-password/${Token}`
      var mailOptions = {
        from: 'rhormiga.recrutement@gmail.com',
        to:email,
        subject: 'Réinitialiser le mot de passe',
        html: "<h1>Bonjour " + user.nom + "</h1> <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe</p>"
          + `<a href="${url}" style="background-color: #3498DB;color: white;padding: 14px;text-align: center;text-decoration: none;
        border-radius:8px;font-size:1.5rem;">
        Réinitialiser le mot de passe</a>`+ "<p style='color:#E74C3C;'>Ce lien expirera dans 10</p>"
  
      };
  
      transporter.sendMail(mailOptions)
     
      return res.status(200).json({
        
        message: 'E-mail de vérification envoyé Vérifiez votre boîte aux lettres'
      });
    } catch (err) {
      res.status(500).json({ message: err.message || "erreur du serveur." });
    }
  }