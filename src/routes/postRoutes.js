// Importa o framework Express para criar o servidor
import express from "express";

// Importa o middleware Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções do controlador de posts (provavelmente para lógica de posts)
import {
  listarPosts, // Função para listar todos os posts
  postarNewPost, // Função para criar um novo post
  uploadImagem, // Função para lidar com o upload de imagens
} from "../controlers/postsControllers.js";

// Configura o armazenamento em disco do Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // Define o nome do arquivo como o nome original fornecido pelo usuário
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Cria uma instância do Multer com o armazenamento configurado
const upload = multer({ dest: "./uploads", storage });

// Define as rotas para a aplicação Express
const routes = (app) => {
  // Permite que o servidor entenda dados JSON nas requisições
  app.use(express.json());

  // Rota GET para "/posts" para buscar todos os posts (chama a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para "/posts" para criar um novo post (chama a função postarNewPost)
  app.post("/posts", postarNewPost);

  // Rota POST para "/upload" com middleware Multer e função uploadImagem
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

// Exporta a função de rotas como o padrão
export default routes;
