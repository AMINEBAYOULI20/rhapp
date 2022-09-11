const Concour= require("../models/concour");
exports.AddConcour = (req, res) => {
    console.log("dddddd");
    console.log(req.body);
    Concour(req.body).save().then(data => {
        return res.status(200).json({
            message: "L'Concour  est ajoutée avec succèe"

        });
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "erreur du serveur."
        });
    })}
    exports.getAllConcour = (req, res) => {
        // console.log("rrrr");
        try {
            Concour.find((err, result)=> {
              if (result)return res.status(200).json(result)
              if(err) return res.status(400).json({ message: "Erreur" });
            })
          } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message|| "erreur du serveur." });
          }
    }
    exports.updateConcour= (req, res) => {
        try {
            Concour.findByIdAndUpdate(req.params.id, { $set: { titre:req.body.titre ,sujet:req.body.sujet } }, (err, result)=> {
                if (result) return res.status(200).json({ message: "modification avec succès."})
                if(err) return res.status(400).json({ message: "Erreur" });
            })
        } catch (e) {
            res.status(500).json({ message: e });
        }}