import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Principal.css';

function Principal() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const addToCart = (e) => {
    e.stopPropagation();
    setCartCount(cartCount + 1);
  };
  
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
            <img
              src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
              alt="Carrinho de Compras"
            />
            {cartCount > 0 && <div className="bolinha">{cartCount}</div>}
          </div>
        </div>

        <div className="produtos">
          <p>Produtos</p>
          <div className="filtro">
            <img
              htmlFor="opcoes"
              src="https://cdn-icons-png.flaticon.com/512/14/14309.png"
              alt="Filtro"
            />
            <select id="opcoes" name="opcoes">
              <option value="opcao1">Tudo</option>
              <option value="opcao2">Eletronicos</option>
              <option value="opcao3">Sapatos</option>
              <option value="opcao4">Variados</option>
              <option value="opcao5">Mobília</option>
              <option value="opcao6">Roupas</option>
            </select>
          </div>
        </div>

        <div className="cardProduto">
          <div>
            <img
              src="https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/tadeaioo/catalog/prime/preto-nude/tenis-feminino-academia-ultrabone-ultra-prime-preto-nude-2.jpg"
              alt="Produto"
            />
          </div>
          <div className="cardDescricao">
            <Link to="/Produto" className="card-link">
              <h2>Nome Produto</h2>
            </Link>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              aspernatur esse quis eum accusantium ex quo aliquam commodi
              vero rerum! Libero ipsam ducimus porro, saepe animi nulla
              molestias iusto sit!
            </p>
            <div className="cardValor">
              <span>$29.99</span>
              <button onClick={addToCart}>Adiciona</button>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>Feito por Isadora, Leticia e Melissa, Disponível no <a href="https://github.com/LetcAndrade/Loja-Virtual">GitHub</a></p>
      </footer>
    </>
  );
}

export default Principal;
