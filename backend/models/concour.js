

const mongose =require('mongoose')
const { required } = require('nodemon/lib/config')
const ConcourSchema=mongose.Schema({
    titre:{
        type: String,
        required: true,
        
    },
    date_debut:{
        type: String,
        required: true,
    },
    date_fin:{
        type: String,
        // required: true,
       
    },
  
participants:[mongose.Schema.Types.ObjectId],
           
        
})
module.exports =mongose.model('Concours',ConcourSchema)

 


