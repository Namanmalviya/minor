const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const user=require('./users').user
const data=require('./users').datasubmission
const registeruser=require('./registerusers')
const axios=require('axios')
const innovationdata=require('./innovation')
const datasubmission=require('./datasubmission')
const jwt=require('jsonwebtoken')

app.use('/uploads', express.static('uploads'));


//const protect = require("../middleware/authmiddleware");
//const researchdata =require('./research.json')
const verify={}
mongoose.connect('mongodb://localhost:27017/minor-users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log('mongo connected'))
.catch((err)=>console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(cors())


app.get('/',(req,res)=>{
    res.send('hello');
})

app.post('/',async(req,res)=>{
    try{
    const id=req.body
    console.log(req.body.id)
    //console.log(id)
   // console.log('id',id.id)
    const companydata= await registeruser.findById(id.id)
    const companysubmission = await data.findOne({company:id.id});
    // console.log(companydata)
     console.log(companysubmission)
    res.status(200).json({companydata,companysubmission});
    }
    catch(err){
        console.log(err)
    }
})

app.post('/Signup',async(req,res)=>{
    try{
    const {email,password}=req.body;
    const existinguser=await user.findOne({email:email})
    if(existinguser){
       return res.status(400).json({message:'userr exist'})
       console.log('user exist')
    }
        const newuser=new user({email:email,password:password})
        await newuser.save();
        res.status(201).json({message:'user created'})
    
}
catch(err){
    console.log(err)
}
})

app.post('/Login',async (req,res)=>{
    const {email,password}=req.body
    const existinguser=await user.findOne({email:email,password:password}) 
    const existingcompany=await registeruser.findOne({email:email,password:password})
    try{
        if(existinguser){
            console.log('exist')
           
           const token= jwt.sign({email:email, role:"user"}, "secret")
           console.log(token)
            res.status(201).json({message:'user present',token:token,user:{email:email}})
             verify=jwt.verify(token,"secret")
           console.log(verify)
        }
        
        else if(existingcompany){
            console.log(existingcompany.companyName)
           
            const token=jwt.sign({email:email, role:"company", id:existingcompany._id}, "secret")
             console.log(token)
              res.status(201).json({message:'company present',token:token,company:{email:email,companyName:existingcompany.companyName,companyType:existingcompany.companyType, companyid:existingcompany._id}})
             let verify=jwt.verify(token,"secret")
           //console.log(verify.id)
        }
        else{
            console.log('not exist')
            res.status(400).json({message:'please login'});
        }

    }
    catch(err){
        console.log(err);
    }
})
 app.get('/Innovationinfo',async(req,res)=>{
   
      res.send('dd')
  })


 app.post('/Innovationinfo',async(req,res)=>{
          try{
        //const data= innovationdata;
     
       res.json(innovationdata)
       
  }

  catch(err){
      console.log(err)
  }
  })
 app.get('/researchinfo',async(req,res)=>{
   
      res.send('dd')
  })


 app.post('/researchinfo',async(req,res)=>{
          try{
        //const data= innovationdata;
     
       res.json(researchdata)
       
  }

  catch(err){
      console.log(err)
  }
  })

app.get('/Register',(req,res)=>{
    res.send('hao')
})
app.post('/Register', async(req,res)=>{
    const {companyName,
          industry,
          companySize,
          
          companyType,
          registrationNumber,
          email,
          password,
          website,
          country}=req.body;
    try{
        const alreadyregistered=await registeruser.findOne({email:email})
        if(!alreadyregistered){
           
            const newregister=new registeruser({companyName,
          industry:industry,
          companySize:companySize,
          
          companyType:companyType,
          registrationNumber:registrationNumber,
          email:email,
          password:password,
          website:website,
          country:country})
                    await newregister.save()
                    res.status(201).json({message:'register saved'})
        }
        else{
             res.status(400).json({message:'already registered'})
        }
        // console.log(companyName,
        //   industry,
        //   companySize,
          
        //   companyType,
        //   registrationNumber,
        //   email,
        //   password,
        //   website,
        //   country)

    }
   catch(err){
    console.log(err)
    res.status(500).json({message:'err'})
   }


})

app.get('/chatai',(req,res)=>{
    res.send("hel")
})
app.post('/chatai',async(req,res)=>{
    const {prompt}=req.body
    console.log(prompt)
    try{
            const response=await axios({
                url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB9FJtsLIIhVhITMUL6gA1kKPhXBlIp27U" ,
                method: 'post' ,
                data:{
  
    "contents": [
      {
        "parts": [
          {
            "text":'only medical and healthcare related question , give answers like real doctor not ai agent'+ prompt
          }
        ]
      }
    ]
  }
        
    })
    const answer=response['data']['candidates'][0]['content']['parts'][0]['text']
     console.log(answer)
     res.status(200).json({answer})
        }
    
    catch(err){
        res.status(401).json({message:'err'})
        console.log(err)

    }
})




app.use('/',datasubmission)
//console.log('ok')

app.post('/admin',async(req,res)=>{
    try{
    console.log('ok')
     const userdata=await user.find({})
     const totalcompanies=await registeruser.find({})
     const datasubmissio=await data.find({})
     //console.log(userdata,totalcompanies,datasubmissio)
    res.json({userdata,totalcompanies,datasubmissio})
    }
    catch(err){
        console.log(err)
    }
})


app.post('/companydetails',async(req,res)=>{
    try{
              const id=await req.body.id;
    console.log(id)
      const dataa=await data.findOne({company:id})
       console.log(dataa)
       res.json(dataa)
    }
    catch(err){
        console.log(err)
    }
  
})


app.listen(5000,()=>{
    console.log('server started')
})

//module.exports={verify};az