import React, { useEffect, useState } from 'react';
<link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Permanent+Marker&family=Shadows+Into+Light&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet"></link>
import '../styles/Login.css'
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';



function Login() 
{

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const entrar = async () => {

      let endPoint = 'https://api.escuelajs.co/api/v1/users';

      try {
      
        const response = await axios.get(endPoint);
        const data = response.data;
  
      
        const user = data.find(user => user.email === email);
  
        if (user) {
          console.log('Usuário encontrado:', user);
        } else {
          console.log('Usuário não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }

  };
  return (
    <>
      <div className='paginaInicial'>
        <h1>WebStore</h1>
        <div className='camposEntrada'>
          <div className='login'>
            <input type="text" placeholder='Email' 
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            />

            <input type="password" placeholder='Senha' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button type='button'
            onClick={entrar} 
            >Entrar</button>
          </div>

          <div className='cadastro'>
          <p>Não possui conta?</p>
          <Link to="/cadastro">
          <button type='button'>Cadastrar</button>
          </Link>
          </div>
        </div>
      </div>
    </>

  )
}

export default Login;