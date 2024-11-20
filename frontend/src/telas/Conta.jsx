import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Conta.css';

function Conta() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [showConfirmation, setShowConfirmation] = useState(false); // Excluir conta
  const [showEmailForm, setShowEmailForm] = useState(false); // E-mail
  const [currentEmail, setCurrentEmail] = useState(''); // salvar email
  const [newEmail, setNewEmail] = useState(''); // salvar novo email
  const [confirmEmail, setConfirmEmail] = useState(''); // salvar confirmação de email

  const [showNomeForm, setShowNomeForm] = useState(false); // Nome
  const [currentNome, setCurrentNome] = useState(''); // salvar nome
  const [newName, setNewName] = useState(''); // salvar novo nome

  // Verifica se o usuário está autenticado e carrega os dados
=======
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(''); 
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('')

  // Verifica se o usuário está autenticado
>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/');
    } else {
<<<<<<< HEAD
      const userId = localStorage.getItem('userId');
      
      // Buscar dados do usuário
      fetch(`http://localhost:5000/conta/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.email) {
            setCurrentEmail(data.email);
          } else {
            console.error('E-mail não encontrado.');
          }
          if (data.username) {
            setCurrentNome(data.username);
          } else {
            console.error('Nome de usuário não encontrado.');
          }
        })
        .catch((error) => console.error('Erro ao buscar dados do usuário:', error));
    }
  }, [navigate]);

  // Sair
=======
        const userId = localStorage.getItem('userId');
        
        fetch(`http://localhost:5000/conta/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.email) {
              setCurrentEmail(data.email); 
            } else {
              console.error('E-mail não encontrado.');
            }
          })
          .catch((error) => console.error('Erro ao buscar e-mail:', error));
      }

  }, [navigate]);

  
  //Sair
>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

<<<<<<< HEAD
  // Deletar a conta
  const handleDeleteAccount = () => {
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/conta/${userId}`, {
=======
//Deletar a conta
  const handleDeleteAccount = () => {
    const userId = localStorage.getItem('userId');  
    fetch(`http://localhost:5000/conta/${userId}`, 
    {
>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
<<<<<<< HEAD
        if (data.message === 'Usuário excluído com sucesso') {
=======
        if (data.message === 'Usuário excluído com sucesso')
        {
>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userId');
          navigate('/');
        } else {
          alert('Erro ao excluir a conta');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao excluir a conta');
      });
  };

<<<<<<< HEAD
  // Alterar email
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
          setCurrentEmail(newEmail);
          setShowEmailForm(false);
          setNewEmail('');
        } else {
          alert('Erro ao atualizar e-mail.');
        }
      })
      .catch((error) => console.error('Erro ao atualizar o e-mail:', error));
  };

  // Alterar nome
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
          setCurrentNome(newName);
          setShowNomeForm(false);
          setNewName('');
        } else {
          alert('Erro ao atualizar o username.');
        }
      })
      .catch((error) => console.error('Erro ao atualizar username:', error));
  };

=======
  //Alterar conta
  const handleEmailChange  = () => {

       if (newEmail !== confirmEmail) {
        alert('Os e-mails não coincidem!');
        return;} 

      if (newEmail === currentEmail) {
        alert('O novo e-mail não pode ser igual ao atual!');
        return;}
      const userId = localStorage.getItem('userId');
      fetch(`http://localhost:5000/conta/${userId}`, 
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'E-mail atualizado com sucesso') 
          {
            alert('E-mail atualizado!');
            setCurrentEmail(newEmail);
            setShowEmailForm(false);
            setNewEmail('')
            setConfirmEmail('')
                   
          } else {
            alert('Erro ao atualizar o e-mail');
          }
        })
        .catch((error) => console.error('Erro ao atualizar e-mail:', error));
  
  };
>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4
  return (
    <>
      <div className="pag">
        <div className="cabecalho">
          <Link to="/Principal" className="card-link">
            <p>Pagina Inicial</p>
          </Link>
          <p>Conta</p>
          <p onClick={handleLogout}>Sair</p>
          <div className="carrinho-container">
<<<<<<< HEAD
            <Link to="/Carrinho" className="card-link">
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
                alt="Carrinho de Compras"
              />
            </Link>
=======
            <img
              src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
              alt="Carrinho de Compras"
            />
            <div className="bolinha"></div>
>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4
          </div>
        </div> 
        <h1>Escolha uma opção desejada</h1>
        <div className='perfil'>
<<<<<<< HEAD
          <p onClick={() => setShowNomeForm(!showNomeForm)}>Alterar Nome</p>
          <p onClick={() => setShowEmailForm(!showEmailForm)}>Alterar E-mail</p>
          <p onClick={() => setShowConfirmation(true)}>Excluir Conta</p>
        </div>
        

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

=======
            <p>Alterar Nome</p>
            <p>Alterar Senha</p>
            <p onClick={() => setShowEmailForm(!showEmailForm)}>Alterar E-mail</p>
            <p onClick={() => setShowConfirmation(true)}>Excluir Conta</p>
        </div>
        
>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4
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
<<<<<<< HEAD
        {showConfirmation && (
          <div className="msg">
            <h2>Você tem certeza que quer excluir a conta?</h2>
=======

        {showConfirmation && 
        (
          <div className="msg">
             <h2>Você tem certeza que quer excluir a conta?</h2>
>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4
            <div className="msgConfirmacao">
              <button onClick={handleDeleteAccount}>Sim, excluir</button>
              <button onClick={() => setShowConfirmation(false)}>Cancelar</button>
            </div>
          </div>
        )}
<<<<<<< HEAD
=======

>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4
      </div>
      <footer>
        <p>Feito por Isadora, Leticia e Melissa, Disponível no <a href="https://github.com/LetcAndrade/Loja-Virtual">GitHub</a></p>
      </footer>
    </>
  );
}

export default Conta;
