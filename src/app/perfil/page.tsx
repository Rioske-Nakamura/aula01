"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa o hook para navegação de rotas
import { parseCookies } from "nookies"; // Para acessar os cookies do navegador
import Styles from "../page.module.css"; // Estilos específicos da página
import Navbar from "../componentes/navbar"; // Componente de barra de navegação
import { ApiURL } from "../config"; // URL base da API

const EditProfile = () => {
  const router = useRouter(); // Hook de navegação
  const [user, setUser] = useState<{ nome: string; email: string; password: string }>({
    nome: "",
    email: "",
    password: "",
  }); // Estado para armazenar os dados do usuário
  const [loading, setLoading] = useState(false); // Estado para indicar se a requisição está em andamento

  // Efeito para buscar os dados do usuário a partir do token JWT no cookie
  useEffect(() => {
    const cookies = parseCookies(); // Obtém os cookies do navegador
    const token = cookies["restaurant-token"]; // Obtém o token de autenticação
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do JWT
        setUser({
          nome: decodedToken.nome, // Preenche o estado com os dados do usuário
          email: decodedToken.email,
          password: "", // A senha fica vazia por questões de segurança
        });
      } catch (error) {
        console.error("Erro ao decodificar token:", error); // Caso haja erro no token, redireciona para login
        router.push("/login");
      }
    }
  }, [router]); // Executa apenas uma vez ao carregar o componente

  // Função chamada quando o formulário for enviado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    setLoading(true); // Define o estado de carregamento
    const cookies = parseCookies(); // Obtém os cookies
    const token = cookies["restaurant-token"]; // Obtém o token do cookie
    const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null; // Decodifica o token

    if (decodedToken) {
      try {
        // Faz a requisição para atualizar o perfil do usuário
        const response = await fetch(`${ApiURL}/perfil/update-profile/${decodedToken.id}`, {
          method: "PUT", // Método PUT para atualizar os dados
          headers: {
            "Content-Type": "application/json", // Define que o corpo da requisição será em JSON
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho para autenticação
          },
          body: JSON.stringify(user), // Envia os dados atualizados do usuário
        });

        const data = await response.json(); // Converte a resposta em JSON
        if (response.ok) {
          console.log("Perfil atualizado:", data); // Exibe sucesso no console
          router.push("/"); // Redireciona para a página inicial após a atualização
        } else {
          console.error("Erro ao atualizar perfil:", data.msg); // Exibe erro no console caso a atualização falhe
        }
      } catch (error) {
        console.error("Erro ao enviar a requisição:", error); // Exibe erro no console se a requisição falhar
      }
    }
    setLoading(false); // Define o estado de carregamento como falso após a operação
  };

  return (
    <div className={Styles.reservar}>
      <Navbar /> {/* Exibe a barra de navegação */}
      <div className={Styles.formulario}>
        <h1>Editar Perfil</h1>
        <form onSubmit={handleSubmit}>
          <p>
            Nome:
            <input
              type="text"
              className={Styles.input}
              value={user.nome} // Valor do input do nome é o estado user.nome
              onChange={(e) => setUser({ ...user, nome: e.target.value })} // Atualiza o estado quando o valor muda
            />
          </p>
          <p>
            Email:
            <input
              type="email"
              className={Styles.input}
              value={user.email} // Valor do input de email é o estado user.email
              onChange={(e) => setUser({ ...user, email: e.target.value })} // Atualiza o estado quando o valor muda
            />
          </p>
          <p>
            Nova Senha:
            <input
              type="password"
              className={Styles.input}
              value={user.password} // Valor do input de senha é o estado user.password
              onChange={(e) => setUser({ ...user, password: e.target.value })} // Atualiza o estado quando o valor muda
            />
          </p>
          <button type="submit" className={Styles.button} disabled={loading}> 
            {loading ? "Salvando..." : "Salvar Alterações"} {/* Exibe "Salvando..." se estiver carregando */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
