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


const photoService = {
    publishPhoto,
    getUsersPhotos,
    deletePhoto,
}

export default photoService