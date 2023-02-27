
const Photo = require('../models/Photos')
const User = require('../models/User')
const mongoose = require('mongoose');
const photo = require('../models/Photos');

// insert a photo, with an user related to it
const insertPhoto = async(req,res) =>{

    const {title} = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

   try {
    const user = await User.findById(reqUser._id);

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName:user.name,  
    })

    //if photo was created sucess,, return data
    if(!newPhoto){
        res.status(422).json({
            erros:['Houve um problema, for favor tente novamente mais tarde.']
        })
    }

    res.status(201).json(newPhoto);

   } catch (error) {
    res.status(404).json({
        erros:['Foto não encontrada.']
    })
   }
};

//Remove a photo from DB

const  deletePhoto = async(req,res)=>{

    try {
        const {id} = req.params

        const reqUser = req.user
        const photo = await Photo.findById(mongoose.Types.ObjectId(id))


    //console.log(photo)
    //chek if photo exists

     if(!photo){
         res.status(404).json({errors:['Foto não encontada!']})
         return;
     }

     //Check if photo belongs to user

     if(!photo.userId.equals(reqUser._id)){
         res.status(422).json({errors:['Ocorreu um erro, por favor tente novamente mais tarde']})
         return
     }

    await Photo.findByIdAndDelete(photo._id)

    res.status(200).json({id:photo._id,message:'Foto excluída com sucesso.'}) 
    } catch (error) {
        console.log(error.message);
    }
}

//get all photos

const getAllPhotos = async(req,res)=>{

    const photos = await Photo.find({}).sort([['createdAt',-1]]).exec()


    return res.status(200).json(photos)
}

//Get user photos

const getUserPhotos = async (req,res) =>{

    const {id} = req.params

    const photos = await Photo.find({userId:id}).sort([['createdAt',-1]]).exec();

    return res.status(200).json(photos);
}
const getPhotoById = async(req,res) =>{

    const {id} = req.params
    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    if(!photo){
        res.status(404).json({error:["Foto não encontrada."]})
        return
    }

    res.status(200).json(photo)
}

//Update photo


const updatePhoto = async (req,res) =>{

    const {id} = req.params
    const title = req.body.title

    console.log(title)
    
    const requser = req.user

    const photo = await Photo.findById(id)

    
    if(!photo){
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }

    if(!photo.userId.equals(requser._id)){
        res.status(202).json({errors:["Ocorreu um erro, por favor tente novamente mais tarde"]});
        return
    }

    if(title){
        photo.title = title
    }

    await photo.save();

    //console.log(photo)
    
    res.status(200).json({photo:{
        _id:photo._id,
        title:photo.title,
    },message:"Foto atualizada com sucesso!"})
}

const likePhoto = async(req,res) => {

    const {id} = req.params
    const reqUser  = req.user
    const photo = await Photo.findById(id)

    if(!photo){
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }

    //check if user already liked photo

    if(photo.likes.includes(reqUser._id)){
        res.status(422).json({erros:['Você ja curtiu essa photo']})
        return;
    }

    //Put id user in like array
    photo.likes.push(reqUser._id);
    photo.save();

    return  res.status(200).json({photoId:id,userId:reqUser._id,message:'O foto foi curtida'});
    
}

// Comment Functinality
const commentPhoto = async(req,res) =>{
    const {id} = req.params
    const {comment} = req.body
    const reqUser = req.user

    const user = await User.findById(reqUser._id)
    const photo = await Photo.findById(id)

    if(!photo){
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }
// put comment in the array comments
    const userComment = {
        comment,
        userComment:user.name,
        userImage: user.profileImage,
        userId:user._id
    }
    await photo.comments.push(userComment)
    await photo.save();
 
    res.status(200).json({
        comment:userComment,
        message:'O comentário foi adicionado com sucesso'
    })
}

//Search photos by title

const searchPhotos = async(req,res) => {

    const {q} = req.query
    const photos = await Photo.find({title: new RegExp(q,'i')}).exec();

    res.status(200).json(photos)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos,
}
