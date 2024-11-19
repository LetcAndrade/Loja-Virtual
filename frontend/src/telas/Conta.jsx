import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Conta.css';

function Conta() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(''); 
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('')

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/');
    } else {
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
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

//Deletar a conta
  const handleDeleteAccount = () => {
    const userId = localStorage.getItem('userId');  
    fetch(`http://localhost:5000/conta/${userId}`, 
    {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Usuário excluído com sucesso')
        {
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
            <img
              src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
              alt="Carrinho de Compras"
            />
            <div className="bolinha"></div>
          </div>
        </div> 
        <h1>Escolha uma opção desejada</h1>
        <div className='perfil'>
            <p>Alterar Nome</p>
            <p>Alterar Senha</p>
            <p onClick={() => setShowEmailForm(!showEmailForm)}>Alterar E-mail</p>
            <p onClick={() => setShowConfirmation(true)}>Excluir Conta</p>
        </div>
        
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

        {showConfirmation && 
        (
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
        <p>Feito por Isadora, Leticia e Melissa, Disponível no <a href="https://github.com/LetcAndrade/Loja-Virtual">GitHub</a></p>
      </footer>
    </>
  );
}

export default Conta;
