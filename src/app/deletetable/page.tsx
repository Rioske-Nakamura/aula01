"use client"; // Indica que o código será executado no lado do cliente

import { useState, useEffect } from "react"; // Importa hooks do React para manipulação de estado e efeitos colaterais
import { parseCookies } from "nookies"; // Importa a função para ler cookies
import { ApiURL } from "../config"; // Importa a URL da API do backend
import Navbar from "../componentes/navbar"; // Importa o componente de navegação
import { useRouter } from "@/node_modules/next/navigation"; // Importa o hook useRouter para navegação de páginas
import Styles from "../page.module.css"; // Importa os estilos CSS para o componente

export default function DeleteTable() {
  // Definição do estado para armazenar as mesas e a mensagem de resposta
  const [tables, setTables] = useState<any[]>([]); 
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

  // Função para buscar as mesas na API
  const fetchTables = async () => {
    const { token } = parseCookies();
    try {
      const response = await fetch(`${ApiURL}/admin/tables`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Autenticação com token
        },
      });
      const data = await response.json();
      if (!data.erro) {
        setTables(data.tables); // Atualiza o estado com as mesas recebidas
      } else {
        setMessage("Erro ao buscar mesas."); // Exibe mensagem de erro, se necessário
      }
    } catch (error) {
      setMessage("Erro ao buscar mesas.");
    }
  };

  // Função para excluir uma mesa ao clicar no botão
  const handleDeleteTable = async (tableId: number) => {
    const { token } = parseCookies();
    try {
      // Faz uma requisição DELETE para excluir a mesa
      const response = await fetch(`${ApiURL}/admin/delete-table/${tableId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Autenticação com token
        },
      });
      const data = await response.json();
      setMessage(data.msg); // Exibe a mensagem de resposta
      if (!data.erro) {
        fetchTables(); // Atualiza a lista de mesas após exclusão
      }
    } catch (error) {
      setMessage("Erro ao excluir a mesa.");
    }
  };

  // Efeito que busca as mesas assim que o componente é montado
  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className={Styles.reservar}>
        <Navbar/> {/* Exibe a barra de navegação */}
      <h1>Excluir Mesa</h1>
      {message && <p>{message}</p>} {/* Exibe a mensagem de erro ou sucesso */}
      <ul>
        {tables.map((table) => (
          <li className={Styles.reservas} key={table.id}> {/* Itera sobre as mesas */}
            <p>Mesa ID: {table.id} - Nome: {table.name}</p> {/* Exibe informações da mesa */}
            <button className={Styles.button} onClick={() => handleDeleteTable(table.id)}>
              Excluir {/* Botão para excluir a mesa */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
