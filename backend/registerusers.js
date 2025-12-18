const mongoose=require('mongoose')

const registeruser=mongoose.Schema({
   data:[{ type: mongoose.Schema.Types.ObjectId,ref:'datasubmissions'}],
     companyName:{type:String, },
          industry:{type:String, required:true},
          companySize:{type:String, required:true},
          
          companyType:{type:String, required:true},
          registrationNumber:{type:String, required:true},
          email:{type:String, required:true},
          password:{type:String, required:true},
          website:{type:String},
          country:{type:String, required:true},
          status:{type:String || "pending"}
})

const registerusermodel=mongoose.model('registeruser',registeruser)
module.exports=registerusermodel;