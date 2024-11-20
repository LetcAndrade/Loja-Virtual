import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Final.css';

function Final() {
  return (
    <div className="final-container">

      <header className="final-cabecalho">
        <div className="menu-icone">☰</div>
        <h1>Swag Labs</h1>
        <div className="carrinho-icone">
          <span className="carrinho-badge">0</span>
        </div>
      </header>

      <h2>Checkout: Completo!</h2>

      <div className="final-mensagem">
        <div className="icone-confirmacao">✅</div>
        <h3>Obrigado pelo seu pedido!</h3>
        <p>
          Seu pedido foi enviado e chegará assim que o "pony" puder chegar lá!
        </p>
      </div>

      <div className="final-acoes">
        <Link to="/" className="botao-voltar">
          Voltar para Início
        </Link>
      </div>

      <footer className="final-rodape">
        <div className="rodape-redes-sociais">
          <span>🐦</span>
          <span>📘</span>
          <span>💼</span>
        </div>
        <p>© 2024 Sauce Labs. Todos os Direitos Reservados.</p>
        <p>
          <a href="#">Termos de Serviço</a> | <a href="#">Política de Privacidade</a>
        </p>
      </footer>
    </div>
  );
}

export default Final;
