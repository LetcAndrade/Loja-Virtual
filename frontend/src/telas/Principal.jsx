import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Principal.css';

function Principal() {
  // Estado para armazenar os produtos disponíveis
  const [products, setProducts] = useState([]);
  // Estado para gerenciar os itens adicionados ao carrinho
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Busca os produtos na API ao carregar o componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        setProducts(data.slice(0, 45)); // Limita o número de produtos exibidos a 45
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error); // Loga erros de busca
      }
    };

    fetchProducts();
  }, []);

  // Carrega o carrinho do localStorage ao iniciar o componente
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart); // Define o carrinho com os itens salvos
  }, []);

  // Adiciona um produto ao carrinho, verificando duplicatas
  const handleAddToCart = (product) => {
    const isAlreadyInCart = cart.some((item) => item.id === product.id);

    if (isAlreadyInCart) {
      alert(`${product.title} já está no carrinho!`); // Exibe alerta para duplicatas
      return;
    }

    const updatedCart = [...cart, product];
    setCart(updatedCart); // Atualiza o estado do carrinho
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Salva o carrinho no localStorage
    alert(`${product.title} foi adicionado ao carrinho!`); // Confirmação ao usuário
  };

  // Verifica se um produto já está no carrinho
  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  // Redireciona o usuário para a página de login se não estiver autenticado
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/'); // Navega para a página de login
    }
  }, [navigate]);

  // Realiza logout removendo a autenticação do localStorage
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove a autenticação
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <>
      <div className="pag">
        <div className="cabecalho">
          {/* Links para navegação entre páginas */}
          <Link to="/Principal" className="card-link">
            <p>Pagina Inicial</p>
          </Link>

          <Link to="/Conta" className="card-link">
            <p>Conta</p>
          </Link>

          {/* Botão de logout */}
          <p onClick={handleLogout}>Sair</p>

          {/* Link para a página do carrinho */}
          <div className="carrinho-container">
            <Link to="/Carrinho" className="card-link">
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
                alt="Carrinho de Compras"
              />
            </Link>
          </div>
        </div>

        <div className="produtos">
          <p>Produtos</p>
        </div>

        {/* Renderiza a lista de produtos */}
        <div className="listaProdutos">
          {products.map((product) => (
            <div key={product.id} className="cardProduto">
              {/* Exibição da imagem do produto */}
              <div>
                <img src={product.images[0]} alt={product.title} />
              </div>
              <div className="cardDescricao">
                {/* Link para a página de detalhes do produto */}
                <Link to={`/Produto/${product.id}`} className="card-link">
                  <h2>{product.title}</h2>
                </Link>
                <p>{product.description}</p>
                <div className="cardValor">
                  {/* Exibição do preço e botão de adicionar ao carrinho */}
                  <span>${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={
                      isProductInCart(product.id)
                        ? 'botao-adicionado' // Classe para produto já adicionado
                        : 'botao-adicionar' // Classe para produto não adicionado
                    }
                  >
                    {isProductInCart(product.id) ? 'Adicionado' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default Principal;
