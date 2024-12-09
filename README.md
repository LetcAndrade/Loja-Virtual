# **Loja Virtual**

Este projeto é uma aplicação de e-commerce que simula o funcionamento de uma loja virtual, oferecendo funcionalidades CRUD (Criar, Ler, Atualizar e Deletar) para gerenciar produtos e permitir que os usuários explorem um catálogo dinâmico, vejam detalhes dos itens e realizem compras.

A aplicação utiliza **React** no front-end, junto com **React DOM** para manipulação eficiente da árvore de componentes no navegador, garantindo uma interface responsiva e interativa. No back-end, **Node.js** e **Express** são usados para gerenciar a lógica de negócios e a integração com a API pública **Escuela JS**, que fornece descrições, imagens e preços dos produtos. Além disso, o módulo **File System** do Node.js é utilizado para manipulação de arquivos no servidor, ampliando as funcionalidades do sistema.

---

## **Tecnologias Utilizadas**

- **React**: Biblioteca JavaScript para construção de interfaces dinâmicas e componentizadas.
- **React DOM**: Biblioteca complementar ao React que manipula de forma eficiente o DOM no navegador, conectando os componentes React ao ambiente do usuário.
- **Node.js**: Ambiente de execução JavaScript server-side para criação de aplicações rápidas e escaláveis.
- **Express**: Framework para Node.js que simplifica o desenvolvimento de APIs RESTful.
- **API Escuela JS**: Serviço externo que fornece dados como descrições, imagens e preços dos produtos.
- **File System (Node.js)**: Utilizado para leitura e escrita de dados no servidor.

---

## **Problema que o Projeto Tenta Resolver**

O projeto busca solucionar a necessidade de uma plataforma que centralize a visualização e a gestão de produtos, permitindo que os usuários naveguem, adicionem ao carrinho e concluam compras de maneira prática, enquanto possibilita operações CRUD para administração de dados no back-end.

---

## **Por que é um Problema Importante**

Atualmente, o comércio online é essencial para empresas que desejam alcançar um público maior e oferecer conveniência aos seus clientes. Aplicações como esta possibilitam operações 24/7, promovem uma experiência de compra otimizada e demonstram o impacto das tecnologias no mercado digital.

---

## **Estrutura do Projeto**

### **Front-end (React e React DOM)**

O front-end é responsável pela interface do usuário, com os seguintes componentes principais:

- **Catálogo de Produtos**: Exibe os produtos obtidos da API com nome, imagem e preço.
- **Detalhes do Produto**: Mostra informações completas de um item, incluindo descrição e imagens adicionais.
- **Carrinho de Compras**: Permite adicionar produtos e visualizar os itens antes da compra.

### **Back-end (Node.js com Express)**

O back-end gerencia a lógica de negócios e as funcionalidades CRUD para produtos. Seus principais componentes incluem:

- **Servidor Express**: Configura rotas e middleware para lidar com requisições.
- **Integração com API de Produtos**: Obtém dados atualizados da API Escuela JS.
- **Gerenciamento de Arquivos**: Utiliza o módulo File System para operações no servidor, como armazenamento de registros.

---

## **Como Executar o Projeto**

1. Clone este repositório.
2. Instale as dependências com `npm install`.
3. Abra um terminal para o front-end e digite o comando `npm run dev`.
4. Abra um terminal para o back-end e digite o comando `node server.js`.
