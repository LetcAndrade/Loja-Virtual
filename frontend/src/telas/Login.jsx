import React, { useEffect, useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// Esquema de validação para os campos de login
const validationSchema = Yup.object({
  email: Yup.string()
    .email('E-mail ou senha inválidos') // Valida se o e-mail está no formato correto
    .required('E-mail e senha são obrigatórios'), // E-mail obrigatório
  password: Yup.string()
    .min(4, 'A senha deve ter pelo menos 4 caracteres') // Valida comprimento mínimo da senha
    .required('E-mail e senha são obrigatórios'), // Senha obrigatória
});

function Login() {
  const [email, setEmail] = useState(''); // Estado para armazenar o e-mail
  const [password, setPassword] = useState(''); // Estado para armazenar a senha
  const [errors, setErrors] = useState({}); // Armazena erros de validação
  const [loginError, setLoginError] = useState(''); // Armazena erro de login no servidor
  const navigate = useNavigate(); // Navegação para outras páginas

  // Função para validar e enviar os dados de login
  const entrar = async () => {
    // Valida os campos usando o esquema do Yup
    validationSchema
      .validate({ email, password }, { abortEarly: false }) // Valida todos os erros de uma vez
      .then(async () => {
        try {
          // Envia os dados de login para o servidor
          const response = await axios.post('http://localhost:5000/login', { email, password });
          localStorage.setItem('isAuthenticated', 'true'); // Salva o estado de autenticação no localStorage
          localStorage.setItem('userId', response.data.id); // Salva o ID do usuário autenticado
          navigate('/Principal'); // Redireciona para a página principal
        } catch (error) {
          if (error.response) {
            setLoginError('E-mail ou senha inválidos'); // Define mensagem de erro em caso de credenciais inválidas
            setErrors({});
          }
        }
      })
      .catch((err) => {
        // Captura erros de validação e os organiza em um objeto
        const validationErrors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(validationErrors); // Define os erros no estado
      });
  };

  return (
    <>
      <div className='paginaInicial'>
        <h1>WebStore</h1>
        <div className='camposEntrada'>
          <div className='login'>
            {/* Campo de entrada para o e-mail */}
            <input 
              type="text" 
              placeholder='Email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />

            {/* Campo de entrada para a senha */}
            <input 
              type="password" 
              placeholder='Senha' 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />

            {/* Exibe erros de validação nos campos */}
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

            {/* Exibe erros de login do servidor */}
            {loginError && (
              <div className="mensagemErro">
                {loginError}
              </div>
            )}

            {/* Botão para executar o login */}
            <button 
              type='button'
              onClick={entrar}
            >
              Entrar
            </button>
          </div>

          {/* Link para a página de cadastro */}
          <div className='cadastro'>
            <p>Não possui conta?</p>
            <Link to="/cadastro">
              <button type='button'>Cadastrar</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
