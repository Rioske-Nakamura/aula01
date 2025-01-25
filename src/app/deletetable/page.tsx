"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { ApiURL } from "../config";

export default function DeleteTable() {
  const [tableName, setTableName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { token } = parseCookies();

    try {
      const response = await fetch(`${ApiURL}/admin/delete-table/${tableName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMessage(data.msg);
      if (data.erro) setMessage("Erro ao excluir a mesa.");
    } catch (error) {
      setMessage("Erro na solicitação.");
    }
  };

  return (
    <div>
      <h1>Excluir Mesa</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da Mesa"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <button type="submit">Excluir</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
