const express=require('express')
const router=express.Router()
const {uploadPage,createBlog,homePage,deletePost } = require('../controllers/admincontroller')

router.get('/home',homePage)

router.get('/uploads',uploadPage)

router.post('/createBlog',createBlog)
router.delete('/deletePost',deletePost)





module.exports=router