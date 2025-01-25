"use client";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import { ApiURL } from "../config";

export default function DeleteTable() {
  const [tables, setTables] = useState<any[]>([]); // Lista de mesas
  const [message, setMessage] = useState<string>("");

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

  const handleDeleteTable = async (tableId: number) => {
    const { token } = parseCookies();
    try {
      // Usando o ID da mesa na URL
      const response = await fetch(`${ApiURL}/admin/delete-table/${tableId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMessage(data.msg);
      if (!data.erro) {
        fetchTables(); // Atualiza a lista de mesas após excluir
      }
    } catch (error) {
      setMessage("Erro ao excluir a mesa.");
    }
  };

  useEffect(() => {
    fetchTables(); // Busca as mesas ao carregar o componente
  }, []);

  return (
    <div>
      <h1>Excluir Mesa</h1>
      {message && <p>{message}</p>}
      <ul>
        {tables.map((table) => (
          <li key={table.id}>
            <p>Mesa ID: {table.id} - Nome: {table.name}</p>
            <button onClick={() => handleDeleteTable(table.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
