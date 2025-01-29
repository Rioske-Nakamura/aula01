"use client";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import { ApiURL } from "../config";
import Navbar from "../componentes/navbar";
import { useRouter } from "@/node_modules/next/navigation";
import Styles from "../page.module.css";

export default function CancelReservation() {
  const [tables, setTables] = useState<any[]>([]); // Lista de mesas
  const [message, setMessage] = useState<string>("");
  const { "restaurant-token": token } = parseCookies();
  
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); 
      if (decodedToken.tipo !== "ADM") {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      router.push("/");
    }
  }, [token]);

  const fetchTables = async () => {
    const { token } = parseCookies();
    try {
      const response = await fetch(`${ApiURL}/admin/tables`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!data.erro) {
        setTables(data.tables);
      } else {
        setMessage("Erro ao buscar mesas.");
      }
    } catch (error) {
      setMessage("Erro ao buscar mesas.");
    }
  };

  const handleCancelReservation = async (tableId: number) => {
    const { token } = parseCookies();
    try {
      const response = await fetch(`${ApiURL}/admin/cancel-reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tableId }),
      });
      const data = await response.json();
      setMessage(data.msg);
      if (!data.erro) {
        fetchTables(); // Atualiza a lista de mesas após cancelar
      }
    } catch (error) {
      setMessage("Erro ao cancelar a reserva.");
    }
  };

  useEffect(() => {
    fetchTables(); // Busca as mesas ao carregar o componente
  }, []);

  return (
    <div className={Styles.reservar}>
        <Navbar/>
      <h1>Cancelar Reserva</h1>
      {message && <p>{message}</p>}
      <ul>
        {tables.map((table) => (
          <li className={Styles.reservas} key={table.id}>
            <p>Mesa: {table.name}</p>
            {table.userId ? (
              <button onClick={() => handleCancelReservation(table.id)} className={Styles.button}>
                Cancelar Reserva
              </button>
            ) : (
              <span>Sem reservas</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
