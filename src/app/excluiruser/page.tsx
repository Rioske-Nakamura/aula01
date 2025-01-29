"use client"; // Indica que o código será executado no lado do cliente

import { useState, FormEvent, useEffect } from "react"; // Importa hooks do React para manipulação de estado, eventos e efeitos colaterais
import { useRouter } from "@/node_modules/next/navigation"; // Importa o hook useRouter para navegação de páginas
import { parseCookies } from "nookies"; // Importa a função para ler cookies
import { ApiURL } from "../config"; // Importa a URL da API do backend
import Navbar from "../componentes/navbar"; // Importa o componente de navegação
import Styles from "../page.module.css"; // Importa os estilos CSS para o componente

export default function DeleteUser() {
  // Definição do estado para armazenar o ID do usuário e a mensagem de resposta
  const [userId, setUserId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Obtém o token de autenticação dos cookies
  const { "restaurant-token": token } = parseCookies();

  const router = useRouter(); // Hook para navegação

  // Efeito que roda na montagem do componente para garantir que o usuário tenha permissão de administrador
  useEffect(() => {
    if (!token) {
      router.push("/"); // Se não houver token, redireciona para a página inicial
      return;
    }

    try {
      // Decodifica o token JWT para verificar o tipo do usuário
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      if (decodedToken.tipo !== "ADM") {
        router.push("/"); // Se o tipo não for 'ADM', redireciona para a página inicial
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      router.push("/"); // Se ocorrer um erro ao decodificar, redireciona para a página inicial
    }
  }, [token]);

  // Função para enviar o formulário de exclusão do usuário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const { token } = parseCookies();

    try {
      // Faz uma requisição DELETE para excluir o usuário com o ID fornecido
      const response = await fetch(`${ApiURL}/admin/delete-user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Autenticação com token
        },
      });
      const data = await response.json();
      setMessage(data.msg); // Exibe a mensagem de resposta
      if (data.erro) setMessage("Erro ao excluir o usuário.");
    } catch (error) {
      setMessage("Erro na solicitação.");
    }
  };

  return (
    <div className={Styles.reservar}>
        <Navbar/> {/* Exibe a barra de navegação */}
      <h1>Excluir Usuário</h1>
      <div className={Styles.formulario}>
        {/* Formulário para excluir o usuário com base no ID */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={Styles.input}
            placeholder="ID do Usuário"
            value={userId}
            onChange={(e) => setUserId(e.target.value)} // Atualiza o ID do usuário no estado
          />
          <button type="submit" className={Styles.button}>Excluir</button> {/* Botão para enviar o formulário */}
        </form>
        {message && <p>{message}</p>} {/* Exibe a mensagem de erro ou sucesso */}
      </div>
    </div>
  );
}
