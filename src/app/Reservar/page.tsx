"use client";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import Styles from "./page.module.css";
import { ApiURL } from "../config";
import Navbar from "../componentes/navbar";

interface Table {
    id: number;
    name: string;
    reserved: boolean;
    nickname: string;
}

const Reservar = () => {
    const [grid, setGrid] = useState<Table[][]>([]);
    const [nickname, setNickname] = useState("");
    const [contact, setContact] = useState("");
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const { "restaurant-token": token } = parseCookies();
        if (!token) router.push("/login");

        const fetchGrid = async () => {
            try {
                const response = await fetch(`${ApiURL}/table/grid`);
                const data = await response.json();
                if (response.ok) setGrid(data.grid);
                else console.error(data.msg);
            } catch (error) {
                console.error("Erro ao carregar a grade de mesas:", error);
            }
        };

        fetchGrid();
    }, []);

    const reserveTable = async () => {
      if (selectedTable) {
          try {
              const { "restaurant-token": token } = parseCookies(); // Recuperar o token
              const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar o token (JWT)
              const userId = decodedToken.id;
  
              const response = await fetch(`${ApiURL}/table/reserve`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ tableId: selectedTable, nickname, contact, userId }),
              });
  
              const data = await response.json();
              if (response.ok) {
                  alert("Reserva feita com sucesso!");
                  setGrid((prev) =>
                      prev.map((row) =>
                          row.map((table) =>
                              table?.id === selectedTable ? { ...table, reserved: true } : table
                          )
                      )
                  );
                  setSelectedTable(null);
                  setNickname("");
                  setContact("");
              } else {
                  alert(data.msg);
              }
          } catch (error) {
              console.error("Erro ao reservar mesa:", error);
          }
      }
  };
  
    return (
        <div className={Styles.reservar}>
          <Navbar />
            <h1>Mapa de Mesas (10x10)</h1>
            <div className={Styles.grid}>
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className={Styles.row}>
                        {row.map((table, colIndex) =>
                            table ? (
                                <button
                                    key={colIndex}
                                    onClick={() => !table.reserved && setSelectedTable(table.id)}
                                    className={
                                        table.reserved
                                            ? Styles.reserved
                                            : table.id === selectedTable
                                            ? Styles.selected
                                            : Styles.available
                                    }
                                    disabled={table.reserved}
                                >
                                    { table.name}
                                </button>
                            ) : (
                                <div key={colIndex} className={Styles.empty}></div>
                            )
                        )}
                    </div>
                ))}
            </div>

            {selectedTable && (
                <div className={Styles.form}>
                    <h2>Reservar Mesa</h2>
                    <input
                        type="text"
                        placeholder="Apelido"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Contato"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                    />
                    <button onClick={reserveTable}>Confirmar Reserva</button>
                </div>
            )}
        </div>
    );
};

export default Reservar;
