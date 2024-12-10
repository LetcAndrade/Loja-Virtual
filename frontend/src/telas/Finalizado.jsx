import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Finalizado.css';

function Finalizado() {
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/'); // Redireciona para a página inicial caso não esteja autenticado
    }
  }, [navigate]);

     // Realiza logout do usuário
     const handleLogout = () => {
      localStorage.removeItem('isAuthenticated'); // Remove autenticação do localStorage
      navigate('/'); // Redireciona para a página inicial
    };
  

  return (
    <>
      <div className="pag">
        <div className="cabecalho">
          {/* Link para voltar à página inicial */}
          <Link to="/Principal" className="card-link">
            <p>Pagina Inicial</p>
          </Link>

          {/* Link para a página de conta */}
          <Link to="/Conta" className="card-link">
            <p>Conta</p>
          </Link>

          {/* Botão de logout */}
          <p onClick={handleLogout}>Sair</p>
        </div>

        <div className='imagem-Check'>
          {/* Ícone e mensagem de confirmação do pedido */}
          <img 
            src="https://imagepng.org/wp-content/uploads/2019/12/check-icone-1-scaled.png" 
            alt="Check-FinalizaçaoPedido" 
          />
          <p>Pedido Realizado!</p>
        </div>
      </div>

      <footer>
        <p>
          Feito por Isadora e Leticia. Disponível no{' '}
          <a href="https://github.com/LetcAndrade/Loja-Virtual">GitHub</a>
        </p>
      </footer>
    </>
  );
}

export default Finalizado;