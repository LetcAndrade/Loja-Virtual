import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Finalizado.css';

function Finalizado() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/');
    }
  }, [navigate]);

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
          <p onClick={() => localStorage.removeItem('isAuthenticated')}>Sair</p>
        </div>
        <div className='imagem-Check'>
            <img src="https://imagepng.org/wp-content/uploads/2019/12/check-icone-1-scaled.png" alt="Check-FinalizaçaoPedido" />
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
