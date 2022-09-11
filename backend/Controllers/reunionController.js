const reunion = require("../models/reunion");
const Reunion = require("../models/reunion");

exports.AddReunion = (req, res) => {
    console.log("body",req.body)
    Reunion(req.body).save().then(data => {
        return res.status(200).json({
            message: "réunion ajoutee"
        });
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "erreur du serveur."
        });
    })
}
exports.getAllReunion = (req, res) => {
    try {
        Reunion.find((err, result)=> {
          if (result)return res.status(200).json(result)
          if(err) return res.status(400).json({ message: "Erreur" });
        })
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message|| "erreur du serveur." });
      }
} 
exports.getreunionByIdemp = (req, res) => {
    try {
        Reunion.find({equipe:{ $in:req.params.id}},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "Aucune réunion trouvée" })
        })
    } catch (e) {
        res.status(500).send({ message: e || "erreur du serveur" });
    }
}
exports.updateReunion= (req, res) => {
    try {
        Reunion.findByIdAndUpdate(req.params.id, { $set: { titre:req.body.titre ,sujet:req.body.sujet ,equipe:req.body.equipe,time:req.body.time,date:req.body.date} }, (err, result)=> {
            if (result) return res.status(200).json({ message: "modification avec succès.",result})
            if(err) return res.status(400).json({ message: "Erreur" });
        })
    } catch (e) {
        res.status(500).json({ message: e });
    }}
    exports.deleteReunion= (req, res) => { 
        try {
            Reunion.findByIdAndDelete(req.params.id, (err, result)=> {
                if (result) return res.status(200).json({ message: "suppression avec succès"})
                if(err) return res.status(400).json({ message: "Erreur" });
                
            })
        } catch (e) {
            res.status(500).json({ message: e });
        }
    }
    exports.detail = (req, res) => {
  
        try {
           
            reunion.count({date:{$eq:req.params.date}},function(err, result) {
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
    exports.detailbyid = (req, res) => {
        try {
            
            reunion.count({date:{$eq:req.params.date},equipe:{$in:req.params.id}},function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.json( result);
                  console.log("result",result);
                }
              });
          } catch (e) { 
            console.error(e);
            res.status(500).json({ message: e.message|| "erreur du serveur." });
          }
        
    }