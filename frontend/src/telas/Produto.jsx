import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/Produto.css';

function Produto() {
  const { id } = useParams(); // Obtém o ID do produto 
  const [product, setProduct] = useState(null); // Armazena os dados do produto
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  // Busca os detalhes do produto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do produto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Sair
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  // Exibe um carregamento enquanto os dados do produto estão sendo buscados
  if (!product) {
    return <p>Carregando produto...</p>;
  }

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
          <div>
            <Link to="/Carrinho" className="card-link">
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
                alt="Carrinho de Compras"
              />
            </Link>
          </div>
        </div>

        <div className="voltar-para-produtos">
          <Link to="/Principal">&#8592; Voltar para produtos</Link>
        </div>

        <div className="Produto">
          <div>
            <img src={product.images[0]} alt={product.title} />
          </div>
          <div className="Descricao">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <div className="Valor">
              <span>${product.price.toFixed(2)}</span>
              <button>Adicionar</button>
            </div>
          </div>
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

export default Produto;
