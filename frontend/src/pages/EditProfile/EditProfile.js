import React from 'react'
import './EditProfile.css'

import{uploads} from '../../utils/config'

//Hooks
import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'

//Redex
import {profile, updateProfile,resetMessage} from '../../slices/userSlice'


//components
import Message from '../../components/Message'


const EditProfile = () => {

    const dispatch = useDispatch()
    const {loading,error,success,user,message} = useSelector((state)=> state.user)

 
    //states
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [profileImage,setProfileImage] = useState('')
    const [bio,setBio] = useState('')
    const [previewImage,setPreviewImage] = useState('')
    //const [message,setMessage] = useState('')
    //load user data
    useEffect(()=>{
        dispatch(profile())
    },[dispatch])

    //Fill for with user data

    useEffect(() =>{
        
        if(user){
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
            setPreviewImage(user.profileImage);
        }

    },[user])

    const  handleSubmit = (e) =>{
        e.preventDefault()

        const userData ={
            name,
        }
        if(profileImage){
            userData.profileImage = profileImage
        }

        if(bio){
            userData.bio = bio
        }
        if(password){
            userData.password = password
        }

        console.log(userData)
        const formData = new FormData();
        const userFormData = Object.keys(userData).forEach((key) => formData.append(key,userData[key]));
        
        formData.append('user',userFormData);
         dispatch(updateProfile(formData));

            setTimeout(() => {
                dispatch(resetMessage())
            }, 2000);
        
    }
    
    const handleFile  = (e) =>{

        const image = e.target.files[0]

        setPreviewImage(image)

        setProfileImage(image)   
    }

      //clean all auth States
    useEffect(() =>{
        dispatch(resetMessage());
    },[dispatch])

  return (
    <div id='edit-profile'>
        <h2>Edite seus dados</h2>
        <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
        {
            (profileImage || previewImage) && (
                
                <img
                    className='profile-image'
                    src={
                        profileImage 
                        ? URL.createObjectURL(profileImage)
                        : 
                         `${uploads}users/${previewImage}` 	
                    }
                    alt={name}
                />
            )

        }

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ''}/>
            <input type="email" placeholder='E-mail' disabled value={email || ''}/>
            <label>
                <span>Imagem do perfil:</span>
                <input type="file" onChange={handleFile} />
            </label>
            <label>
                <span>Bio:</span>
                <input type="text" placeholder='Descrição do perfil' onChange={(e) => setBio(e.target.value)} value={bio || ''}/>
            </label>
            <label>
                <span>Quer alterar sua senha?</span>
                <input type="password"  placeholder='Digite sua nova senha'  onChange={(e) => setPassword(e.target.value)} value={password || ''}/>
            </label>

            {!loading  && <input type="submit"  value='Atualizar'/> }
            {loading  && <input type="submit"  value='Aguarde...' disabled/> }
            { message && <Message msg={error} type="error"/>}   
            { message && <Message msg={message} type="success"/>}   

        </form>
    </div>
  )
}

export default EditProfile