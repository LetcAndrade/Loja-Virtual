import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Cadastro.css';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [isSenhaValida, setIsSenhaValida] = useState(true);
  const [isSenhaIgual, setIsSenhaIgual] = useState(true);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const validarSenha = () => {
    setIsSenhaValida(senha.length >= 4);
    setIsSenhaIgual(senha === confirmaSenha);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!isSenhaValida || !isSenhaIgual) {
      setMsg('As senhas não coincidem ou são muito curtas');
      return;
    }

    const data = { username: nome, email, password: senha };

    try {
      const response = await axios.post('http://localhost:5000/create', data);
      setMsg('Usuário criado com sucesso!');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMsg('E-mail já cadastrado');
      } else {
        setMsg('Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <div className="paginaInicial">
      <form className="pagCadastro" onSubmit={submit}>
        <h1>Cadastro</h1>

        <div className="inputs">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="inputs">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="inputs">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onBlur={validarSenha}
            required
          />
        </div>

        <div className="inputs">
          <label htmlFor="confirmaSenha">Confirmação de senha</label>
          <input
            type="password"
            id="confirmaSenha"
            placeholder="Digite sua senha novamente"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            onBlur={validarSenha}
            required
          />
        </div>

        {!isSenhaValida && <p>**Sua senha deve conter no mínimo 4 dígitos**</p>}
        {!isSenhaIgual && <p>**As senhas não coincidem**</p>}

        <p>{msg}</p>

        <button type="submit" disabled={!isSenhaValida || !isSenhaIgual}>
          Criar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
