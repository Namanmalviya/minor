const mongoose=require('mongoose')
const registeruser=require('./registerusers')
const {verify}=require('./index')
console.log(verify)
const userschema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        Unique:true
    },
    password:{
        type:String,
        required:true
    }
})


const datasubmissionschema=mongoose.Schema({

    company:{type:mongoose.Schema.Types.ObjectId,ref:'registerusers',required:true},

   rdExpenditure: Number,
  rdPercentage: Number,
  patentApplications: Number,
  patentsGranted: Number,
  researchCollaborations: Number,
  totalStaff: Number,
  innovationStaff: Number,
  trainingPrograms: Number,
  newProducts: Number,
  commercializedProducts: Number,
  totalRevenue: Number,
  newProductRevenue:Number,
  industryPartnerships: Number,
  academicPartnerships: Number,
  publicationCount: Number,
  staffWithPhd: Number,
  trainingHours: Number,
  retentionRate: Number,
  startupIncubated: Number,
  spinoffCompanies: Number,
  technologyTransfers: Number,
  innovationAwards: Number,
  prototypesBuilt: Number,
  innovationBudget: Number,
  grantsReceived: Number,
  innovationROI: Number,
  licensingRevenue: Number,
  governmentPartnerships: Number,
  acceleratorSupport: Number,
  mentorshipPrograms: Number,
  networkEvents: Number,
  ecosystemRating: String,
  diversityIndex: String
})
const user=mongoose.model('user',userschema)
 const datasubmission=mongoose.model('datasubmission',datasubmissionschema)
module.exports={    user,datasubmission}
//module.exports=datasubmission

