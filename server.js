const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Rota POST para salvar formulário
app.post("/submit-form", (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;
  const novoDado = { nome, email, telefone, mensagem, data: new Date() };

  const arquivo = path.join(__dirname, "formulario.json");
  let dadosAtuais = [];

  if (fs.existsSync(arquivo)) {
    const conteudo = fs.readFileSync(arquivo, "utf-8");
    try { dadosAtuais = JSON.parse(conteudo); } 
    catch { dadosAtuais = []; }
  }

  dadosAtuais.push(novoDado);
  fs.writeFileSync(arquivo, JSON.stringify(dadosAtuais, null, 2));

  console.log("Dados recebidos e salvos:", novoDado);
  res.json({ status: "ok", message: "Formulário enviado com sucesso!" });
});

// Servir o HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "sobre.html"));
});

// Rodar servidor
app.listen(3000, () => console.log("Servidor rodando em http://127.0.0.1:3000"));
