import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Carrinho.css';

function Carrinho() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); // Estado para armazenar os itens do carrinho

  // Verifica se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/'); // Redireciona para a página inicial se não autenticado
    }
  }, [navigate]);

  // Carrega o carrinho do localStorage e consolida os itens duplicados
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const consolidatedCart = consolidateCart(storedCart); // Consolida itens duplicados
    setCart(consolidatedCart);
  }, []);

  // Consolida itens do carrinho (agrupa por ID e soma quantidades)
  const consolidateCart = (cartItems) => {
    const consolidated = cartItems.reduce((acc, item) => {
      const existingItem = acc.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1; // Incrementa a quantidade se o item já estiver no carrinho
      } else {
        acc.push({ ...item, quantity: 1 }); // Adiciona o item com quantidade inicial 1
      }
      return acc;
    }, []);
    return consolidated;
  };
  
   // Realiza logout do usuário
   const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove autenticação do localStorage
    navigate('/'); // Redireciona para a página inicial
  };

  // Adiciona um item ao carrinho (incrementa a quantidade)
  const handleAddItem = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 }; // Incrementa a quantidade
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Atualiza o localStorage
  };

  // Remove um item do carrinho (decrementa a quantidade ou remove se chegar a 0)
  const handleRemoveItem = (itemId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity - 1 }; // Decrementa a quantidade
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // Remove itens com quantidade 0
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Atualiza o localStorage
  };

  return (
    <>
      <div className="pag">
        <div className="cabecalho">
          {/* Links de navegação */}
          <Link to="/Principal" className="card-link">
            <p>Pagina Inicial</p>
          </Link>
          <Link to="/Conta" className="card-link">
            <p>Conta</p>
          </Link>
          {/* Botão de logout */}
          <p onClick={handleLogout}>Sair</p>
        </div>

        <div className="voltar-para-produtos">
          {/* Link para voltar aos produtos */}
          <Link to="/Principal">&#8592; Voltar para produtos</Link>
        </div>

        <h1>Carrinho de Compras</h1>

        <div className="listaProdutos">
          {cart.length === 0 ? (
            <p className="msg-carrinho">Seu carrinho está vazio.</p> // Mensagem se o carrinho estiver vazio
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="carrinho-item">
                  {/* Exibição do produto no carrinho */}
                  <img src={item.images[0]} alt={item.title} className="carrinho-item-imagem" />
                  <div className="cardDescricao">
                    <h2>{item.title}</h2>
                    <p>Quantidade: {item.quantity}</p>
                    {/* Botões para adicionar ou remover itens */}
                    <button onClick={() => handleAddItem(item.id)} className="bt-add">+ Adicionar</button>
                    <button onClick={() => handleRemoveItem(item.id)} className="bt-remove">- Remover</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Botão para finalizar o pedido, se houver itens no carrinho */}
          {cart.length > 0 && (
            <button
              className="enviar-pedido"
              onClick={() => {
                setCart([]); // Limpa o carrinho
                localStorage.removeItem('cart'); // Remove o carrinho do localStorage
                navigate('/Finalizado'); // Redireciona para a página de finalização
              }}
            >
              ENVIAR PEDIDO
            </button>
          )}
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

export default Carrinho;