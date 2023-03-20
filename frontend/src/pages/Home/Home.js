import React from 'react'
import './Home.css'

//Components
import PhotoDetail from '../../components/PhotoDetail/PhotoDetail'

import { Link } from 'react-router-dom'

//hooks
import { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'

//redex
import { getPhotos } from '../../slices/photoSlice'

const Home = () => {

  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth);
  const {photos,loading} = useSelector((state) => state.photo)

  //Load all photos
  useEffect(() =>{
    dispatch(getPhotos());
  },[dispatch])

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div id='home'>
      {photos && photos.length > 0 && photos.map((photo) =>(
        <PhotoDetail photo={photo}  user={user}/>
        ))}
      {photos && photos.length === 0 && (
          <h2 className='no-photos'>
            Ainda não há potos publicadas, <Link to={`/users/${user._id}`} >Clique aqui</Link>
          </h2>
      )}
    </div>
  )
}

export default Home