const express=require('express')
const { doSignup, loginPage,showSignup,doLogin,getHomepage,detailedView,logout} = require('../controllers/usercontroller')
const router=express.Router()
const userAuth=require('../middlewares/userAuth')

router.get('/',loginPage)
router.get('/signup',showSignup)
router.post('/register',doSignup)
router.post('/login',doLogin)
router.get('/home',userAuth,getHomepage)
router.get('/detailedView',userAuth,detailedView)
router.get('/logout',logout)








module.exports=router