"use client";

import { useEffect, useState } from "react";
import Navbar from "../componentes/navbar";
import { parseCookies } from "nookies";
import { useRouter } from "@/node_modules/next/navigation";
import Styles from "../page.module.css";
import { ApiURL } from "../config"; // URL base da API


// Interface para o tipo Reserva
interface Reserva {
  id: string;
  name: string;
  nickname: string;
  contact: string;
}

const MyReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]); // Estado para as reservas
  const { "restaurant-token": token } = parseCookies(); // Obtém o token dos cookies

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login"); 
    } else {
      fetchReservas();
    }
  }, []);

  const fetchReservas = async () => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      if (!userId) {
        alert("Erro: ID do usuário não encontrado no token.");
        return;
      }

      const response = await fetch(`${ApiURL}/table/reservas/${userId}`); 
      const data = await response.json();

      if (response.ok) {
        setReservas(data.reservas);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
    }
  };

  // Função para cancelar uma reserva
  const cancelReservation = async (tableId: string) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o token JWT
      const userId = decodedToken.id;

      const response = await fetch(`${ApiURL}/table/reservas/cancelar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, tableId }), // Envia o ID do usuário e da mesa
      });

      const data = await response.json();

      if (response.ok) {
        alert("Reserva cancelada com sucesso!");
        setReservas((prev) => prev.filter((reserva) => reserva.id !== tableId)); // Remove a reserva cancelada
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
    }
  };

  return (
    <div className={Styles.reservar}>
      <Navbar />
      <h2>Minhas Reservas</h2>

      {reservas.length > 0 ? (
        <ul className={Styles.reservas}>
          {reservas.map((reserva) => (
            <li key={reserva.id}>
              <p>
                <strong>Mesa:</strong> {reserva.name}
              </p>
              <p>
                <strong>Apelido:</strong> {reserva.nickname}
              </p>
              <p>
                <strong>Contato:</strong> {reserva.contact}
              </p>
              <button
                onClick={() => cancelReservation(reserva.id)} className={Styles.button}
              >
                Cancelar Reserva
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Você não possui reservas no momento.</p>
      )}
    </div>
  );
};

export default MyReservas;
