import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Principal.css';

function Principal() {
  const [cartCount, setCartCount] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => 
    {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/');
    }
  }, [navigate]);


  const addToCart = (product) => {
    if (cartCount.some((item) => item.id === product.id)) {
      // Remover do carrinho
      setCartCount(cartCount.filter((item) => item.id !== product.id));
    } else {
      // Adicionar ao carrinho
      setCartCount([...cartCount, product]);
    }
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
          <Link to="/Carrinho" className="card-link">
            <img
              src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
              alt="Carrinho de Compras"
            />
          </Link>
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

        <div className="listaProdutos">
          {products.map((product) => (
            <div key={product.id} className="cardProduto">
              <div>
                <img
                  src={product.images[0]}
                  alt={product.title}
                />
              </div>
              <div className="cardDescricao">
                <Link to={`/Produto/${product.id}`} className="card-link">
                  <h2>{product.title}</h2>
                </Link>
                <p>{product.description}</p>
                <div className="cardValor">
                  <span>${product.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(product)}>
                    {cartCount.some((item) => item.id === product.id)
                      ? 'Remover'
                      : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <p>Feito por Isadora, Leticia e Melissa, Disponível no <a href="https://github.com/LetcAndrade/Loja-Virtual">GitHub</a></p>
      </footer>
    </>
  );
}

export default Principal;
