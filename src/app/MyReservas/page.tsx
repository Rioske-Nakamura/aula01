"use client";

import { useEffect, useState } from "react";
import Navbar from "../componentes/navbar"; // Importa o componente de navegação
import { parseCookies } from "nookies"; // Para pegar os cookies
import { useRouter } from "@/node_modules/next/navigation"; // Para navegação de rotas
import Styles from "../page.module.css"; // Estilos do componente
import { ApiURL } from "../config"; // URL base da API

// Interface para o tipo Reserva
interface Reserva {
  id: string;
  name: string;
  nickname: string;
  contact: string;
}

const MyReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]); // Estado para armazenar as reservas
  const { "restaurant-token": token } = parseCookies(); // Obtém o token JWT dos cookies

  const router = useRouter(); // Hook para navegação

  // Efeito para verificar se o usuário está logado e carregar as reservas
  useEffect(() => {
    if (!token) {
      router.push("/login"); // Se não estiver logado, redireciona para login
    } else {
      fetchReservas(); // Se estiver logado, carrega as reservas
    }
  }, []); // O efeito é executado uma vez quando o componente é montado

  // Função para buscar as reservas do usuário
  const fetchReservas = async () => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o token JWT
      const userId = decodedToken.id; // Obtém o ID do usuário do token

      if (!userId) {
        alert("Erro: ID do usuário não encontrado no token.");
        return;
      }

      const response = await fetch(`${ApiURL}/table/reservas/${userId}`); // Chama a API para buscar as reservas
      const data = await response.json(); // Converte a resposta da API em JSON

      if (response.ok) {
        setReservas(data.reservas); // Se a resposta for bem-sucedida, armazena as reservas
      } else {
        alert(data.msg); // Caso contrário, exibe a mensagem de erro
      }
    } catch (error) {
      console.error("Erro ao buscar reservas:", error); // Exibe o erro no console
    }
  };

  // Função para cancelar uma reserva
  const cancelReservation = async (tableId: string) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o token JWT
      const userId = decodedToken.id; // Obtém o ID do usuário

      const response = await fetch(`${ApiURL}/table/reservas/cancelar`, {
        method: "POST", // Método POST para cancelar a reserva
        headers: { "Content-Type": "application/json" }, // Define o tipo de conteúdo como JSON
        body: JSON.stringify({ userId, tableId }), // Envia os dados no corpo da requisição
      });

      const data = await response.json(); // Converte a resposta em JSON

      if (response.ok) {
        alert("Reserva cancelada com sucesso!"); // Exibe mensagem de sucesso
        setReservas((prev) => prev.filter((reserva) => reserva.id !== tableId)); // Atualiza o estado removendo a reserva cancelada
      } else {
        alert(data.msg); // Caso contrário, exibe a mensagem de erro
      }
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error); // Exibe o erro no console
    }
  };

  return (
    <div className={Styles.reservar}>
      <Navbar /> {/* Exibe a barra de navegação */}
      <h2>Minhas Reservas</h2>

      {reservas.length > 0 ? ( // Verifica se há reservas
        <ul>
          {reservas.map((reserva) => (
            <li className={Styles.reservas} key={reserva.id}>
              <p>
                <strong>Mesa:</strong> {reserva.name} {/* Exibe o nome da mesa */}
              </p>
              <p>
                <strong>Apelido:</strong> {reserva.nickname} {/* Exibe o apelido */}
              </p>
              <p>
                <strong>Contato:</strong> {reserva.contact} {/* Exibe o contato */}
              </p>
              <button
                onClick={() => cancelReservation(reserva.id)} className={Styles.button} // Cancela a reserva
              >
                Cancelar Reserva
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Você não possui reservas no momento.</p> // Exibe mensagem caso não haja reservas
      )}
    </div>
  );
};

export default MyReservas;
