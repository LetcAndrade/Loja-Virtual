import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Conta.css';

function Conta() {
  const navigate = useNavigate();

  // Estados para controlar exibição de formulários e armazenar dados do usuário
  const [showConfirmation, setShowConfirmation] = useState(false); // Exibição da confirmação de exclusão
  const [showEmailForm, setShowEmailForm] = useState(false); // Exibição do formulário de e-mail
  const [currentEmail, setCurrentEmail] = useState(''); // E-mail atual do usuário
  const [newEmail, setNewEmail] = useState(''); // Novo e-mail a ser alterado
  const [confirmEmail, setConfirmEmail] = useState(''); // Confirmação do novo e-mail
  const [showNomeForm, setShowNomeForm] = useState(false); // Exibição do formulário de nome
  const [currentNome, setCurrentNome] = useState(''); // Nome atual do usuário
  const [newName, setNewName] = useState(''); // Novo nome a ser alterado

  // Verifica se o usuário está autenticado e carrega os dados do servidor
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/'); // Redireciona para a página inicial se não autenticado
    } else {
      const userId = localStorage.getItem('userId');
      
      // Busca os dados do usuário pelo ID
      fetch(`http://localhost:5000/conta/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.email) setCurrentEmail(data.email); // Atualiza o e-mail atual
          if (data.username) setCurrentNome(data.username); // Atualiza o nome atual
        })
        .catch((error) => console.error('Erro ao buscar dados do usuário:', error));
    }
  }, [navigate]);

  // Realiza logout do usuário
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove autenticação do localStorage
    navigate('/'); // Redireciona para a página inicial
  };

  // Deleta a conta do usuário
  const handleDeleteAccount = () => {
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/conta/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Usuário excluído com sucesso') {
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userId');
          navigate('/'); // Redireciona após exclusão
        } else {
          alert('Erro ao excluir a conta');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao excluir a conta');
      });
  };

  // Atualiza o e-mail do usuário
  const handleEmailChange = () => {
    if (newEmail !== confirmEmail) {
      alert('Os e-mails não coincidem!');
      return;
    }

    if (newEmail === currentEmail) {
      alert('O novo e-mail não pode ser igual ao atual!');
      return;
    }

    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/conta/${userId}/email`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'E-mail atualizado com sucesso') {
          alert('Email atualizado!');
          setCurrentEmail(newEmail); // Atualiza o e-mail no estado
          setShowEmailForm(false); // Fecha o formulário
          setNewEmail(''); // Reseta o campo do novo e-mail
        } else {
          alert('Erro ao atualizar e-mail.');
        }
      })
      .catch((error) => console.error('Erro ao atualizar o e-mail:', error));
  };

  // Atualiza o nome do usuário
  const handleNameChange = () => {
    if (newName === currentNome) {
      alert('O novo username não pode ser igual ao atual!');
      return;
    }

    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/conta/${userId}/username`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Username atualizado com sucesso') {
          alert('Username atualizado!');
          setCurrentNome(newName); // Atualiza o nome no estado
          setShowNomeForm(false); // Fecha o formulário
          setNewName(''); // Reseta o campo do novo nome
        } else {
          alert('Erro ao atualizar o username.');
        }
      })
      .catch((error) => console.error('Erro ao atualizar username:', error));
  };

  return (
    <>
      <div className="pag">
        <div className="cabecalho">
          {/* Links para navegação */}
          <Link to="/Principal" className="card-link">
            <p>Pagina Inicial</p>
          </Link>
          <p>Conta</p>
          <p onClick={handleLogout}>Sair</p>
          <div className="carrinho-container">
            <Link to="/Carrinho" className="card-link">
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
                alt="Carrinho de Compras"
              />
            </Link>
          </div>
        </div> 

        <h1>Escolha uma opção desejada</h1>
        <div className='perfil'>
          {/* Opções de gerenciamento de conta */}
          <p onClick={() => setShowNomeForm(!showNomeForm)}>Alterar Nome</p>
          <p onClick={() => setShowEmailForm(!showEmailForm)}>Alterar E-mail</p>
          <p onClick={() => setShowConfirmation(true)}>Excluir Conta</p>
        </div>
        
        {/* Formulário para alterar nome */}
        {showNomeForm && (
          <div className="msg">
            <h2>Seu username atual</h2>
            <p>{currentNome}</p>
            <input
              type="text"
              placeholder="Novo username"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleNameChange}>Atualizar Nome</button>
          </div>
        )}

        {/* Formulário para alterar e-mail */}
        {showEmailForm && (
          <div className="msg">
            <h2>Seu e-mail atual</h2>
            <p>{currentEmail}</p>
            <input
              type="email"
              placeholder="Novo e-mail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="email"
              placeholder="Confirme o novo e-mail"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            <button onClick={handleEmailChange}>Atualizar E-mail</button>
          </div>
        )}

        {/* Confirmação para excluir conta */}
        {showConfirmation && (
          <div className="msg">
            <h2>Você tem certeza que quer excluir a conta?</h2>
            <div className="msgConfirmacao">
              <button onClick={handleDeleteAccount}>Sim, excluir</button>
              <button onClick={() => setShowConfirmation(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
      
      <footer>
        <p>Feito por Isadora e Leticia. Disponível no <a href="https://github.com/LetcAndrade/Loja-Virtual">GitHub</a></p>
      </footer>
    </>
  );
}

export default Conta;