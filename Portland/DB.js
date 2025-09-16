import * as SQLite from "expo-sqlite";

let dbInstance = null;

// Garante que abre/cria o banco só uma vez
async function getDB() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("camisetas.db");
    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nome TEXT NOT NULL,
        imagem TEXT NOT NULL,
        descricao TEXT
      );
    `);
  }
  return dbInstance;
}

// Seleciona todos os produtos
export async function listarProdutos() {
  const db = await getDB();
  return db.getAllAsync("SELECT * FROM produtos ORDER BY id DESC;");
}

// Insere um novo produto
export async function inserirProduto(nome, imagem, descricao) {
  if (!nome || !imagem) {
    throw new Error("Nome e imagem são obrigatórios.");
  }
  const db = await getDB();
  await db.runAsync(
    "INSERT INTO produtos (nome, imagem, descricao) VALUES (?, ?, ?);",
    [nome.trim(), imagem, descricao || ""]
  );
}

// Atualiza produto existente
export async function atualizarProduto(id, nome, imagem, descricao) {
  if (!id) throw new Error("ID é obrigatório para atualizar.");
  if (!nome || !imagem) throw new Error("Nome e imagem são obrigatórios.");

  const db = await getDB();
  await db.runAsync(
    "UPDATE produtos SET nome = ?, imagem = ?, descricao = ? WHERE id = ?;",
    [nome.trim(), imagem, descricao || "", id]
  );
}

// Deleta um produto
export async function excluirProduto(id) {
  if (!id) throw new Error("ID é obrigatório para deletar.");

  const db = await getDB();
  await db.runAsync("DELETE FROM produtos WHERE id = ?;", [id]);
}

// Produtos padrão para seed
const produtosPadrao = [
  {
    nome: "Real Madrid 23/24",
    imagem: "https://raw.githubusercontent.com/ferreiradev/pam-camisetas-assets/main/real_23.jpeg",
    descricao: "Nova coleção, tecido dry-fit",
  },
  {
    nome: "PSG 23/24",
    imagem: "https://raw.githubusercontent.com/ferreiradev/pam-camisetas-assets/main/psg_23.jpg",
    descricao: "Edição limitada, Ugarte, gola V",
  },
  {
    nome: "Flamengo 23/24",
    imagem: "https://raw.githubusercontent.com/ferreiradev/pam-camisetas-assets/main/fla_23.jpg",
    descricao: "Versão torcedor, manga longa",
  },
];

// Função para rodar o seed só se o banco estiver vazio
export async function seedProdutosPadrao() {
  const db = await getDB();
  const existentes = await db.getAllAsync("SELECT * FROM produtos;");
  console.log("Produtos existentes no banco:", existentes.length);
  if (!existentes || existentes.length === 0) {
    for (const prod of produtosPadrao) {
      await db.runAsync(
        "INSERT INTO produtos (nome, imagem, descricao) VALUES (?, ?, ?);",
        [prod.nome, prod.imagem, prod.descricao]
      );
    }
    console.log("Seed inserido!");
  }
}