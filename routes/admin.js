const express=require('express')
const router=express.Router()
const {uploadPage,createBlog } = require('../controllers/admincontroller')

router.get('/',(req,res)=>{
    res.send("hi this is admin")
})
router.get('/uploads',uploadPage)

router.post('/createBlog',createBlog)






module.exports=router