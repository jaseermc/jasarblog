// const { application, json } = require("express")

const { response } = require("express")


const  showImages =()=>{
    const imageInput=document.getElementById('imageInput')
    const imagePreview=document.getElementById('imagePreview')
    document.getElementById('imagePreview').innerHTML=null
    const selectedImages=imageInput.files
    for(let i=0; i<selectedImages.length;i++){
        const image=document.createElement('img')
        image.src=URL.createObjectURL(selectedImages[i])
        image.style.width="150px"
        image.style.margin="3px"
        imagePreview.appendChild(image)
    }
}

function deletePost(postId){
fetch('/admin/deletePost',{
    method:'delete',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({postId:postId})
}).then((response)=>{
    if(response.delete){
        location.reload()
    }else{
        alert('somthing went wrong')
    }

})
}