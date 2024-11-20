import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Entrega.css';

function Entrega() {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    sobrenome: '',
    cep: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Dados do Formulário:', dadosFormulario);
  };

  return (
    <div className="entrega-conteiner">

      <header className="entrega-cabecalho">
        <div className="menu-icone">☰</div>
        <h1>Swag Labs</h1>
        <div className="icone-carrinho">
          <span className="badge-carrinho">1</span>
        </div>
      </header>

      <h2>Finalização: Suas Informações</h2>

      <div className="caixa-formulario">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={dadosFormulario.nome}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="sobrenome"
          placeholder="Sobrenome"
          value={dadosFormulario.sobrenome}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cep"
          placeholder="CEP"
          value={dadosFormulario.cep}
          onChange={handleInputChange}
        />
      </div>

      <div className="botoes-container">
        <Link to="/carrinho" className="botao-cancelar">
          &#8592; Cancelar
        </Link>
        <button className="botao-continuar" onClick={handleSubmit}>
          Continuar
        </button>
      </div>

      <footer className="entrega-rodape">
        <p>© 2024 Sauce Labs. Todos os Direitos Reservados.</p>
        <p>
          <a href="#">Termos de Serviço</a> | <a href="#">Política de Privacidade</a>
        </p>
      </footer>
    </div>
  );
}

export default Entrega;
