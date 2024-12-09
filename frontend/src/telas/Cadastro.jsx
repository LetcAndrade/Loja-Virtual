import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Cadastro.css';

function Cadastro() {
  // Estados para armazenar os dados do formulário e validações
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [isSenhaValida, setIsSenhaValida] = useState(true); // Valida o comprimento da senha
  const [isSenhaIgual, setIsSenhaIgual] = useState(true); // Verifica se as senhas coincidem
  const [msg, setMsg] = useState(''); // Mensagem de erro ou sucesso
  const navigate = useNavigate();

  // Validações de senha (comprimento e igualdade)
  const validarSenha = () => {
    setIsSenhaValida(senha.length >= 4); // Verifica se a senha tem pelo menos 4 caracteres
    setIsSenhaIgual(senha === confirmaSenha); // Verifica se a senha e sua confirmação são iguais
  };

  // Submissão do formulário de cadastro
  const submit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Exibe mensagem de erro caso as validações falhem
    if (!isSenhaValida || !isSenhaIgual) {
      setMsg('As senhas não coincidem ou são muito curtas');
      return;
    }

    const data = { username: nome, email, password: senha }; // Dados a serem enviados para o servidor

    try {
      // Faz a requisição para criar um novo usuário
      const response = await axios.post('http://localhost:5000/create', data);
      setMsg('Usuário criado com sucesso!'); // Exibe mensagem de sucesso

      // Redireciona para a página inicial após 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      // Trata erros específicos como e-mail já cadastrado
      if (error.response && error.response.status === 409) {
        setMsg('E-mail já cadastrado');
      } else {
        setMsg('Ocorreu um erro inesperado. Tente novamente.'); // Mensagem genérica para outros erros
      }
    }
  };

  return (
    <div className="paginaInicial">
      <form className="pagCadastro" onSubmit={submit}>
        <h1>Cadastro</h1>

        {/* Campo para nome do usuário */}
        <div className="inputs">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)} // Atualiza o estado do nome
            required
          />
        </div>

        {/* Campo para e-mail do usuário */}
        <div className="inputs">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do e-mail
            required
          />
        </div>

        {/* Campo para senha do usuário */}
        <div className="inputs">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
            onBlur={validarSenha} // Valida a senha ao perder o foco
            required
          />
        </div>

        {/* Campo para confirmação da senha */}
        <div className="inputs">
          <label htmlFor="confirmaSenha">Confirmação de senha</label>
          <input
            type="password"
            id="confirmaSenha"
            placeholder="Digite sua senha novamente"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)} // Atualiza o estado da confirmação de senha
            onBlur={validarSenha} // Valida a senha ao perder o foco
            required
          />
        </div>

        {/* Mensagens de validação */}
        {!isSenhaValida && <p>**Sua senha deve conter no mínimo 4 dígitos**</p>}
        {!isSenhaIgual && <p>**As senhas não coincidem**</p>}
        <p>{msg}</p> {/* Mensagem de erro ou sucesso geral */}

        {/* Botão de submissão, desativado se as senhas forem inválidas */}
        <button type="submit" disabled={!isSenhaValida || !isSenhaIgual}>
          Criar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;