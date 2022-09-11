const mongose =require('mongoose')
const AnnonceSchema=mongose.Schema({
    titre:{
        type: String,
        required: true,
        
    },
    date:{
        type: String,
        
        
    }, 
   sujet:{
        type: String,
        required: true,
        
    },
   
})
module.exports =mongose.model('Annonces',AnnonceSchema)