import { api,requestConfig } from "../utils/config";


//Public an user photo
const publishPhoto = async(data,token) =>{

    const config = requestConfig('POST',data,token,true)

    try {
        
        const res = await fetch(api + 'photos/',config)
        .then((res) => res.json())
        .catch((err) => err)

        return res;

    } catch (error) {
        console.log(error)
    }
}

//Get users photos
const getUsersPhotos = async(id,token) =>{

    const config = requestConfig('GET',null,token)

    try {
        const res = await fetch(api + 'photos/user/' + id, config)
            .then((res) => res.json())    
            .catch((err) => err)

        return res;            
        
    } catch (error) {
        console.log(error)
    }
}
//Delete photo
const deletePhoto = async(id,token) =>{

    const config = requestConfig('DELETE',null,token)

    try {

        const res = await fetch(api + 'photos/'+ id, config)
                            .then((res) => res.json())
                            .catch((err) => err)

        return res;
    } catch (error) {
        console.log(error)
    }
}

//Update Photo

const updatePhoto = async(data,id,token) =>{

    const config = requestConfig('PUT',data,token)

    try {

            const res = await fetch(api + 'photos/' + id,config)
            .then((res) => res.json())
            .catch((err) => err)

            if(res === undefined)
                return;
                
            return res;
        
    } catch (error) {
        console.log(error)
    }
}
//Get photo by id

const getPhoto = async(id,token) =>{

    const config = requestConfig('GET',null,token);

    try {
        const res = await fetch(api + 'photos/' + id,config)
                            .then((res)=> res.json())
                            .catch((err) => err);
        return res;                            

    } catch (error) {
      console.log(error)  
    } 
}

//get likes
 const like = async(id,token) =>{

    const config = requestConfig('PUT',null,token);

    try {
        
        const res = await fetch(api + 'photos/like/' + id,config)
                            .then((res) => res.json())
                            .catch((err) => err);
        return res;

    } catch (error) {
        
    }
 }

 // Add comment to a photo
const comment = async(data,id, token) =>{

    const config = requestConfig('PUT',data,token);

    try {
        
        const res = await fetch(api + 'photos/comment/' + id,config)
                        .then((res) => res.json())
                        .catch((err) => err);

        return res;

    } catch (error) {
        
    }
}

//Get all photos
const getPhotos = async()=>{

    const config = requestConfig('GET')

    try {
        
        const res = await fetch(api + 'photos')
                            .then((res) => res.json())
                            .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
}


const photoService = {
    publishPhoto,
    getUsersPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
    getPhotos,
}

export default photoService