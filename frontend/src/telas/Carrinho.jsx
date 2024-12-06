import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Carrinho() {
  const navigate = useNavigate();

 // Verifica se o usuário está autenticado
 useEffect(() => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated !== 'true') {
    navigate('/');
  }
}, [navigate]);

//Sair da conta
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated');
  navigate('/');
};
  return (
    <>
    <div className="pag">
      <div className="cabecalho">
          <Link to="/Principal" className="card-link">
            <p>Pagina Inicial</p>
          </Link>

          <Link to="/Conta" className="card-link">
          <p>Conta</p>
          </Link>

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
        <div className="voltar-para-produtos">
          <Link to="/Principal">&#8592; Continuar Comprando</Link>
        </div>
      </div>
      <footer>
        <p>Feito por Isadora e Leticia. Disponível no <a href="https://github.com/LetcAndrade/Loja-Virtual">GitHub</a></p>
      </footer>

    </>
  );
}

export default Carrinho;
