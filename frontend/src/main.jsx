import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom';


import Login from './telas/Login.jsx';
import Cadastro from './telas/Cadastro.jsx';
import Principal from './telas/Principal.jsx';
import Produto from './telas/Produto.jsx';


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
        path: 'Produto',
        element: <Produto/>
      },
    ]
  },

  /*
  {
    path: 'cursos/:nome',
    element: <ListaCursos />
  }*/
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)