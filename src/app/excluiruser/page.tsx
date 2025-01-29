"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "@/node_modules/next/navigation";
import { parseCookies } from "nookies";
import { ApiURL } from "../config";
import Navbar from "../componentes/navbar";
import Styles from "../page.module.css";

export default function DeleteUser() {
  const [userId, setUserId] = useState<string>("");
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { token } = parseCookies();

    try {
      const response = await fetch(`${ApiURL}/admin/delete-user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMessage(data.msg);
      if (data.erro) setMessage("Erro ao excluir o usuário.");
    } catch (error) {
      setMessage("Erro na solicitação.");
    }
  };

  return (
    <div className={Styles.reservar}>
        <Navbar/>
      <h1>Excluir Usuário</h1>
      <div className={Styles.formulario}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={Styles.input}
          placeholder="ID do Usuário"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit" className={Styles.button}>Excluir</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
}
