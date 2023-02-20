import React from 'react'

import './Auth.css'
//components
import { Link } from 'react-router-dom'

//Hooks
import { useState,useEffect } from 'react'

//Redux
import {register,reset} from '../../slices/authSlices'
import { useDispatch, useSelector } from 'react-redux'

//Message
import Message from '../../components/Message'


const Register = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const {loading,error} = useSelector((state)=> state.auth);

  const handleSubmit =(e) =>{
    e.preventDefault(e);
      
    const user = {
      name,
      email,
      password,
      confirmPassword
    }


    dispatch(register(user))

  }

  //clean all auth States
  useEffect(() =>{
    dispatch(reset());
  },[dispatch])

  return (
    <div id="register">
        <h2>ReactGram</h2>
        <p className='subtitle'>
          Cadastre-se para ver as fotos dos seus amigos.
        </p>
        <form onSubmit={handleSubmit}>
            <input type="text"  placeholder='Nome'  onChange={(e) => setName(e.target.value)} value={name}/>
            <input type="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} value={password}/>
            <input type="password" placeholder='Confirme a senha' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
            {!loading  && <input type="submit"  value='Cadastrar'/> }
            {loading  && <input type="submit"  value='Aguarde...' disabled/> }
            {error && <Message msg={error} type="error"></Message>}
        </form>
        <p>
          Já tem conta?<Link to='/login'>Cliqui aqui</Link>
        </p>
    </div>
  )
}

export default Register