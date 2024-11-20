import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Confirmacao.css';

function Confirmacao() {
  return (
    <div className="confirmacao-conteiner">

      <header className="confirmacao-cabecalho">
        <div className="menu-icone">☰</div>
        <h1>Swag Labs</h1>
        <div className="icone-carrinho">
          <span className="badge-carrinho">1</span>
        </div>
      </header>

      <h2>Resumo do Pedido</h2>

      <div className="detalhes-carrinho">
        <div className="item-carrinho">
          <div className="quantidade-carrinho">1</div>
          <div className="descricao-carrinho">
            <h3>Mochila Sauce Labs</h3>
            <p>
              carry.allTheThings() com o design elegante e compacto da Sly Pack, 
              que combina estilo incomparável com proteção para laptops e tablets.
            </p>
            <span className="preco-item">R$29,99</span>
          </div>
        </div>
      </div>

      <div className="informacoes-pedido">
        <h3>Informações de Pagamento:</h3>
        <p>SauceCard #31337</p>

        <h3>Informações de Envio:</h3>
        <p>Entrega Rápida Pony Express!</p>

        <h3>Total do Pedido</h3>
        <p>Subtotal: R$29,99</p>
        <p>Taxa: R$2,40</p>
        <p>
          <strong>Total: R$32,39</strong>
        </p>
      </div>

      <div className="botoes-container">
        <Link to="/carrinho" className="botao-cancelar">
          &#8592; Cancelar
        </Link>
        <button className="botao-finalizar">Finalizar</button>
      </div>
    </div>
  );
}

export default Confirmacao;
