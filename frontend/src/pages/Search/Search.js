import React from 'react'
import './Search.css'

//hooks
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { useComponentLoading } from '../../hooks/useComponentLoading';

//import {useResetComponentMessage} from '../../hooks/useResetComponentMessage'
import { useQuery } from '../../hooks/useQuery';

//components
import PhotoDetail from '../../components/PhotoDetail/PhotoDetail';

//redex
import { searchPhotos } from '../../slices/photoSlice';

const Search = () => {

  const query = useQuery();
  const search = query.get('q');
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const {photos,loading} = useSelector((state) => state.photo)
  const useLoading = useComponentLoading();
  useEffect(()=>{

    dispatch(searchPhotos(search));

  },[dispatch,search])

  if(loading){
    return useLoading();
  }
  return (
    <div id='search'> 
        <h2>
          Você está buscando por: {search}
          {photos && photos.length > 0 && photos.map((photo) =>(
            <PhotoDetail photo={photo} user={user}/>
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