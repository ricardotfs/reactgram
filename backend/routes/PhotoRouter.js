const express  = require('express')
const router = express.Router()

//Controller
const {getAllPhotos, insertPhoto,deletePhoto,getUserPhotos,getPhotoById,updatePhoto,likePhoto, commentPhoto,searchPhotos} = require('../controllers/PhotoController')

//Middlewares
const {photoInsertValidation,photoUpdatevalidation,commentValidation} = require('../middlewares/photoValidation');
const authGuard = require('../middlewares/authGuard')
const validate = require('../middlewares/handleValidation')
const {imageUpload} = require('../middlewares/imageUpload')
//Routes
router.post('/',authGuard,imageUpload.single('image'),photoInsertValidation(),validate,insertPhoto)

router.delete('/:id',authGuard,deletePhoto)

router.get('/',authGuard,getAllPhotos)
router.get('/search',authGuard,searchPhotos)

router.get('/user/:id',authGuard,searchPhotos)

router.get('/:id',authGuard,getPhotoById)
router.put('/:id',authGuard,photoUpdatevalidation(),validate, updatePhoto)
router.put('/like/:id',authGuard,likePhoto)
router.put('/comment/:id',authGuard,commentValidation(),commentPhoto)

module.exports = router;

