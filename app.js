const express=require('express')
const app = express()
const path=require('path')
const hbs = require('hbs')
const connectDB=require('./config/dbConfig')
const cookieParser=require('cookie-parser')
require('dotenv').config()

const admin=require('./routes/admin')
const user=require('./routes/user')



connectDB()
app.set('view-engine','hbs')
app.set("views",path.join(__dirname,'pages'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use('/',(req,res,next)=>{
    res.set('Cache-Control','no-store')
    next()
})


app.use('/',user)
app.use('/admin',admin)



app.listen(process.env.PORT)