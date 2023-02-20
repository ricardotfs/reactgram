import {api,requestConfig} from '../utils/config'

//register and user

const register = async(data) =>{

    const config = requestConfig('POST',data)

    try {

        const res = await fetch(api + 'users/register', config)
        .then((res) => res.json())
        .catch((err) => err);

        if(res){
            localStorage.setItem('user',JSON.stringify(res));
        }
        
        return res;
        
    } catch (error) {
        console.log(error);
    }

}

//Log out user

const logOut = () =>{
    localStorage.removeItem('user')
}


//Sign in an user
const login = async(data) =>{

    const config = requestConfig('POST',data)
    
    try {
        
        const res = await fetch(api + 'users/login',config)
                        .then((res) => res.json())
                        .catch((err) => err)

        if(res._id){
            localStorage.setItem('user',JSON.stringify(res))
        }                        

        return res;

    } catch (error) {
        console.log(error)
    }


}


const authService = {
    register,
    logOut,
    login
}

export default authService;