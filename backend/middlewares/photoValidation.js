const {body} = require('express-validator')

const photoInsertValidation = () => {
   return [
        body('title')
        .not()
        .equals('undefined')
        .withMessage('Título obritatório.')
        .isString()
        .withMessage('Título obritatório.')
        .isLength({min:3})
        .withMessage('O titulo precisa ter no mínimo 3 characteres.'),
        body('image').custom((value,{req}) =>{
            if(!req.file){
                throw new Error('A imagem é obrigatório') 
            }
            return true;
        })
   ] 
}

const photoUpdatevalidation = () =>{

    return[
        body('title')
        .optional()
        .isString()
        .withMessage("O título e obrigatório")
    ]
}

const commentValidation = ()=>{
    return[
        body('comment').isString().withMessage('O comentário é obrigatório')
    ]
}
module.exports = {
    photoInsertValidation,
    photoUpdatevalidation,
    commentValidation,
}