const multer = require("multer");
const BLOGS = require('../models/blogSchema');
// const { response } = require("express");
const fs = require('fs')
const path = require('path')


const uploadPage = (req, res) => {
    res.render('admin/uploads.hbs')
}


const createBlog = (req, res) => {
    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/uploads");
        },
        filename: (req, files, cb) => {
            cb(null, Date.now() + "-" + files.originalname)
        }
    })
    const upload = multer({
        storage: fileStorage
    }).array("images", 4)
    upload(req, res, (err) => {
        BLOGS({
            heading: req.body.catagory,
            content: req.body.content,

            images: req.files,



        }).save().then(response => {
            res.redirect('/admin/uploads')
        })




    })
}
const homePage = (req, res) => {
    BLOGS.find().then((response) => {
        res.render('admin/home.hbs', {
            data: response
        })
    })

}

const deletePost = (req, res) => {
    try{
        BLOGS.findOne({
            _id: req.body.postId
        }).then((selectedFileData) => {
                console.log(selectedFileData);
                BLOGS.deleteOne({
                    id: req.body.postId
                }).then((res) => {
                    //      const filePath=path.join(__dirname)
                    // })

                    for (let i = 0; i < selectedFileData.images.length; i++) {
                        const filePath = path.join(__dirname, '..', 'public/uploads', selectedFileData.images[i].filename)
                        fs.unlink(filePath, (err) => {
                            console.log(err);
                        })
                    }
                    res.json({delete:true})
                })
                .catch(err=>{
                    res.json({delete:false,msg:err})
                })
            })

    }
    catch(err){
        res.json({delete:false,msg:err})
    }
        
            }


                module.exports = {
                    uploadPage,
                    createBlog,
                    homePage,
                    deletePost
                }
            