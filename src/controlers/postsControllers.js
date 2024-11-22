import { getTodosPost, createPost } from "../models/postModels.js";
import fs from "node:fs";

export async function listarPosts(req, res) {
  // Chama a função para buscar os posts e armazena o resultado
  const posts = await getTodosPost();
  // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
  res.status(200).json(posts);
}

export async function postarNewPost(req, res) {
  const newPost = req.body;
  try {
    const postCriado = await createPost(newPost);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Falha na requisição" });
  }
}
export async function uploadImagem(req, res) {
  const newPost = {
    descricao: "",
    imgUrl: req.file.orginalname,
    alt: "",
  };
  try {
    const postCriado = await createPost(newPost);
    const imagemAtt = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtt);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Falha na requisição" });
  }
}
