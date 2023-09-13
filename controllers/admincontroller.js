
const multer = require("multer");
const BLOGS=require('../models/blogSchema');
const { response } = require("express");


const uploadPage =(req,res)=>{
    res.render('admin/uploads.hbs')
}


const createBlog=(req,res)=>{
    const fileStorage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"public/uploads");
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

    

        }).save().then(response=>{
            res.redirect('/admin/uploads')
        })
      



    })
}

module.exports={uploadPage,createBlog}