import React, { useEffect, useState } from 'react';
<link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Permanent+Marker&family=Shadows+Into+Light&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet"></link>
import '../styles/Login.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const validationSchema = Yup.object({
  email: Yup.string().email('E-mail ou senha inválidos').required('E-mail e senha são obrigatórios'),
  password: Yup.string().min(4, 'A senha deve ter pelo menos 4 caracteres').required('E-mail e senha são obrigatórios'),
});

function Login() 
{

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); 
  const [loginError, setLoginError] = useState(''); //erro de login
  const navigate = useNavigate(); 

  const entrar = async () => {
   
    validationSchema
      .validate({ email, password }, { abortEarly: false })
      .then(async () => {
        try {
          const response = await axios.post('http://localhost:5000/login', { email, password });
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userId', response.data.id)
          navigate('/Principal'); 

        } catch (error) {
          if (error.response) {
            setLoginError('E-mail ou senha inválidos');
            setErrors({});
          }
        }
      })
      .catch((err) => {
        const validationErrors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      });
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

            {(errors.email || errors.password) && (
              <div className="mensagemErro">
                {(() => {
                  if (errors.email) {
                    return errors.email;
                  } else if (errors.password) {
                    return errors.password;
                  }
                })()}
              </div>
            )}

            {loginError && (
              <div className="mensagemErro">
                {loginError}
              </div>
            )}
            <button type='button'
            onClick={entrar} 
            >Entrar</button>
          </div>

          <div className='cadastro'>
          <p>Não possui conta?</p>
          <Link to="/cadastro">
          <button type='button' >Cadastrar</button>
          </Link>
          </div>
        </div>
      </div>
    </>

  )
}

export default Login;