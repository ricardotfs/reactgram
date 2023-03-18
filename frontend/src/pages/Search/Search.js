import React from 'react'
import './Search.css'

//hooks
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useResetComponentMessage} from '../../hooks/useResetComponentMessage'
import { useQuery } from '../../hooks/useQuery';

//components
import LinkeContainer from '../../components/LikeContainer';
import PhotoItem from '../../components/PhotoItem';
import { Link } from 'react-router-dom';

//redex
import { searchPhotos,like } from '../../slices/photoSlice';

//import

const Search = () => {

  const query = useQuery();
  const search = query.get('q');
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const {user} = useSelector((state) => state.auth);
  const {photos,loading} = useSelector((state) => state.photo)

  useEffect(()=>{

    dispatch(searchPhotos(search));

  },[dispatch,search])

    
  const handleLike = (photo) =>{
      dispatch(like(photo._id));

      resetMessage(dispatch);
  }

  if(loading){
    return <p>Carregando...</p>
  }
  return (
    <div id='search'> 
        <h2>
          Você está buscando por: {search}
          {photos && photos.length > 0 && photos.map((photo) =>(
              <div key={photo._id}>
                <PhotoItem photo={photo}/>
                <LinkeContainer photo={photo} user={user} handleLike={handleLike} />
                <Link className='btn' to={`/photos/${photo._id}`} >
                  ver mais
                </Link>
              </div>
          ))}
        {photos && photos.length === 0 && (
          <h2 className='no-photos'>
            Não foram encontrados resultados para sual busca.
          </h2>
        )}
        </h2>
    </div>
  )
}

export default Search