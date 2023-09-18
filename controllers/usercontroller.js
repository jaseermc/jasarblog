const mongoose=require('mongoose')
const USER=require('../models/userModel').users
const BLOGS=require('../models/blogSchema')
const jwt = require('jsonwebtoken')
const { users } = require('../models/userModel')
const { response } = require('express')
const multer = require("multer");



const loginPage =((req,res)=>{
  if(req.cookies.userJwt){
    res.redirect('/home')
  }else{
    res.render('user/login.hbs')
  }
  
  })
    

const showSignup =(req,res)=>{
    res.render('user/signup.hbs')
}


const doSignup=(req,res)=>{

  USER({
    
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    password:req.body.password,
    confirm_password:req.body.confirm_password
  }).save().then((res)=>{
    res.json({signup:true})
  })

.catch(()=>{
    res.json({signup:false})
    
})


  // res.json({signup:true})
}
const doLogin=(req,res)=>{
  USER.find({email:req.body.email,password:req.body.password}).then((response)=>{
    if(response.length>0){

      const token = jwt.sign({userId:response[0]._id},process.env.JWT_KEY,{
        expiresIn:'2d'
      })
      res.cookie('userJwt',token,{
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:24*60*60*1000
     })
      res.status(200).json({login:true})
    }else{
      res.json({login:false})
    }
  })
}
const getHomepage=(req,res)=>{
  BLOGS.find().then((response)=>{
  res.render('user/home.hbs',{data:response})
})
}

const detailedView=(req,res)=>{
  try{
    
    
  BLOGS.find({_id:req.query.id}).populate({
    path:'createdBy',
    select:['name','email']})
    .then(response=>{

    // response[0].createdAt=new Date(response[0].createdAt).getDay()
    console.log(response);
    res.render('user/detailedView.hbs',{data:res[0]})
  })
  .catch(err=>{
    res.send('error')
  })

  }catch(err){
    
  res.send("handled in catch")
  }
  finally{
    console.log("hai");
  }


    
  }
 

const createBlog=(req,res)=>{
  res.render('user/upload.hbs')
}
const addBlogData=(req,res)=>{
  console.log(req.query,'*******');
  const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"user/uploads");
    },
    filename:(req,files,cb)=>{
        cb(null,Date.now()+"-"+files.originalname)
    }
})
const upload=multer({storage:fileStorage}).array("images",4)
upload(req,res,(err)=>{
    BLOGS({heading:req.body.catagory,
    content:req.body.content,
    
    images:req.files,
    createdBy:req.query.id



    }).save().then(response=>{
        res.redirect('/createBlog')
    })
  })
}

const logout=(req,res)=>{
  res.cookie('userJwt',null,{
    httpOnly:true,
    samSite:'lax',
    secure:false,
    maxAge:1
 })
 req.cookies.userJwt=null
 res.redirect('/')
}
module.exports={doSignup,loginPage,showSignup,doLogin,getHomepage,detailedView,logout,createBlog,addBlogData}