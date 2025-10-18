import React, { useState } from "react";
import { motion } from "framer-motion";

// Componente de Login para empresa de ônibus
// Requisitos:
// - Tailwind CSS para estilização (assumido configurado no projeto)
// - animação simples com Framer Motion
// - acessibilidade e validação básica

export default function BusCompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email.trim() || !password) {
      setError("Por favor preencha todos os campos.");
      return false;
    }
    // validação simples de email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setError("Digite um e-mail válido.");
      return false;
    }
    setError("");
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simula requisição — substituir por integração real
    try {
      await new Promise((r) => setTimeout(r, 900));
      // Aqui você chamaria a API de autenticação
      // Exemplo: await api.post('/auth/login', { email, password })
      console.log({ email, password, remember });
      // reset ou redirecionamento
      // router.push('/dashboard')
    } catch (err) {
      setError("Erro ao efetuar login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Lado esquerdo: ilustração / branding */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col justify-center items-start p-10 bg-gradient-to-b from-blue-600 to-indigo-700 text-white"
        >
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold">TransLinha</h1>
            <p className="mt-2 text-sm opacity-90">Gestão e transporte com confiança — painel da empresa</p>
          </div>

          <div className="w-full mt-6">
            {/* Placeholder para ilustração — substitua por SVG/imagem real */}
            <div className="rounded-lg bg-white/10 p-6">
              <svg
                viewBox="0 0 640 512"
                className="w-full h-44"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path fill="currentColor" d="M..." />
                {/* Simplified placeholder; troque por ilustração de ônibus */}
              </svg>
            </div>

            <ul className="mt-6 space-y-3 text-sm opacity-90">
              <li>• Painel de motoristas e rotas</li>
              <li>• Monitoramento de frota em tempo real</li>
              <li>• Relatórios e faturamento</li>
            </ul>
          </div>
        </motion.div>

        {/* Lado direito: formulário */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            <header className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-slate-800">Acesse sua conta</h2>
              <p className="text-sm text-slate-500 mt-2">Login para administradores, operadores e motoristas</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulário de login">
              {error && (
                <div role="alert" className="text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  E-mail ou CPF/CNPJ
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="seu@empresa.com ou 000.000.000-00"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-slate-600">Lembrar-me</span>
                </label>

                <a href="#" className="text-sm text-indigo-600 hover:underline">
                  Esqueci a senha
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg font-semibold shadow-sm disabled:opacity-60 disabled:cursor-not-allowed bg-indigo-600 text-white"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <div className="text-center text-sm text-slate-500">
                <span>ou continue com</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="py-2 rounded-lg border flex items-center justify-center text-sm">
                  Entrar com Google
                </button>
                <button type="button" className="py-2 rounded-lg border flex items-center justify-center text-sm">
                  Entrar com Empresa
                </button>
              </div>

              <p className="text-xs text-slate-400 text-center mt-3">
                Ao continuar, você concorda com os termos de uso e políticas da empresa.
              </p>
            </form>

            <footer className="mt-6 text-center text-sm text-slate-500">
              <span>Precisa de ajuda? </span>
              <a href="#" className="text-indigo-600 hover:underline">Suporte</a>
            </footer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
