const mongose =require('mongoose')
const CongeSchema=mongose.Schema({
    date_debut:{
        type: String,
        required: true,
        
    },
    date_fin:{
        type: String,
        required: true, 
         
    },
    date_dem:{
        type: String,
       
         
    },
    id_emp:{
        type: String,
        // required: true,
        
    },
    raison:{
        type: String,
        // required: true,
        
    },
    status:{
        type: Boolean,
        
        
    },
    raison_ref:{
        type: String,
        
        
    },
})
module.exports =mongose.model('Conges',CongeSchema)