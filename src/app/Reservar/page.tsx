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

      <h1>Nossa localização</h1>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12093.59389123217!2d-74.01064418261717!3d40.7312567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599166ac45c1%3A0xd2bb7efe730dd284!2sRed%20Bamboo!5e0!3m2!1spt-BR!2sbr!4v1734009894773!5m2!1spt-BR!2sbr" width="600" height="450"  loading="lazy"></iframe>

    </div>
  );
};

export default Reservar;
