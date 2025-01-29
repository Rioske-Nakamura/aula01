"use client"; // Indica que o componente é renderizado no lado do cliente

import { FormEvent, useState, useEffect } from "react"; // Importa hooks do React para gerenciar estado, formulários e efeitos colaterais
import Usuario from "../interfaces/usuario"; // Importa a interface de tipos de usuário
import { ApiURL } from "../config"; // Importa a URL da API a partir de um arquivo de configuração
import styles from '../login/page.module.css'; // Importa os estilos CSS para a página de login
import { useRouter } from "@/node_modules/next/navigation"; // Importa o hook useRouter para navegação programática
import { parseCookies, destroyCookie } from "@/node_modules/nookies"; // Importa funções para manipulação de cookies

// Função principal do componente de cadastro
export default function Cadastro() {
  const router = useRouter(); // Hook para navegação entre páginas
  const [usuario, setUsuario] = useState<Usuario>({ // Estado para armazenar os dados do novo usuário
    nome: "",
    email: "",
    password: "",
    tipo: "cliente" // Tipo padrão de usuário é "cliente"
  });

  const [erroCadastro, setErroCadastro] = useState<string>(""); // Estado para armazenar erros de cadastro

  // Função para atualizar o estado dos campos do formulário
  const handleChange = (field: keyof Usuario, value: string) => {
    setUsuario((prev) => ({
      ...prev, // Mantém os valores anteriores
      [field]: value // Atualiza o campo específico
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão de envio de formulário

    // Valida se todos os campos estão preenchidos
    if (!usuario.nome || !usuario.email || !usuario.password) {
      setErroCadastro("Por favor, preencha todos os campos.");
      return;
    }
    console.log("Dados enviados:", usuario); // Log dos dados para verificação
    try {
      // Realiza uma requisição POST para registrar o novo usuário
      const response = await fetch(`${ApiURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Define o tipo de conteúdo da requisição
        },
        body: JSON.stringify(usuario) // Envia os dados do usuário como JSON
      });

      const data: { erro: boolean; msg: string } = await response.json(); // Converte a resposta para JSON

      // Se houver erro no cadastro, exibe a mensagem de erro
      if (data.erro) {
        setErroCadastro(data.msg);
      } else {
        router.push("/login"); // Se o cadastro for bem-sucedido, redireciona para a página de login
      }
    } catch (error) {
      console.error("Erro na requisição:", error); // Log de erro na requisição
      setErroCadastro("Ocorreu um erro. Tente novamente mais tarde."); // Mensagem genérica de erro
    }
  };

  // Efeito colateral que verifica se o usuário já está autenticado (token presente no cookie)
  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies(); // Lê o token de autenticação do cookie
    if (token) {
      router.push("/"); // Se o token existir, redireciona para a página inicial
    }
  }, []); // O efeito roda uma vez quando o componente é montado

  return (
    <div className={styles.center}> {/* Container centralizado */}
      <div className={styles.loginContainer}> {/* Container do formulário de login */}
        <img
          src="https://static.wixstatic.com/media/9fbf96_0fbf26014a794c87b00f0ad557394ad1~mv2.png/v1/fill/w_382,h_382,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-red-bamboo-17-0120.png" 
          alt="WordPress Logo" 
          className={styles.logo} 
        /> {/* Logo do sistema */}
        <form onSubmit={handleSubmit} className={styles.form}> {/* Formulário de cadastro */}
          <label>Digite seu nome de usuário</label>
          <input
            className={styles.input}
            name="nome"
            type="text"
            value={usuario.nome}
            onChange={(e) => handleChange("nome", e.target.value)} // Atualiza o nome no estado
          />
          <label>Digite seu endereço de e-mail</label>
          <input
            className={styles.input}
            name="email"
            type="email"
            value={usuario.email}
            onChange={(e) => handleChange("email", e.target.value)} // Atualiza o email no estado
          />
          <label>Digite uma senha forte</label>
          <input
            className={styles.input}
            name="password"
            type="password"
            value={usuario.password}
            onChange={(e) => handleChange("password", e.target.value)} // Atualiza a senha no estado
          />
          <button className={styles.Button2} type="submit">Cadastrar</button> {/* Botão de envio */}
        </form>
        {erroCadastro && <p style={{ color: "red" }}>{erroCadastro}</p>} {/* Exibe mensagem de erro, se houver */}

        <a className={styles.link} href="/login">Já possui cadastro? Login</a> {/* Link para a página de login */}

        <a className={styles.link} href="/">Home</a> {/* Link para a página inicial */}
      </div>
    </div>
  );
}
