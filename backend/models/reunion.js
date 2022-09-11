

const mongose =require('mongoose')
const { required } = require('nodemon/lib/config')
const ReunionSchema=mongose.Schema({
    titre:{
        type: String,
        required: true,
        
    },
    sujet:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        // required: true,
       
    },
   time:{
        type: String,
        // required: true,
         
    },
equipe:[mongose.Schema.Types.ObjectId],
           
        
})
module.exports =mongose.model('Reunions',ReunionSchema)

 


