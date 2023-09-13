// const { json, response } = require("express")

function doSignup(){
    let formData={}
    formData.first_name=document.getElementById("first_name").value
    formData.last_name=document.getElementById("last_name").value
    formData.email=document.getElementById("email").value
    formData.password=document.getElementById("password").value
    formData.confirm_password=document.getElementById("confirm_password").value
    

    fetch('/register',{
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(formData)
        })
        .then((response)=>response.json())
        .then((data)=>{
            window.location.href='/'
            
        })
}

function doLogin(){
    let loginData={}
    loginData.email=document.getElementById('email').value
    loginData.password=document.getElementById('password').value
    fetch('/login',{
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(loginData)

    })
    .then((response)=>response.json())
    .then(data=>{
        if(data.login){
            window.location.href='/home'

        }else{
            document.getElementById('warning').innerHTML="invalid credentials"
            setTimeout(()=>{
                document.getElementById('warning').innerHTML=""
            },3000)
            
        }


        
    })
}

const logout=()=>{
    localStorage.clear()
    sessionStorage.clear()
    location.assign('/logout')
}

