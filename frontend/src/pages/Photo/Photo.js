import React from 'react';
import './Photo.css' ;
import {uploads} from '../../utils/config';

//Components
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem';

//hooks
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

//Redux
import { getPhoto, like } from '../../slices/photoSlice';
import LikeContainer from '../../components/LikeContainer';


const Photo = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)
  const {photo,loading,error,message} = useSelector((state) => state.photo)

  //Comentário

  const handleLike = () =>{
    dispatch(like(photo._id))
  }
  
  //Load photo data
  useEffect(()=>{
    dispatch(getPhoto(id))
  },[dispatch,id])


  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div id='photo'>
      <PhotoItem photo={photo}/>
      <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
      {error && <Message msg={error} type='error'/>}
      {message && <Message msg={message} type='success'/>}
    </div>
  )
}

export default Photo