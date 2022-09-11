const annonce = require("../models/annonce");
const Annonce= require("../models/annonce");
exports.AddAnnonce = (req, res) => {
    console.log(req.body);
    Annonce(req.body).save().then(data => {
        return res.status(200).json({
            message: "L'annonce  est ajoutée avec succèe"

        });
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "erreur du serveur."
        });
    })}

    exports.getAllannonce = (req, res) => {
        try {
            Annonce.find((err, result)=> {
              if (result)return res.status(200).json(result)
              if(err) return res.status(400).json({ message: "Erreur" });
            })
          } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message|| "erreur du serveur." });
          }
    }

    exports.updateAnnonce= (req, res) => {
        try {
            Annonce.findByIdAndUpdate(req.params.id, { $set: { titre:req.body.titre ,sujet:req.body.sujet } }, (err, result)=> {
                if (result) return res.status(200).json({ message: "modification avec succès."})
                if(err) return res.status(400).json({ message: "Erreur" });
            })
        } catch (e) {
            res.status(500).json({ message: e });
        }}
    exports.deleteAnnonce= (req, res) => { 
        try {
            Annonce.findByIdAndDelete(req.params.id, (err, result)=> {
                if (result) return res.status(200).json({ message: "suppression avec succès"})
                if(err) return res.status(400).json({ message: "Erreur" });
                
            })
        } catch (e) {
            res.status(500).json({ message: e });
        }
    }
    exports.detail = (req, res) => {
  
        try {
            annonce.count(function(err, result) {
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