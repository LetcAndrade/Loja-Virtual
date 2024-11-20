import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom';


import Login from './telas/Login.jsx';
import Cadastro from './telas/Cadastro.jsx';
import Principal from './telas/Principal.jsx';
import Produto from './telas/Produto.jsx';
import Conta from './telas/Conta.jsx';
import Carrinho from './telas/Carrinho.jsx';


const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Login/>
      },
      {
        path: 'Cadastro',
        element: <Cadastro/>
      },   
      {
        path: 'Principal',
        element: <Principal/>
      },
      {
        path: 'Produto/:id',
        element: <Produto/>
      },
      {
        path: 'Conta',
        element: <Conta/>
      },
      {
        path: 'Carrinho',
        element: <Carrinho/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)