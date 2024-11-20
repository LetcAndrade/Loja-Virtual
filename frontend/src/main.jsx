import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom';


import Login from './telas/Login.jsx';
import Cadastro from './telas/Cadastro.jsx';
import Principal from './telas/Principal.jsx';
import Produto from './telas/Produto.jsx';
import Conta from './telas/Conta.jsx';
<<<<<<< HEAD
import Carrinho from './telas/Carrinho.jsx';
=======
>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4


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
<<<<<<< HEAD
      {
        path: 'Carrinho',
        element: <Carrinho/>
      },
=======
>>>>>>> 48212ec7a6c3ab3a1e5d8614e87661c1cd8635a4
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)