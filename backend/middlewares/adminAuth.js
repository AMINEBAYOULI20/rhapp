const jwt = require("jsonwebtoken");
const Emplpoye = require("../models/employee");
module.exports =async function(req, res, next) {
  const token = req.header("token");
 
  if (!token) return res.status(401).json({ message: "Veuillez vous connecter pour accéder à cette page" });
  try {
    // verif token mitbadil walla
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    let userInformations = await Emplpoye.findById(decoded.employe.id);
    if (!userInformations)return res.status(404).json({ message: "Le compte n'existe pas ou a été supprimé" });
    
    if (userInformations.DeconnectionTime > decoded.iat * 1000) return res.status(401).send({ message: "Jeton invalide ou expiré" });
    if (userInformations.role === "ADMIN") next();
    else res.status(401).json({ message: "Vous ne pouvez pas accéder à ces informations" });
  } catch (e) {
    res.status(500).send({ message: "Jeton invalide ou expiré" });
  }
};