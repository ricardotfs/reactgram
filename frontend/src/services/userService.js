import {api,requestConfig} from '../utils/config'

//Get user Details

const profile = async(data,token) =>{

    const config = requestConfig('GET',data,token)

    try {
        
        const res = await fetch(api + 'users/profile',config)
        .then((res) => res.json())
        .catch((error) => error)

        return res;

    } catch (error) {
        console.log(error)
    }
}

// Update user profile
const updateProfile = async(data,token) =>{

    console.log(data)
    const config = requestConfig('PUT',data,token,true);

    try {
        
        const res = await fetch(api + 'users/',config)
        .then((res) => res.json())
        .catch((err) => err)
      
        return res

    } catch (err) {
        console.log(err)
    }
}

//Get user detais
const getUsersDetails = async(id) =>{

    const config = requestConfig('GET',null)

    try {

        const res = await fetch(`${api}users/${id}`,config)
        .then((res)=> res.json())
        .catch((err) => err)

        return res;
        
    } catch (error) {
        
    } 
}

const userService = {
    profile,
    updateProfile,
    getUsersDetails,
}

export default userService