import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPost() {
  // Seleciona o banco de dados 'imersao-instabytes'
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção 'posts' dentro do banco de dados
  const colecao = db.collection("posts");
  // Retorna um array com todos os documentos da coleção
  return colecao.find().toArray();
}

export async function createPost(newPost) {
  const db = conexao.db("imersao-instabytes");

  const colecao = db.collection("posts");

  return colecao.insertOne(newPost);
}

export async function atualizarPoste(id, newPost) {
  const db = conexao.db("imersao-instabytes");

  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);

  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: newPost });
}
