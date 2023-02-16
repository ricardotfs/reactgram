const multer = require('multer')
const path = require('path')

//Destination to store image

const imageStorage = multer.diskStorage({
    destination:function(req,file,cd){
        let folder = ""
        
        if(req.baseUrl.includes('users')){
            folder = 'users'
        }
        else if(req.baseUrl.includes('photos')){

        }
        cd(null,`uploads/${folder}/`)
    },
    filename: (req,file,cd) =>{
        cd(null,Date.now() + path.extname(file.originalname)) // 
    }
})



const imageUpload = multer({
    storage:imageStorage,
    fileFilter(req,file,cd){
        if(!file.originalname.match(/\.(png|jpg)$/)){

            //upload only png and jpg formats
            return cd(new Error('Por favor, envie apenas png ou jpg!'))

        }

        cd(undefined,true);
    }
})

module.exports = {imageUpload}