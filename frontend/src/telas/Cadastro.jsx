import React, { useState } from 'react';
import axios from 'axios';

function Cadastro() 
{
    return (
      <div className='paginaInicial'>
        <div className='pagCadastro'>
          <h1>Cadastro</h1>
          <div>
          <label htmlFor="email">Digite seu Email</label>
          <input type="text" id='email' placeholder='Email'/>
          </div>

          <div>
          <label htmlFor="nome">Digite seu nome</label>
          <input type="text" id='nome' placeholder='Email'/>
          </div>

          <div>
          <label htmlFor="senha">Crie uma senha</label>
          <input type="text" id='senha' placeholder='Email'/>
          </div>

          <div>
          <label htmlFor="senha2">Confirme sua Senha</label>
          <input type="text" id='senha2' placeholder='Email'/>
          </div>
          <p>Sua senha deve conter no mínimo 4 digitos</p>
          
          <button>Criar</button>
        </div>
      </div>
    );
  }

export default Cadastro;