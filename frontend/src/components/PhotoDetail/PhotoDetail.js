import React from 'react'
import { Link } from 'react-router-dom'
//components
import LikeContainer from '../LikeContainer'
import PhotoItem from '../PhotoItem'

//hooks
import {useDispatch} from 'react-redux'
import {useResetComponentMessage} from '../../hooks/useResetComponentMessage'

//redex
import {like } from '../../slices/photoSlice'

const PhotoDetail = ({photo,user}) => {
    const dispatch = useDispatch()
    const resetMessage = useResetComponentMessage(dispatch);
    
    const handleLike = (photo) =>{
        dispatch(like(photo._id));
  
        resetMessage(dispatch);
    }
    
  return (
    <div key={photo._id}>
        <PhotoItem photo={photo}/>
          <LikeContainer photo={photo} user={user} handleLike={handleLike} />
          <Link className='btn' to={`/photos/${photo._id}`} >
            ver mais
          </Link>
    </div>
  )
}

export default PhotoDetail