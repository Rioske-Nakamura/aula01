"use client";
import { useState, FormEvent } from "react";
import { parseCookies } from "nookies";
import { ApiURL } from "../config";

export default function CancelReservation() {
  const [tableId, setTableId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      if (data.erro) setMessage("Erro ao cancelar a reserva.");
    } catch (error) {
      setMessage("Erro na solicitação.");
    }
  };

  return (
    <div>
      <h1>Cancelar Reserva</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID da Mesa"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
        />
        <button type="submit">Cancelar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
