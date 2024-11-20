const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require('path');

//Necessário para extrair os dados de Forms vindos de uma requisição POST
app.use(express.json());
app.use(cors());

app.listen(5000, () => 
{
    console.log('Servidor na porta 5000');
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const usuarios = fs.readFileSync('./db/usuarios.json'); 
    const usuariosJson = JSON.parse(usuarios);  

    const usuario = usuariosJson.find(x => x.email === email && x.password === password);

    if (usuario) {
        res.json({
            message: 'Login bem-sucedido',
            id: usuario.id, 
          });
    } else {
        return res.status(409).send("Usuário ou senha inválidos!");
    }

    
});


app.post("/create", (req, res) => {
    const { email, password, username } = req.body;

    const usuarios = fs.readFileSync('./db/usuarios.json');
    const usuariosJson = JSON.parse(usuarios);

   
    const usuarioExistente = usuariosJson.find(user => user.email === email);
    if (usuarioExistente) {
        return res.status(409).send('E-mail já cadastrado');
    }

 
    const novoUsuario = {
        id: usuariosJson.length + 1,
        username,
        email,
        password
    };

    usuariosJson.push(novoUsuario);

    fs.writeFileSync('./db/usuarios.json', JSON.stringify(usuariosJson, null, 2));

    res.status(201).send('Usuário criado com sucesso');
});


app.delete('/conta/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    try {
      const usuarios = fs.readFileSync('./db/usuarios.json');
      const usuariosJson = JSON.parse(usuarios);
  
      
      const usuariosAtualizados = usuariosJson.filter(user => user.id !== userId);
      if (usuariosAtualizados.length === usuariosJson.length) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      fs.writeFileSync('./db/usuarios.json', JSON.stringify(usuariosAtualizados, null, 2));
  
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
  });


  //retornar o atual usuário
  app.get('/conta/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    try {
      const usuarios = fs.readFileSync('./db/usuarios.json', 'utf-8');
      const usuariosJson = JSON.parse(usuarios);
  
      const usuario = usuariosJson.find(user => user.id === userId);
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      res.status(200).json({
        email: usuario.email,
        username: usuario.username,
        password: usuario.password
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar o e-mail do usuário' });
    }
  });

  //atualizar o e-mail atual de um usuário
  app.patch('/conta/:id/email', (req, res) => {
    const userId = parseInt(req.params.id);
    const { email } = req.body;
  
    if (!email) 
    {
      return res.status(400).json({ message: 'O campo email é obrigatório' });
    }
  
    try {
      const usuarios = fs.readFileSync('./db/usuarios.json', 'utf-8');
      const usuariosJson = JSON.parse(usuarios);
  
      const usuarioIndex = usuariosJson.findIndex(user => user.id === userId);
  
      if (usuarioIndex === -1) 
     {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      usuariosJson[usuarioIndex].email = email;
  
      fs.writeFileSync('./db/usuarios.json', JSON.stringify(usuariosJson, null, 2));
  
      res.status(200).json({ message: 'E-mail atualizado com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao atualizar o e-mail do usuário' });
    }
  });


    //atualizar o nome atual de um usuário
    app.patch('/conta/:id/username', (req, res) => {
      const userId = parseInt(req.params.id);
      const { username } = req.body;
    
      if (!username) 
      {
        return res.status(400).json({ message: 'O nome é obrigatório' });
      }
    
      try {
        const usuarios = fs.readFileSync('./db/usuarios.json', 'utf-8');
        const usuariosJson = JSON.parse(usuarios);
    
        const usuarioIndex = usuariosJson.findIndex(user => user.id === userId);
    
        if (usuarioIndex === -1) 
       {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }
    
        usuariosJson[usuarioIndex].username = username;
    
        fs.writeFileSync('./db/usuarios.json', JSON.stringify(usuariosJson, null, 2));
    
        res.status(200).json({ message: 'Username atualizado com sucesso' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar o Nome do usuário' });
      }
    });
  

     //atualizar a senha atual de um usuário
     app.patch('/conta/:id/password', (req, res) => {
      const userId = parseInt(req.params.id);
      const { password } = req.body;
    
      if (!password) 
      {
        return res.status(400).json({ message: 'O nome é obrigatório' });
      }
    
      try {
        const usuarios = fs.readFileSync('./db/usuarios.json', 'utf-8');
        const usuariosJson = JSON.parse(usuarios);
    
        const usuarioIndex = usuariosJson.findIndex(user => user.id === userId);
    
        if (usuarioIndex === -1) 
       {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }
    
        usuariosJson[usuarioIndex].password = password;
    
        fs.writeFileSync('./db/usuarios.json', JSON.stringify(usuariosJson, null, 2));
    
        res.status(200).json({ message: 'Senha atualizada com sucesso' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar a senha do usuário' });
      }
    });
  