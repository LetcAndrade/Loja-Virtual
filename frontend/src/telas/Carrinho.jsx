import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Carrinho.css';

function Carrinho() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const consolidatedCart = consolidateCart(storedCart);
    setCart(consolidatedCart);
  }, []);

  const consolidateCart = (cartItems) => {
    const consolidated = cartItems.reduce((acc, item) => {
      const existingItem = acc.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
    return consolidated;
  };

  const handleAddItem = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
          <p onClick={() => localStorage.removeItem('isAuthenticated')}>Sair</p>
        </div>
        <div className="voltar-para-produtos">
          <Link to="/Principal">&#8592; Voltar para produtos</Link>
        </div>

        <h1>Carrinho de Compras</h1>
        <div className='listaProdutos'>
        {cart.length === 0 ? (
          <p className="msg-carrinho">Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="carrinho-item">
                <img src={item.images[0]} alt={item.title} className="carrinho-item-imagem" />
                <div className="cardDescricao">
                  <h2>{item.title}</h2>
                  <p>Quantidade: {item.quantity}</p>
                  <button onClick={() => handleAddItem(item.id)} className="bt-add">+ Adicionar</button>
                  <button onClick={() => handleRemoveItem(item.id)} className="bt-remove">- Remover</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button className="enviar-pedido">ENVIAR PEDIDO</button>
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
