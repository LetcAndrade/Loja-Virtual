import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/Cadastro.css'


function Cadastro() 
{
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [isSenhaValida, setIsSenhaValida] = useState(true);

  const validarSenha = () => {
    if (senha.length < 4 || confirmaSenha.length < 4) {
      setIsSenhaValida(false);
    } else {
      setIsSenhaValida(true);
    }
  };

    return (
      <div className='paginaInicial'>
        <div className='pagCadastro'>
          <h1>Cadastro</h1>
          <div className='inputs'>
            <label htmlFor="nome">Nome</label>
            <input type="text" id='nome' placeholder='Digite seu nome'/>
          </div>
        
          <div className='inputs'>
            <label htmlFor="email">E-mail</label>
            <input type="text" id='email' placeholder='Digite seu e-mail'/>
          </div>

          <div className='inputs'>
            <label htmlFor="email">Senha</label>
            <input type="password" id='email' placeholder='Digite sua senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onBlur={validarSenha}
            />
          </div>

          <div className='inputs'>
            <label htmlFor="email">Confirmação de senha</label>
            <input type="password" id='email' placeholder='Digite sua senha novamente'
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            onBlur={validarSenha}
            />
          </div>

          {!isSenhaValida && <p>**Sua senha deve conter no mínimo 4 digitos**</p>}

          <Link>
          <button type='button'>Criar</button>
          </Link>
        </div>
      </div>
    );
  }

export default Cadastro;