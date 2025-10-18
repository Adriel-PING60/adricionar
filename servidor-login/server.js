import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "minha_chave_super_secreta";

const usuarios = [
  {
    id: 1,
    nome: "Administrador",
    email: "admin@empresa.com",
    senha: bcrypt.hashSync("123456", 8),
  },
];

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const user = usuarios.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Usuário não encontrado" });
  }

  const senhaValida = bcrypt.compareSync(senha, user.senha);
  if (!senhaValida) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  const token = jwt.sign({ id: user.id, nome: user.nome }, SECRET, { expiresIn: "2h" });

  res.json({
    message: "Login bem-sucedido",
    usuario: { id: user.id, nome: user.nome, email: user.email },
    token,
  });
});

app.get("/painel", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token ausente" });

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: `Bem-vindo, ${decoded.nome}!`, user: decoded });
  } catch (err) {
    res.status(403).json({ message: "Token inválido ou expirado" });
  }
});

app.listen(3001, () => console.log("✅ Servidor rodando em http://localhost:3001"));