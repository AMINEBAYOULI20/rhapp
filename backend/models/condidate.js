const mongose =require('mongoose')
const CondidateSchema=mongose.Schema({
 
   nom:{
        type: String,
        // required: true
    },
    prenom:{
        type: String,
        // required: true
    },
    date_nais:{
        type: String,
        // required: true,
         
    },
    tel:{
        type: Number,
       },
   
    email:{
        type: String,
        // required: true,
        // unique: true
    },
    
   
    type:{
        type:String,
        
    },
    niveau:{
        type:String
    },
    experience:{
        type:String
    },
    diplome:{
        type:String
    },

 
    genre:{
        type: String,
       
        
    },
    universite:{
        type: String,
       
        
    },
    cv:{
        type:String
    },
    lettre:{
        type:String
    },
  

  
   
})
module.exports =mongose.model('Condidates',CondidateSchema)