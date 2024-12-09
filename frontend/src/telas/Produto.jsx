import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/Produto.css';

function Produto() {
  const { id } = useParams(); // Obtém o ID do produto a partir da URL
  const [product, setProduct] = useState(null); // Estado para armazenar os dados do produto
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/'); // Redireciona para a página inicial se não autenticado
    }
  }, [navigate]);

  // Busca os detalhes do produto com base no ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`); // Chama a API para obter os detalhes do produto
        const data = await response.json();
        setProduct(data); // Atualiza o estado com os dados do produto
      } catch (error) {
        console.error('Erro ao buscar os detalhes do produto:', error); // Log de erro em caso de falha
      }
    };

    fetchProduct();
  }, [id]);

  // Função para logout do usuário
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove o status de autenticação
    navigate('/'); // Redireciona para a página inicial
  };

  // Exibe uma mensagem de carregamento enquanto os dados do produto não foram carregados
  if (!product) {
    return <p>Carregando produto...</p>;
  }

  return (
    <>
      <div className="pag">
        <div className="cabecalho">
          {/* Link para a página inicial */}
          <Link to="/Principal" className="card-link">
            <p>Pagina Inicial</p>
          </Link>

          {/* Link para a página de conta */}
          <Link to="/Conta" className="card-link">
            <p>Conta</p>
          </Link>

          {/* Botão para logout */}
          <p onClick={handleLogout}>Sair</p>

          {/* Link para a página do carrinho */}
          <div>
            <Link to="/Carrinho" className="card-link">
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
                alt="Carrinho de Compras"
              />
            </Link>
          </div>
        </div>

        {/* Link para voltar à lista de produtos */}
        <div className="voltar-para-produtos">
          <Link to="/Principal">&#8592; Voltar para produtos</Link>
        </div>

        {/* Detalhes do produto */}
        <div className="Produto">
          <div>
            <img src={product.images[0]} alt={product.title} /> {/* Imagem do produto */}
          </div>
          <div className="Descricao">
            <h2>{product.title}</h2> {/* Título do produto */}
            <p>{product.description}</p> {/* Descrição do produto */}
            <div className="Valor">
              <span>${product.price.toFixed(2)}</span> {/* Preço formatado */}
              <button>Adicionar</button> {/* Botão para adicionar ao carrinho (não implementado) */}
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