const mongose =require('mongoose')
const EmplpoyeSchema=mongose.Schema({
    cin:{
        type: Number,
        required: true,
        unique: true
    },
   nom:{
        type: String,
        required: true
    },
    prenom:{
        type: String,
        required: true
    },
    date_nais:{
        type: String,
        // required: true,
        
    },
    tel:{
        type: Number
    },
   
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
   
    salaire:{
        type:Number,
        
    },
   
    role:{
        type:String,
       
    },
    genre:{
        type: String,
       
        
    },
    adresse:{
        type:String,
    },

    passwordChangeDate:{
        type: Date,
        default:Date.now()
    },
    
    DeconnectionTime: {
        type: Date,
        default: Date.now(),
    },
  
    images: 
        {
            url: {type:String,default:'image-1651525461882profile.jpg'},
            uploaded: { type: Date, default: Date.now() },
        },
   
})
module.exports =mongose.model('Employe',EmplpoyeSchema)