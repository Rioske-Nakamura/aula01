"use client"; // Indica que o componente é renderizado no lado do cliente

import { useState, useEffect } from "react"; // Importa hooks do React para gerenciar estado e efeitos colaterais
import { parseCookies } from "nookies"; // Função para ler cookies do navegador
import { ApiURL } from "../config"; // Importa a URL da API a partir de um arquivo de configuração
import Navbar from "../componentes/navbar"; // Componente Navbar para exibir o menu de navegação
import { useRouter } from "@/node_modules/next/navigation"; // Hook para navegação entre páginas
import Styles from "../page.module.css"; // Importa os estilos CSS para a página de reservas

export default function CancelReservation() {
  const [tables, setTables] = useState<any[]>([]); // Estado para armazenar as mesas
  const [message, setMessage] = useState<string>(""); // Estado para armazenar mensagens de erro ou sucesso
  const { "restaurant-token": token } = parseCookies(); // Lê o token de autenticação dos cookies
  
  const router = useRouter(); // Hook de navegação

  // Efeito que verifica se o usuário tem o token válido e é um administrador
  useEffect(() => {
    if (!token) {
      router.push("/"); // Se não houver token, redireciona para a página inicial
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o token JWT
      if (decodedToken.tipo !== "ADM") {
        router.push("/"); // Se o tipo não for "ADM" (Administrador), redireciona para a página inicial
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error); // Caso ocorra um erro na decodificação do token
      router.push("/"); // Redireciona para a página inicial em caso de erro
    }
  }, [token]); // O efeito roda toda vez que o token mudar

  // Função para buscar as mesas disponíveis
  const fetchTables = async () => {
    const { token } = parseCookies(); // Lê o token de autenticação dos cookies
    try {
      const response = await fetch(`${ApiURL}/admin/tables`, { // Requisição GET para buscar as mesas
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Passa o token de autenticação no cabeçalho da requisição
        },
      });
      const data = await response.json(); // Converte a resposta para JSON
      if (!data.erro) {
        setTables(data.tables); // Se não houver erro, define a lista de mesas no estado
      } else {
        setMessage("Erro ao buscar mesas."); // Caso ocorra erro, define uma mensagem
      }
    } catch (error) {
      setMessage("Erro ao buscar mesas."); // Define a mensagem de erro se a requisição falhar
    }
  };

  // Função para cancelar a reserva de uma mesa
  const handleCancelReservation = async (tableId: number) => {
    const { token } = parseCookies(); // Lê o token de autenticação dos cookies
    try {
      const response = await fetch(`${ApiURL}/admin/cancel-reservation`, { // Requisição POST para cancelar a reserva
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Define o tipo de conteúdo da requisição
          Authorization: `Bearer ${token}`, // Passa o token de autenticação
        },
        body: JSON.stringify({ tableId }), // Envia o ID da mesa para cancelar a reserva
      });
      const data = await response.json(); // Converte a resposta para JSON
      setMessage(data.msg); // Define a mensagem de resposta
      if (!data.erro) {
        fetchTables(); // Atualiza a lista de mesas após cancelar a reserva
      }
    } catch (error) {
      setMessage("Erro ao cancelar a reserva."); // Define a mensagem de erro caso falhe a requisição
    }
  };

  // Efeito que busca as mesas quando o componente é montado
  useEffect(() => {
    fetchTables(); // Chama a função para buscar as mesas ao carregar o componente
  }, []); // O efeito roda uma vez após a montagem do componente

  return (
    <div className={Styles.reservar}> {/* Container para a página de cancelar reserva */}
        <Navbar/> {/* Exibe a Navbar */}
      <h1>Cancelar Reserva</h1>
      {message && <p>{message}</p>} {/* Exibe uma mensagem caso haja */}
      <ul> {/* Lista de mesas */}
        {tables.map((table) => (
          <li className={Styles.reservas} key={table.id}> {/* Para cada mesa, exibe um item na lista */}
            <p>Mesa: {table.name}</p>
            {table.userId ? ( // Se a mesa estiver reservada (userId existe)
              <button onClick={() => handleCancelReservation(table.id)} className={Styles.button}>
                Cancelar Reserva
              </button> // Exibe o botão para cancelar a reserva
            ) : (
              <span>Sem reservas</span> // Se a mesa não tiver reserva, exibe mensagem informando isso
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
