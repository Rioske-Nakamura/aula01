"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/node_modules/next/navigation";
import { parseCookies } from "@/node_modules/nookies";
import Navbar from "../componentes/navbar";
import Styles from "../page.module.css";

const Reservar = () => {
  const router = useRouter();

  useEffect(() => {
    const { "restaurant-token": token } = parseCookies();
    if (!token) {
      router.push("/login");
    }
  }, []);

  const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null);
  const [mesasReservadas, setMesasReservadas] = useState<number[]>([]);

  // Função para lidar com a seleção da mesa
  const selecionarMesa = (id: number) => {
    setMesaSelecionada(id); // Define a mesa selecionada
  };

  // Função para confirmar a reserva
  const confirmarReserva = (e: React.FormEvent) => {
    e.preventDefault();
    if (mesaSelecionada !== null) {
      setMesasReservadas((prev) => [...prev, mesaSelecionada]); // Adiciona a mesa selecionada ao estado de mesas reservadas
      setMesaSelecionada(null); // Reseta a mesa selecionada
    }
  };

  return (
    <div className={Styles.reservar}>
      <Navbar />

      <h2>Mapa de Mesas</h2>

      <img src="/imgs/mapa.png" alt="Mapa de Mesas" className={Styles.mapa} />

      <div style={{ margin: "20px" }}>
        <h2>Selecione uma mesa</h2>

        {/* Botões das mesas dispostos lado a lado */}
        <div className={Styles.mesas}>
          {[1, 2, 3, 4, 5, 6, 7].map((id) => (
            <button
              key={id}
              id={`mesa-${id}`}
              onClick={() => selecionarMesa(id)}
              disabled={mesasReservadas.includes(id)} // Desativa o botão se a mesa já foi reservada
              className={
                mesasReservadas.includes(id)
                  ? `${Styles.reservada}`
                  : `${Styles.mesa}`
              }
            >
              Mesa {id}
            </button>
          ))}
        </div>

        {/* Formulário de reserva */}
        {mesaSelecionada && (
          <div className={Styles.formulario}>
            <h3>Reservar Mesa {mesaSelecionada}</h3>
            <form onSubmit={confirmarReserva}>
              <label>
                Nome:
                <input className={Styles.formularioInput} type="text" placeholder="Digite seu nome" required />
              </label>
              <br />
              <label>
                Telefone:
                <input className={Styles.formularioInput} type="text" placeholder="Digite seu telefone" required/>
              </label>
              <br />
              <button className={Styles.formularioButton} type="submit">Confirmar Reserva</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservar;
