import express from "express";
import routes from "./src/routes/postRoutes.js";
// Cria uma instância do Express, que será o núcleo da nossa aplicação
const app = express();

app.use(express.static("uploads"));
routes(app);
// Array de posts (dados fictícios) que será substituído pelos dados do banco de dados
const posts = [
  // ... (seus posts)
];

app.listen(3000, () => {
  console.log("Api Rodando");
});
