const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
   
    first_name:{
        type:String,
        require:true,
    }, 
    last_name:{
        type:String,
        require:true,
    }, 
    email:{
        type:String,
        require:true,
    }, 
    password:{
        type:String,
        require:true,
    },
    confirm_password:{
        type:String,
        require:true,
    }
})

const users=mongoose.model('users',userSchema)

module.exports={users}