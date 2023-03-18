import React, { useState } from 'react'
import './Navbar.css'
//Components
import { NavLink,Link } from 'react-router-dom'
import {BsSearch,BsHouseDoorFill,BsFillPersonFill,BsFillCameraFill} from 'react-icons/bs'

//Hooks

import {useAuth} from '../hooks/useAuth'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logout, reset} from '../slices/authSlices'

const Navbar = () => {

  const {auth} = useAuth()
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [query,setQuery] = useState('')

  const handleLogou = (e)=> {
    e.preventDefault();

    dispatch(logout())
    dispatch(reset())
    navigate('/login')
    
  }

  const handleSearch = (e) =>{
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`);
    }

  }
  return (
    <nav id='nav'>
        <Link to='/'>ReactGram</Link>
        

        <form id="search-form" onSubmit={handleSearch}>
          <BsSearch/> 
          <input type='text' placeholder='pesquisar' onChange={(e) => setQuery(e.target.value)}/>
        </form>

          <ul id='nav-link'>
          {
              auth ? (
                <>
                  <li>
                    <NavLink to='/'>
                      <BsHouseDoorFill/>
                    </NavLink>
                  </li>
                  {
                    user && (
                      <li>
                        <NavLink to={`/users/${user._id}`}>
                          <BsFillCameraFill/>
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <NavLink to='/profile'>
                        <BsFillPersonFill />
                      </NavLink>
                    </li>
                    <li>
                        <span onClick={handleLogou}>Sair</span>
                    </li>
                </>
              ):(
                <>
                  <li>
                    <NavLink to='/login'>Entrar</NavLink>
                  </li>
                  <li>
                    <NavLink to='/register'>Cadastrar</NavLink>
                  </li>
                </>

              )
          }

            
          </ul>
    </nav> 
  )
}

export default Navbar