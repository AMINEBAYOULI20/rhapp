const { status } = require("express/lib/response");

const Conge = require("../models/conge");
exports.AddConge = (req, res) => {
    Conge(req.body).save().then(data => {
        return res.status(200).json({
            message: "votre demande est ajoutée"
        });
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "erreur du serveur."
        });
    })
}
exports.getAllConge = (req, res) => {
    
    try {
        Conge.find((err, result)=> {
          if (result)return res.status(200).json(result)
          if(err) return res.status(400).json({ message: "Erreur" });
        
        }) 
      } catch (e) { 
        console.error(e);
        res.status(500).json({ message: e.message|| "erreur du serveur." });
      }
    
}

exports.getCongeByid = (req, res) => {
    try {
        Conge.find({_id:req.params.id},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "Aucun Congé trouvé" })
        })
    } catch (e) {
        res.status(500).send({ message: e || "erreur du serveur" });
    }
}

exports.getcongeByIdemp = (req, res) => {
    try {
        Conge.find({id_emp:req.params.id},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "Aucun Congé trouvé" })
        })
    } catch (e) {
        res.status(500).send({ message: e || "erreur du serveur." });
    }
}
exports.confirmconge= (req, res) => {
    try {
        
        Conge.findByIdAndUpdate(req.params.id, { $set: { status: true } }, (err, result)=> {
            if (result) return res.status(200).json({ message: "congé accepté"})
            if(err) return res.status(400).json({ message: "Erreur" });
        })
    } catch (e) {
        res.status(500).json({ message: e });
    }
}
exports.refusemconge= (req, res) => {
    console.log("kkkk",req.body.raison_ref);
    try {
        Conge.findByIdAndUpdate(req.params.id, { $set: { status: false,raison_ref:req.body.raison_ref } }, (err, result)=> {
            if (result) return res.status(200).json({ message: "congé refusé"})
            if(err) return res.status(400).json({ message: "Erreur" });
        })
    } catch (e) {
        res.status(500).json({ message: e });
    }
}
exports.delete= (req, res) => { 
    try {
        Conge.findByIdAndDelete(req.params.id,(err, result)=> {
            if (result) return res.status(200).json({ message: "suppression avec succès"})
            if(err) return res.status(400).json({ message: "Erreur" });
            
        })
    } catch (e) {
        res.status(500).json({ message: e });
    }
}
exports.updateConge= (req, res) => {
    try {
        Conge.findByIdAndUpdate(req.params.id, { $set: { date_debut:req.body.date_debut,date_fin:req.body.date_fin , raison:req.body.raison} }, (err, result)=> {
            if (result) return res.status(200).json({ message: "modification avec succès.",result})
            if(err) return res.status(400).json({ message: "Erreur" });
        })
    } catch (e) {
        res.status(500).json({ message: e });
    }
}

exports.getnum = (req, res) => {
   
    try {
        Conge.count({ status:true}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.json( result);
            
            }
          });
      } catch (e) { 
        console.error(e);
        res.status(500).json({ message: e.message|| "erreur du serveur." });
      } 
    
}
exports.detail = (req, res) => {
//  console.log("eeeeee");
    try {
        Conge.count({id_emp:req.params.id ,status:null},function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.json( result);
           
            }
          });
      } catch (e) { 
        console.error(e);
        res.status(500).json({ message: e.message|| "erreur du serveur." });
      }
    
}