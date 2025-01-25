"use client";
import { useState, FormEvent } from "react";
import { parseCookies } from "nookies";
import { ApiURL } from "../config";

export default function AddTable() {
  const [name, setName] = useState<string>("");
  const [columns, setColumns] = useState<number>(0);
  const [rows, setRows] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { token } = parseCookies();

    try {
      const response = await fetch(`${ApiURL}/admin/add-table`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, columns, rows }),
      });
      const data = await response.json();
      setMessage(data.msg);
      if (data.erro) setMessage("Erro ao adicionar a mesa.");
    } catch (error) {
      setMessage("Erro na solicitação.");
    }
  };

  return (
    <div>
      <h1>Adicionar Mesa</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da Mesa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Colunas"
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Linhas"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
        <button type="submit">Adicionar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
